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
                // Include the description in the resolved object
                resolve({
                    image: `data:${contentType};base64,${imgBase64}`,
                    prompt: prompt,
                    description: image.description // Add the description field here
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


router.get('/side-images', async (req, res) => {
  try {
    // Receive prompt via query
    const { prompt: queryPrompt } = req.query;

    if (!queryPrompt) {
      return res.status(400).send({ message: 'Prompt is required' });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'images'
    });

    let sideImagesData = [];

    // Fetch images with bias_name "Addiction", excluding prompts starting with "Main_"
    // and ensuring the document's prompt contains the queryPrompt.
    const regexForExcludingMain = new RegExp(`^(?!Main_).+${queryPrompt}`, 'i');
    const sideImages = await Image.find({
      bias_name: "Addiction",
      prompt: { $regex: regexForExcludingMain }
    });
var count = 0
    // Map and fetch image data
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
            prompt: sideImage.prompt,
            description: sideImage.description // Add the description field here
          });
        });
        console.log(count++)
        downloadStream.on('error', (error) => {
          console.error(`Error downloading ${filename}:`, error);
          reject(error);
        });
      });

      sideImagesData.push(imageData);


    }

    if (!sideImagesData.length) {
      return res.status(404).send({ message: 'No side images found' });
    }

    res.status(200).json({ images: sideImagesData });
  } catch (error) {
    console.error('Failed to fetch side images:', error);
    res.status(500).send({ message: 'Failed to fetch side images', error: error.message });
  }
});


module.exports = router;

