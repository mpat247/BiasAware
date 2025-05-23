require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');

router.get('/', async (req, res) => {
  try {
      const images = await Image.find({ bias_name: "Activities", prompt: /main/i });

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


router.get('/side', async (req, res) => {
  const { name } = req.query; // Destructure 'name' from query parameters
var count = 0;
  try {
    // Extract the first 3 letters of the 'name' provided, if it exists
    const name2 = name ? name.substring(0, 3) : null;

    // Construct a query object
    let query = {
      bias_name: "Activities",
      prompt: { $ne: null, $not: /^Main_/ },
      ...(name2 && { 'prompt': { $regex: `^A\\s${name2}`, $options: 'i' } }) // Add regex to match prompts starting with "A " followed by 'name2'
    };

    // Fetch images based on the constructed query
    const images = await Image.find(query);

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
          const filterer = image.prompt.replace(/^A\s/, '').substring(0, 3);
          console.log(count++);
          // Include the description in the resolved object
          resolve({
            image: `data:${contentType};base64,${imgBase64}`,
            prompt: image.prompt,
            filterer: filterer // This is the field we're using to match the 'name2' logic
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

