require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


router.get('/main', async (req, res) => {
  const limit = 16;  // Set the limit to 16 images

  try {
    const imagesCount = await Image.countDocuments({ qol_type: /H/i }); // Get the count of images matching the condition
    if (imagesCount === 0) {
      return res.status(404).send({ message: 'No main images found' });
    }

    // Calculate the number of times each image should be included to meet the limit
    const repeatCount = Math.ceil(limit / imagesCount);

    // Fetch all images matching the condition from the database
    const images = await Image.aggregate([
      { $match: { qol_type: /H/i } },  // Ensure the images match a certain condition
      { $sample: { size: imagesCount } } // Randomly select a number of images based on the matched condition count
    ]);

    // Repeat each image the required number of times
    let repeatedImages = [];
    images.forEach(image => {
      for (let i = 0; i < repeatCount; i++) {
        repeatedImages.push(image);
      }
    });

    // Shuffle the repeatedImages array to introduce randomness
    repeatedImages = shuffleArray(repeatedImages);

    // Take the first 'limit' number of images
    const selectedImages = repeatedImages.slice(0, limit);

    // Fetch image data for each selected image
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
    const imagesData = await Promise.all(selectedImages.map(async (image) => {
      const filename = image.name;
      const downloadStream = bucket.openDownloadStreamByName(filename);
      const chunks = [];

      return new Promise((resolve, reject) => {
        downloadStream.on('data', chunk => chunks.push(chunk));
        downloadStream.on('error', error => reject(error));
        downloadStream.on('end', () => {
          const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
          const imageData = Buffer.concat(chunks).toString('base64');
          resolve({
            imageData: `data:${contentType};base64,${imageData}`,
            prompt: image.prompt,
            description: image.description
          });
        });
      });
    }));

    res.status(200).json({ images: imagesData });
  } catch (error) {
    console.error('Failed to fetch main images:', error);
    res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
  }
});

router.get('/main2', async (req, res) => {
  const limit = 16;  // Set the limit to 16 images

  try {
    const imagesCount = await Image.countDocuments({ qol_type: /L/i }); // Get the count of images matching the condition
    if (imagesCount === 0) {
      return res.status(404).send({ message: 'No main images found' });
    }

    // Calculate the number of times each image should be included to meet the limit
    const repeatCount = Math.ceil(limit / imagesCount);

    // Fetch all images matching the condition from the database
    const images = await Image.aggregate([
      { $match: { qol_type: /L/i } },  // Ensure the images match a certain condition
      { $sample: { size: imagesCount } } // Randomly select a number of images based on the matched condition count
    ]);

    // Repeat each image the required number of times
    let repeatedImages = [];
    images.forEach(image => {
      for (let i = 0; i < repeatCount; i++) {
        repeatedImages.push(image);
      }
    });

    // Shuffle the repeatedImages array to introduce randomness
    repeatedImages = shuffleArray(repeatedImages);

    // Take the first 'limit' number of images
    const selectedImages = repeatedImages.slice(0, limit);

    // Fetch image data for each selected image
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
    const imagesData = await Promise.all(selectedImages.map(async (image) => {
      const filename = image.name;
      const downloadStream = bucket.openDownloadStreamByName(filename);
      const chunks = [];

      return new Promise((resolve, reject) => {
        downloadStream.on('data', chunk => chunks.push(chunk));
        downloadStream.on('error', error => reject(error));
        downloadStream.on('end', () => {
          const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
          const imageData = Buffer.concat(chunks).toString('base64');
          resolve({
            imageData: `data:${contentType};base64,${imageData}`,
            prompt: image.prompt,
            description: image.description
          });
        });
      });
    }));

    res.status(200).json({ images: imagesData });
  } catch (error) {
    console.error('Failed to fetch main images:', error);
    res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
  }
});




module.exports = router;
