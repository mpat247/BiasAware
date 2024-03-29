require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');

router.get('/main-images', async (req, res) => {
  try {
      const images = await Image.find({ bias_name: "Addiction", prompt: /main/i });

      if (!images.length) {
          return res.status(404).send({ message: 'No main images found' });
      }

      const bucket = new GridFSBucket(mongoose.connection.db, {
          bucketName: 'images'
      });

      const imagesData = await Promise.all(images.map(async image => {
        return new Promise((resolve, reject) => {
            const filename = image.name;
            let data = [];
            const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
            const downloadStream = bucket.openDownloadStreamByName(filename);
    
            downloadStream.on('data', chunk => {
                data.push(chunk);
            });
    
            downloadStream.on('error', function (error) {
                console.error(`Error downloading ${filename}:`, error);
                reject(error);
            });
    
            downloadStream.on('end', () => {
                const imgBase64 = Buffer.concat(data).toString('base64');
                const prompt = image.prompt.replace('Main_', '').replace(/_/g, ' '); // Removing "Main_" and replacing "_" with a space
                resolve({
                    image: `data:${contentType};base64,${imgBase64}`,
                    prompt: prompt
                });
                // console.log('Prompt:', prompt); // Logging the prompt for each image
            });
        });
    }));
    
     

      res.status(200).json({ images: imagesData });
  } catch (error) {
      console.error('Failed to fetch main images:', error);
      res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
  }
});


router.get('/side-images', async (req, res) => {
  try {
    // Fetch main images
    const mainImages = await Image.find({ bias_name: "Addiction", prompt: /Main_/i });

    if (!mainImages.length) {
      return res.status(404).send({ message: 'No main images found' });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'images'
    });

    let sideImagesData = [];

    // Iterate through main images to fetch side images
    for (const mainImage of mainImages) {
      // Format the prompt
      const formattedPrompt = mainImage.prompt.substring(5).replace(/_/g, ' ');

      // Fetch side images for the formatted prompt
      const sideImages = await Image.find({ bias_name: "Addiction", prompt: { $regex: new RegExp(formattedPrompt, 'i'), $not: /Main_/i } });

      // Map side images to the formatted prompt and fetch image data
      for (const sideImage of sideImages) {
        const filename = sideImage.name;
        const downloadStream = bucket.openDownloadStreamByName(filename);

        let imageData = await new Promise((resolve, reject) => {
          let chunks = [];
          downloadStream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          downloadStream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const imgBase64 = buffer.toString('base64');
            const contentType = sideImage.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
            resolve({
              image: `data:${contentType};base64,${imgBase64}`,
              prompt: formattedPrompt
            });
          });
          downloadStream.on('error', (error) => {
            console.error(`Error downloading ${filename}:`, error);
            reject(error);
          });
        });

        sideImagesData.push(imageData);
      }
    }

    res.status(200).json({ images: sideImagesData });
  } catch (error) {
    console.error('Failed to fetch side images:', error);
    res.status(500).send({ message: 'Failed to fetch side images', error: error.message });
  }
});

module.exports = router;


module.exports = router;