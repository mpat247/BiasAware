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



router.get('/main-images', async (req, res) => {
    try {
        const images = await Image.find({ bias_name: "Emotions", prompt: /Individual/i });

        if (!images.length) {
            return res.status(404).send({ message: 'No main images found' });
        }

        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: 'images'
        });

        const imagesData = await Promise.all(images.map(async (image) => {
            const filename = image.name;
            const downloadStream = bucket.openDownloadStreamByName(filename);
            const chunks = [];

            return new Promise((resolve, reject) => {
                downloadStream.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                downloadStream.on('error', (error) => {
                    console.error(`Error downloading ${filename}:`, error);
                    reject(error);
                });

                downloadStream.on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    const base64Image = buffer.toString('base64');
                    const imageData = {
                        _id: image._id,
                        name: image.name,
                        contentType: image.contentType,
                        data: `data:${image.contentType};base64,${base64Image}`
                    };
                    resolve(imageData);
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
