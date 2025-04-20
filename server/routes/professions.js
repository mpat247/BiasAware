require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');

router.get('', async (req, res) => {
    try {
        const images = await Image.find({ bias_name: "Professions"});

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
                    // Include the description in the resolved object
                    resolve({
                        image: `data:${contentType};base64,${imgBase64}`,
                        profession_type: image.profession_type,
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