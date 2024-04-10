const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// Import Image model
const Image = require('./models/imageModel');

// MongoDB connection string
const mongoDB = 'mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority';

async function updateImageDescriptionsFromCSV() {
  console.log('Updating image descriptions from qol.csv');
  const conn = mongoose.connection;
  const gfs = new GridFSBucket(conn.db, { bucketName: 'images' });
  
  // Path to qol.csv file
  const csvFilePath = path.join(__dirname, 'qol.csv');
  
  // Read qol.csv file and store prompt-description pairs
  console.log('Reading qol.csv file...');
  const promptDescriptionMap = {};
  await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', (row) => {
              // Remove spaces, convert to lowercase, and extract first 15-20 characters of prompt
              const formattedPrompt = row.prompt.replace(/\s+/g, '').toLowerCase().substring(0, 20);
              promptDescriptionMap[formattedPrompt] = row.description;
          })
          .on('end', () => {
              console.log('Finished reading qol.csv file.');
              resolve();
          })
          .on('error', (error) => {
              console.error('Error reading qol.csv file:', error);
              reject(error);
          });
  });
  
  // Update image descriptions based on prompt-description pairs
  console.log('Fetching images from the database...');
  const imagesToUpdate = await Image.find();
  console.log('Updating image descriptions...');
  for (const image of imagesToUpdate) {
      const formattedPrompt = image.name.replace(/\s+/g, '').toLowerCase().substring(0, 20);
      if (promptDescriptionMap.hasOwnProperty(formattedPrompt)) {
          const description = promptDescriptionMap[formattedPrompt];
          console.log(`Updating description for image with prompt: ${image.name}`);
          image.description = description;
          await image.save();
          console.log(`Updated description for image with prompt: ${image.name}`);
      }
  }

  console.log('Finished updating image descriptions from qol.csv');
}


async function main() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB successfully.');
        await updateImageDescriptionsFromCSV();
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

// Init function to call main
function init() {
    main().then(() => console.log('All operations completed.'));
}

init();
