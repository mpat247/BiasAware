require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');

// Ensure the caffeineImages directory exists
const imagesDir = path.join(__dirname, '..', 'caffeineImages');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

router.get('/caffeine', async (req, res) => {
  try {
    const images = await Image.find({
      bias_name: "Addiction",
      prompt: { $regex: 'Caffeine', $options: 'i' },
    });

    if (!images || images.length === 0) {
      return res.status(404).send({ message: 'No images found matching criteria' });
    }

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'images' // Replace 'images' with your actual GridFS bucket name
    });

    images.forEach((image) => {
      const filename = image.name;
      const outputPath = path.join(imagesDir, filename);
      const writeStream = fs.createWriteStream(outputPath);

      bucket.openDownloadStreamByName(filename).pipe(writeStream)
        .on('error', function(error) {
            console.error(`Error downloading ${filename}:`, error);
        })
        .on('finish', function() {
            console.log(`Successfully saved ${filename} to ${outputPath}`);
        });
    });

    res.status(200).send({ message: 'Images are being processed and saved.', Images: images});
  } catch (error) {
    console.error('Failed to fetch and save images:', error);
    res.status(500).send({ message: 'Failed to fetch and save images', error: error.message });
  }
});

router.get('/main-images', async (req, res) => {
    try {
      const images = await Image.find({ bias_name: "Addiction",prompt: /main/i });
  
      if (!images.length) {
        return res.status(404).send({ message: 'No main images found' });
      }
  
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'images'
      });
  
      const imagesData = await Promise.all(images.map(image => 
        new Promise((resolve, reject) => {
          const filename = image.name;
          let data = [];
          const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
          const downloadStream = bucket.openDownloadStreamByName(filename);
  
          downloadStream.on('data', chunk => {
            data.push(chunk);
          });
  
          downloadStream.on('error', function(error) {
            console.error(`Error downloading ${filename}:`, error);
            reject(error);
          });
  
          downloadStream.on('end', () => {
            const imgBase64 = Buffer.concat(data).toString('base64');
            resolve(`data:${contentType};base64,${imgBase64}`);
          });
        })
      ));
  
      res.status(200).json({ images: imagesData });
    } catch (error) {
      console.error('Failed to fetch main images:', error);
      res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
    }
  });

module.exports = router;
