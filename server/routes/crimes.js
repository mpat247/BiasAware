require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package

// GET /fetchedCrime endpoint to fetch images by crimeId
router.get('/fetchedCrime', async (req, res) => {
  // Extract crimeId from query parameters
  const { crimeId } = req.query;

  if (!crimeId) {
    return res.status(400).send({ message: 'crimeId is required' });
  }

  try {
    // Find images that match the provided crimeId
    const images = await Image.find({ crimeId: crimeId });

    if (!images.length) {
      return res.status(404).send({ message: 'No images found for the provided crimeId' });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'images'
    });

    const imagesData = await Promise.all(images.map(async (image) => {
      const filename = image.name;
      let data = [];
      const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
      const downloadStream = bucket.openDownloadStreamByName(filename);

      downloadStream.on('data', (chunk) => {
        data.push(chunk);
      });

      return new Promise((resolve, reject) => {
        downloadStream.on('error', function (error) {
          console.error(`Error downloading ${filename}:`, error);
          reject(error);
        });

        downloadStream.on('end', () => {
          const imgBase64 = Buffer.concat(data).toString('base64');
          // Extract prompt and description from the image object
          const { prompt, description } = image;
          resolve({
            image: `data:${contentType};base64,${imgBase64}`,
            prompt,
            description
          });
        });
      });
    }));

    res.status(200).json({ images: imagesData });
  } catch (error) {
    console.error('Failed to fetch images:', error);
    res.status(500).send({ message: 'Failed to fetch images', error: error.message });
  }
});

module.exports = router;
