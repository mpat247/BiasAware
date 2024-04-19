require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');



router.get('/main', async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;  // Set a default limit if none is provided

  try {
    // Use MongoDB aggregation to randomly select documents
    const images = await Image.aggregate([
      { $match: { qol_type: /H/i } },  // Ensure the images match a certain condition
      { $sample: { size: limit } }     // Randomly select a number of images based on the limit
    ]);

    if (!images.length) {
      return res.status(404).send({ message: 'No main images found' });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
    const imagesData = await Promise.all(images.map(async (image) => {
      const filename = image.name;
      let data = [];
      const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
      const downloadStream = bucket.openDownloadStreamByName(filename);

      downloadStream.on('data', chunk => data.push(chunk));
      downloadStream.on('error', error => {
        console.error(`Error downloading ${filename}:`, error);
        return res.status(500).send({ message: `Error downloading image ${filename}: ${error}` });
      });

      return new Promise((resolve, reject) => {
        downloadStream.on('end', () => {
          const imgBase64 = Buffer.concat(data).toString('base64');
          resolve({
            imageData: `data:${contentType};base64,${imgBase64}`,
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
  const limit = parseInt(req.query.limit) || 12;  // Set a default limit if none is provided

  try {
    // Use MongoDB aggregation to randomly select documents
    const images = await Image.aggregate([
      { $match: { qol_type: /L/i } },  // Filter by type if necessary
      { $sample: { size: limit } }     // Randomly select a number of images based on the limit
    ]);

    if (!images.length) {
      return res.status(404).send({ message: 'No main images found' });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
    const imagesData = await Promise.all(images.map(async (image) => {
      const filename = image.name;
      let data = [];
      const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if not specified
      const downloadStream = bucket.openDownloadStreamByName(filename);

      downloadStream.on('data', chunk => data.push(chunk));
      downloadStream.on('error', error => {
        console.error(`Error downloading ${filename}:`, error);
        return res.status(500).send({ message: `Error downloading image ${filename}: ${error}` });
      });

      return new Promise((resolve, reject) => {
        downloadStream.on('end', () => {
          const imgBase64 = Buffer.concat(data).toString('base64');
          resolve({
            imageData: `data:${contentType};base64,${imgBase64}`,
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
