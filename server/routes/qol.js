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
      const images = await Image.find({ qol_type: /H/i });
  
      if (!images.length) {
        return res.status(404).send({ message: 'No main images found' });
      }
  
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'images'
      });
  
      const imageDataPromises = images.map(async (image) => {
        const filename = image.name;
        let data = [];
        const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
        const downloadStream = bucket.openDownloadStreamByName(filename);
  
        downloadStream.on('data', chunk => {
          data.push(chunk);
        });
  
        return new Promise((resolve, reject) => {
          downloadStream.on('error', function(error) {
            console.error(`Error downloading ${filename}:`, error);
            reject(error);
          });
  
          downloadStream.on('end', () => {
            const imgBase64 = Buffer.concat(data).toString('base64');
            resolve({
              imageData: `data:${contentType};base64,${imgBase64}`,
              prompt: image.prompt // Include the prompt field
            });
          });
        });
      });
  
      const imagesData = await Promise.all(imageDataPromises);
  
      res.status(200).json({ images: imagesData });
    } catch (error) {
      console.error('Failed to fetch main images:', error);
      res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
    }
  });
  

  router.get('/main2', async (req, res) => {
    try {
        const images = await Image.find({ qol_type: /L/i });
    
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
                    resolve({
                        imageData: `data:${contentType};base64,${imgBase64}`,
                        prompt: image.prompt // Include prompt field in response
                    });
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
