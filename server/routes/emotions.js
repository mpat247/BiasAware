require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');


router.get('/main', async (req, res) => {
  try {
    const images = await Image.find({ bias_name: "Emotions", prompt: /Individual/i });

    if (!images.length) {
      return res.status(404).send({ message: 'No main images found' });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'images'
    });
    var count = 0;
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
          // Remove the specified start and end phrases from the prompt
          const emotion = image.prompt.replace(/^A |^An | Individual$/gi, '');

          // Include both prompt and prompt2 in the resolved object
          resolve({
            image: `data:${contentType};base64,${imgBase64}`,
            prompt: image.prompt, // Original prompt
            emotion, // New prompt field without 'A ', 'An ', and ' Individual',
            description: image.description
          });
          count ++;
          console.log('Image downloaded:', filename, 'Prompt:', image.prompt, 'Emotion:', emotion);
        });
      })
    ));
console.log(count)
    res.status(200).json({ images: imagesData });
  } catch (error) {
    console.error('Failed to fetch main images:', error);
    res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
  }
});

router.get('/side', async (req, res) => {
  try {
    const emotion = req.query.emotion;  // Retrieve the emotion query parameter
    if (!emotion) {
      return res.status(400).send({ message: 'Missing emotion query parameter' });
    }
    const images = await Image.find({
      bias_name: "Emotions",
      prompt: { 
        $regex: new RegExp('^' + emotion + '$', 'i'), // Matches the emotion exactly, case-insensitively
        $not: /Individual/i
      }
    });
    if (!images.length) {
      return res.status(404).send({ message: 'No main images found' });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'images'
    });
    var count = 0;
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
          // Remove the specified start and end phrases from the prompt
        
          // Include both prompt and prompt2 in the resolved object
          resolve({
            image: `data:${contentType};base64,${imgBase64}`,
            prompt: image.prompt, // Original prompt,
            emotion: image.prompt
          });
          count ++;
          console.log('Image downloaded:', filename, 'Prompt:', image.prompt); // Removed 'Emotion:', emotion
        });
        
      })
    ));
console.log(count)
    res.status(200).json({ images: imagesData });
  } catch (error) {
    console.error('Failed to fetch main images:', error);
    res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
  }
});

module.exports = router;
