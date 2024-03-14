require('dotenv').config();
const express = require("express");
const router = express.Router();
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const Image = require('./models/imageModel'); // Adjust the import path as necessary
const Bias = require('./models/biasModel'); // Adjust the import path as necessary
const { connectToDatabase, mongoose } = require('./dbConfig'); // Adjust the path as necessary
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Make sure this line is included

async function updateImageBias() {
  const images = await Image.find({}); // Fetch all images

  for (const image of images) {
    let prefix = image.name.substring(0, image.name.indexOf('_')); // Adjust to get prefix before the 1st '_'
    console.log(prefix);
    // Define the mapping from prefix to bias_name
    const mapping = {
      'Add': 'Addiction',
      'Age': 'Activities',
      'Cri': 'Crime',
      'Educ': 'Education',
      'EMO': 'Emotions',
      'Pro': 'Professions',
      'QOL': 'Quality of Life'
    };

    let biasName = mapping[prefix];
    if (biasName) {
      // Find the corresponding Bias document to get the bias_id
      const bias = await Bias.findOne({ bias_name: biasName });
      if (bias) {
        // Update the Image document
        await Image.findByIdAndUpdate(image._id, { bias_id: bias.bias_id, bias_name: biasName });
        console.log(`Updated image ${image.name} with bias_id ${bias.bias_id} and bias_name ${biasName}`);
      }
    }
  }
}

async function updateImageGenerator() {
  const images = await Image.find({}); // Fetch all images

  for (const image of images) {
    // New section to update generator based on the last character before .jpg
    const lastChar = image.name.charAt(image.name.length - 5); // Assuming format is always '.jpg'
    let generator = null;
    if (lastChar === 'N') {
      generator = 'NightCafe';
    } else if (lastChar === 'S') {
      generator = 'StableDiffusion';
    }

    if (generator) {
      await Image.findByIdAndUpdate(image._id, { generator: generator });
      console.log(`Updated image ${image.name} with generator: ${generator}`);
    }
  }
}

async function createPromptMappingFromCSV(csvFilePath) {
  return new Promise((resolve, reject) => {
    const promptMapping = {};
    console.log(`Reading CSV file from: ${csvFilePath}`);
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const imageName = Object.values(row)[2]; // Adjust based on actual column index for image name
        const prompt = Object.values(row)[1]; // Adjust based on actual column index for prompt
        if (imageName && prompt) {
          promptMapping[imageName.split('.')[0]] = prompt;
          console.log(`Mapping found - ImageName: ${imageName.split('.')[0]}, Prompt: ${prompt}`);
        }
      })
      .on('end', () => {
        console.log(`CSV file reading completed. Found ${Object.keys(promptMapping).length} mappings.`);
        resolve(promptMapping);
      })
      .on('error', (error) => reject(error));
  });
}

async function updateImagePrompts() {
  const csvFilePath = "D:/manav/Documents/Engineering/4th Year/Capstone/BiasAware/server/finalCSV.csv"; // Update this path to your actual CSV file location
  const promptMapping = await createPromptMappingFromCSV(csvFilePath);

  const images = await Image.find({});
  console.log(`Found ${images.length} images to update.`);
  for (const image of images) {
    const imageNameWithoutExtension = image.name.split('.')[0];
    const prompt = promptMapping[imageNameWithoutExtension];
    if (prompt) {
      console.log(`Updating image: ${image.name} with prompt: "${prompt}"`);
      await Image.findByIdAndUpdate(image._id, { prompt: prompt });
      console.log(`Image ${image.name} updated successfully.`);
    } else {
      console.log(`No prompt mapping found for image: ${image.name}`);
    }
  }
}

async function updateImageFieldsFromCSV(csvFilePath) {
  try {
    console.log(`Reading CSV file from: ${csvFilePath}`);
    const imagesToUpdate = [];

    // Read the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const imageName = row.name;
        const skinShade = row.skinShade;
        const gender = row.gender;

        // Add image data to array
        imagesToUpdate.push({ name: imageName, skin_shade: skinShade, gender: gender });

        console.log(`Mapping found - ImageName: ${imageName}, Skin Shade: ${skinShade}, Gender: ${gender}`);
      })
      .on('end', async () => {
        console.log(`CSV file reading completed. Found ${imagesToUpdate.length} mappings.`);

        // Update images in the database
        for (const imageData of imagesToUpdate) {
          const { name, skin_shade, gender } = imageData;
          // Update or insert document with new fields and data
          await Image.updateOne({ name }, { $set: { skin_shade, gender } }, { upsert: true });
          console.log(`Updated image ${name} with skin shade ${skin_shade} and gender ${gender}.`);
        }

        console.log('Completed updating images with skin shade and gender information.');
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
      });
  } catch (error) {
    console.error('Error updating images:', error);
  }
}

async function main() {
  let db;
  try {
    db = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to the database.');

    const csvFilePath = "/Users/manav/Documents/Fourth Year/Capstone/BiasAware/server/finalv.csv";
    await updateImageFieldsFromCSV(csvFilePath);

    console.log('Completed updating images with skin shade and gender information.');
  } catch (error) {
    console.error('Failed to update images:', error);
  } finally {
    if (db) {
      await db.close(); // Close the database connection if it was opened
      console.log('Disconnected from the database.');
    }
  }
}


main().catch(console.error);
