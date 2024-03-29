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





async function addDescriptionFromCSV(csvFilePath) {
  try {
    console.log(`Reading CSV file from: ${csvFilePath}`);

    // Read the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        const prompt = row.prompt;
        const description = row.description;

        // Find the image document with the matching prompt
        const image = await Image.findOne({ prompt: prompt });

        if (image) {
          // Update the image document with the description
          await Image.findByIdAndUpdate(image._id, { description: description });
          console.log(`Updated image ${prompt} with description: ${description}`);
        } else {
          console.log(`Image with prompt ${prompt} not found in the database.`);
        }
      })
      .on('end', () => {
        console.log('CSV file reading completed.');
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
      });
  } catch (error) {
    console.error('Error updating images:', error);
  }
}

async function main() {
  let connection;
  try {
    connection = await mongoose.connect('mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority&appName=biasaware', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to the database.');

   // const csvFilePath = "/Users/manav/Documents/Fourth Year/Capstone/BiasAware/server/calDes.csv";
    await addDescriptionFromCSV('D:/manav/Documents/Engineering/4th Year/Capstone/BiasAware/server/finalCSV.csv');

    console.log('Completed updating images with skin shade and gender information.');
  } catch (error) {
    console.error('Failed to update images:', error);
  } finally {
    if (connection) {
      await connection.disconnect(); // Disconnect the connection if it was opened
      console.log('Disconnected from the database.');
    }
  }
}

main()




