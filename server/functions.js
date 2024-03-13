require('dotenv').config();
const mongoose = require('mongoose');
const Image = require('./models/imageModel'); // Adjust the import path as necessary
const Bias = require('./models/biasModel'); // Adjust the import path as necessary
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

async function main() {
  try {
    await mongoose.connect('mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to the database.');

   // await updateImageBias();
   // await updateImageGenerator();
    await updateImagePrompts();

    console.log('Completed updating images with bias and generator information.');
  } catch (error) {
    console.error('Failed to update images:', error);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(console.error);
