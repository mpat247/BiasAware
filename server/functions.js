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

        // Retrieve images where bias_name is 'crime'
        const crimeImages = await Image.find({ bias_name: 'crime' });

        // Update images in the database
        for (const image of crimeImages) {
          // Find the corresponding record in imagesToUpdate array
          const correspondingRecord = imagesToUpdate.find(record => record.name === image.name);
          if (correspondingRecord) {
            // Update the image with skin_shade and gender
            await Image.updateOne({ _id: image._id }, {
              $set: {
                skin_shade: correspondingRecord.skin_shade,
                gender: correspondingRecord.gender
              }
            });
            console.log(`Updated image ${image.name} with skin shade ${correspondingRecord.skin_shade} and gender ${correspondingRecord.gender}.`);
          }
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

async function addBiasFieldsToImages() {
  try {
    const images = await Image.find({});
    console.log(`Found ${images.length} images to update.`);

    for (const image of images) {
      console.log(`Adding bias fields to image: ${image.name}`);
      await Image.findByIdAndUpdate(image._id, {
        $set: {
          gender_bias: null,
          race_bias: null,
          age_bias: null
        }
      });
      console.log(`Bias fields added to image: ${image.name}`);
    }
    console.log("All images updated with bias fields.");
  } catch (error) {
    console.error("Error occurred while adding bias fields to images:", error);
  }
}



async function main() {
  try {
    await mongoose.connect('mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority&appName=biasaware',
      { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to the database.');

    const csvFilePath = "/Users/manav/Documents/Fourth Year/Capstone/BiasAware/server/finalv.csv";
    await addBiasFieldsToImages();

    console.log('Added Fields to Image');
  } catch (error) {
    console.error('Failed to update images:', error);
  } finally {
    await mongoose.disconnect(); // Close the database connection
    console.log('Disconnected from the database.');
  }
}



main().catch(console.error);
