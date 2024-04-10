require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path as necessary
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket from mongodb package
const path = require('path');

// router.get('/age', async (req, res) => {
//     try {
//         const images = await Image.find({ age_bias: { $ne: null } });

//         if (!images.length) {
//             return res.status(404).send({ message: 'No main images found' });
//         }

//         const bucket = new GridFSBucket(mongoose.connection.db, {
//             bucketName: 'images'
//         });

//         const imagesData = await Promise.all(images.map(async image => {
//             return new Promise((resolve, reject) => {
//                 const filename = image.name;
//                 let data = [];
//                 const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
//                 const downloadStream = bucket.openDownloadStreamByName(filename);

//                 downloadStream.on('data', chunk => {
//                     data.push(chunk);
//                 });

//                 downloadStream.on('error', function (error) {
//                     console.error(`Error downloading ${filename}:`, error);
//                     reject(error);
//                 });

//                 downloadStream.on('end', () => {
//                     const imgBase64 = Buffer.concat(data).toString('base64');
//                     // Include the description in the resolved object
//                     resolve({
//                         image: `data:${contentType};base64,${imgBase64}`,
//                         age_bias: image.age_bias,
                        

//                     });
//                 });
//             });
//         }));



//         res.status(200).json({ images: imagesData });
//     } catch (error) {
//         console.error('Failed to fetch main images:', error);
//         res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
//     }
// });

// Adjust this part of your router file for the '/age' route
router.get('/age', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default pagination parameters

    try {
        const images = await Image.find({ age_bias: { $ne: null } })
                                  .limit(Number(limit))
                                  .skip((Number(page) - 1) * Number(limit));

        if (!images.length) {
            return res.status(404).send({ message: 'No images found' });
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
                        age_bias: image.age_bias,
                        

                    });
                });
            });
        }));

        res.status(200).json({ images: imagesData });
    } catch (error) {
        console.error('Failed to fetch images:', error);
        res.status(500).send({ message: 'Failed to fetch images', error: error.message });
    }
});


router.get('/gender', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default pagination parameters

    try {
        const images = await Image.find({ gender_bias: { $ne: null } })
                                  .limit(Number(limit))
                                  .skip((Number(page) - 1) * Number(limit));

        if (!images.length) {
            return res.status(404).send({ message: 'No images found' });
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
                        gender_bias: image.gender_bias,
                    });
                });
            });
        }));

        res.status(200).json({ images: imagesData });
    } catch (error) {
        console.error('Failed to fetch images:', error);
        res.status(500).send({ message: 'Failed to fetch images', error: error.message });
    }
});


router.get('/race', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default pagination parameters

    try {
        const images = await Image.find({ race_bias: { $ne: null } })
                                  .limit(Number(limit))
                                  .skip((Number(page) - 1) * Number(limit));

        if (!images.length) {
            return res.status(404).send({ message: 'No images found' });
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
                        race_bias: image.race_bias,
                    });
                });
            });
        }));

        res.status(200).json({ images: imagesData });
    } catch (error) {
        console.error('Failed to fetch images:', error);
        res.status(500).send({ message: 'Failed to fetch images', error: error.message });
    }
});

// router.get('/gender', async (req, res) => {
//     try {
//         const images = await Image.find({ gender_bias: { $ne: null } });

//         if (!images.length) {
//             return res.status(404).send({ message: 'No main images found' });
//         }

//         const bucket = new GridFSBucket(mongoose.connection.db, {
//             bucketName: 'images'
//         });

//         const imagesData = await Promise.all(images.map(async image => {
//             return new Promise((resolve, reject) => {
//                 const filename = image.name;
//                 let data = [];
//                 const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
//                 const downloadStream = bucket.openDownloadStreamByName(filename);

//                 downloadStream.on('data', chunk => {
//                     data.push(chunk);
//                 });

//                 downloadStream.on('error', function (error) {
//                     console.error(`Error downloading ${filename}:`, error);
//                     reject(error);
//                 });

//                 downloadStream.on('end', () => {
//                     const imgBase64 = Buffer.concat(data).toString('base64');
//                     // Include the description in the resolved object
//                     resolve({
//                         image: `data:${contentType};base64,${imgBase64}`,
//                         gender_bias: image.gender_bias,
//                     });
//                 });
//             });
//         }));



//         res.status(200).json({ images: imagesData });
//     } catch (error) {
//         console.error('Failed to fetch main images:', error);
//         res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
//     }
// });

// router.get('/race', async (req, res) => {
//     try {
//         const images = await Image.find({ race_bias: { $ne: null } });

//         if (!images.length) {
//             return res.status(404).send({ message: 'No main images found' });
//         }

//         const bucket = new GridFSBucket(mongoose.connection.db, {
//             bucketName: 'images'
//         });

//         const imagesData = await Promise.all(images.map(async image => {
//             return new Promise((resolve, reject) => {
//                 const filename = image.name;
//                 let data = [];
//                 const contentType = image.contentType || 'image/jpeg'; // Default to JPEG if contentType not set
//                 const downloadStream = bucket.openDownloadStreamByName(filename);

//                 downloadStream.on('data', chunk => {
//                     data.push(chunk);
//                 });

//                 downloadStream.on('error', function (error) {
//                     console.error(`Error downloading ${filename}:`, error);
//                     reject(error);
//                 });

//                 downloadStream.on('end', () => {
//                     const imgBase64 = Buffer.concat(data).toString('base64');
//                     // Include the description in the resolved object
//                     resolve({
//                         image: `data:${contentType};base64,${imgBase64}`,
//                         race_bias: image.race_bias,
//                     });
//                 });
//             });
//         }));



//         res.status(200).json({ images: imagesData });
//     } catch (error) {
//         console.error('Failed to fetch main images:', error);
//         res.status(500).send({ message: 'Failed to fetch main images', error: error.message });
//     }
// });

module.exports = router;