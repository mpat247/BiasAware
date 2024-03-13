require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Grid = require('gridfs-stream');

const app = express();
const port = process.env.PORT || 3001;
const connectToDatabase = require('./dbConfig');
const User = require('./models/userModel');

// Middleware to parse JSON
app.use(express.json());

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Connect to MongoDB
connectToDatabase();

let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Upload an image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { name } = req.body;
        const imageData = req.file.buffer;

        // Create a write stream to store the image data
        const writeStream = gfs.createWriteStream({
            filename: req.file.originalname
        });

        // Write the image data to the database
        writeStream.on('close', async (file) => {
            const user = new User({ name, fileId: file._id });
            await user.save();
            res.status(201).send(user);
        });

        writeStream.write(imageData);
        writeStream.end();
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get an image
app.get('/image/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) });

        if (!file) {
            return res.status(404).send('File not found');
        }

        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log('Server is listening on port', port);
});
