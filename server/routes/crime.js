require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');

const crimes = ["shoplifter", "gang leader", "smuggler", "hijacker", "mugger", "embezzler"];

router.get('/main-images', async (req, res) => {
    try {
      const images = await Image.find({ prompt: { $in: crimes.map(crime => new RegExp(crime, 'i')) } });
  
      if (!images.length) {
        return res.status(404).send({ message: 'No main images found' });
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
            // Extract skin_shade and gender from image object
            const { skin_shade, gender } = image;
            resolve({
              image: `data:${contentType};base64,${imgBase64}`,
              skin_shade,
              gender
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
