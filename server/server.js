require('dotenv').config();
const express = require('express');
const { connectToDatabase, mongoose } = require('./dbConfig'); // Adjust the path as necessary
const User = require('./models/userModel');
const Image = require('./models/imageModel');
const Bias = require('./models/biasModel'); // Adjust the path as necessary
const recursiveReadDir = require('recursive-readdir');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const { GridFSBucket } = require('mongodb');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the MERN Capstone Project' });
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

function ignoreFunc(file, stats) {
  // Filters out files that are not images
  return !stats.isDirectory() && !/\.(jpg|jpeg|png|gif)$/i.test(path.extname(file));
}

const uploadImagesFromFolder = async (folderPath, db) => {
  const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'images' });

  try {
    const files = await recursiveReadDir(folderPath, [ignoreFunc]);
    for (let file of files) {
      const filename = path.basename(file);
      const readStream = fs.createReadStream(file);
      const uploadStream = bucket.openUploadStream(filename);
      readStream.pipe(uploadStream);

      await new Promise((resolve, reject) => {
        uploadStream.on('error', (error) => {
          console.error(`Error uploading file ${filename}:`, error);
          reject(error);
        });
        uploadStream.on('finish', () => {
          console.log(`Uploaded ${filename} successfully.`);
          resolve();
        });
      });

      const newImage = new Image({
        name: filename,
        prompt: null, // Set other fields as null by default
        bias_id: null,
        bias_name: null,
        bias_type: null,
        generator: null,  
      });
      await newImage.save();
    }
    console.log(`${files.length} images uploaded successfully.`);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

app.post('/upload-images', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const imagesFolder = path.resolve('D:/manav/Documents/Engineering/4th Year/Capstone/BiasAware/server/FINALIMAGES');
    await uploadImagesFromFolder(imagesFolder, db);
    res.json({ message: 'Image upload process completed.' });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Failed to upload images', error });
  }
});

app.get('/download-all-images', async (req, res) => {
  const db = await connectToDatabase();
  const bucket = new GridFSBucket(db, { bucketName: 'images' });
  const downloadPath = path.resolve(__dirname, 'PicturesFinalNew');

  // Ensure the download directory exists
  if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
  }

  try {
      const files = await bucket.find({}).toArray();
      
      if (files.length === 0) {
          return res.status(404).send('No files found');
      }

      await Promise.all(files.map(file => new Promise((resolve, reject) => {
          const filename = file.filename;
          const outputPath = path.join(downloadPath, filename);
          const downloadStream = bucket.openDownloadStreamByName(filename);
          const writeStream = fs.createWriteStream(outputPath);
          
          downloadStream.pipe(writeStream)
              .on('error', reject)
              .on('finish', () => {
                  console.log(`Downloaded ${filename} successfully.`);
                  resolve();
              });
      })));

      res.send('All images have been downloaded successfully.');
  } catch (error) {
      console.error('Failed to download images:', error);
      res.status(500).send('Failed to download images');
  }
});

app.post('/bias', async (req, res) => {
  try {
    const { bias_name, bias_type } = req.body; // Ensure you are destructuring both bias_name and bias_type

    // Since bias_type is optional, we provide a default value of null if it's not included in the request
    const newBias = new Bias({
      bias_name,
      bias_type: bias_type || null,
    });

    await newBias.save();
    res.status(201).json({ message: 'Bias successfully added', bias: newBias });
  } catch (error) {
    console.error('Error adding bias:', error);
    res.status(500).json({ message: 'Failed to add bias', error: error.message });
  }
});

const addictionsRoute = require('./routes/addictions');
app.use('/addictions', addictionsRoute);

const emotionsRoute = require('./routes/emotions');
app.use('/emotions', emotionsRoute);



async function main() {
  try {
    await connectToDatabase(); // Make sure this function actually waits for the connection
    console.log('Successfully connected to the database.');

    // Now that we're connected, set up the rest of the app
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with an error code
  }
}

main();
