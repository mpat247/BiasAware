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
const csv = require('csv-parser');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Capstone Project' });
});

async function uploadImagesFromCSVAndFolder(csvFilePath, imagesFolderPath, db) {
  const bucket = new GridFSBucket(db, { bucketName: 'images' });

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      const { name, prompt, bias_id, bias_name, generator } = row;
      const imagePath = path.join(imagesFolderPath, `${name}.jpeg`);

      if (fs.existsSync(imagePath)) {
        console.log(`Uploading image: ${name}`);
        const readStream = fs.createReadStream(imagePath);

        const uploadStream = bucket.openUploadStream(name, {
          metadata: { prompt, bias_id, bias_name, generator }
        });

        readStream.pipe(uploadStream)
          .on('finish', () => console.log(`Successfully uploaded: ${name}`))
          .on('error', (error) => console.error(`Error uploading ${name}:`, error));
      } else {
        console.log(`File not found: ${imagePath}`);
      }
    })
    .on('end', () => console.log('CSV file processing completed.'));
}

app.post('/upload-images', async (req, res) => {
  const db = await connectToDatabase();

  const csvFilePath = path.resolve(__dirname, 'server/Emotions/emotions123.csv');
  const imagesFolderPath = path.resolve(__dirname, 'server/Emotions');

  if ((mongoose.connection).readyState === 1) { // If MongoDB connection is ready
    await uploadImagesFromCSVAndFolder(csvFilePath, imagesFolderPath, db);
    res.json({ message: 'Image upload process completed.' });
  } else {
    res.status(500).json({ message: 'Database connection not ready' });
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



// Function to parse the QOL CSV file and return prompt-description pairs
function parseQOLCSV(csvFilePath) {
  return new Promise((resolve, reject) => {
    const promptDescriptions = {};
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const prompt = row['prompt'];
        const description = row['description'];
        promptDescriptions[prompt] = description;
      })
      .on('end', () => {
        resolve(promptDescriptions);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// API endpoint to update or add image descriptions
app.post('/update-image-descriptions', async (req, res) => {
  try {
    const qolCsvFilePath = path.resolve(__dirname, 'server/qol.csv');
    const promptDescriptions = await parseQOLCSV(qolCsvFilePath);

    const imagesToUpdate = await Image.find({ bias_name: 'Quality of Life' });

    imagesToUpdate.forEach(async (image) => {
      const prompt = image.prompt;

      if (prompt in promptDescriptions) {
        // If prompt exists in CSV, update or add description to image
        const description = promptDescriptions[prompt];
        await Image.findOneAndUpdate({ _id: image._id }, { description: description }, { new: true });
        console.log(`Updated description for image with prompt: ${prompt}`);
      } else {
        console.log(`No description found for prompt: ${prompt}`);
      }
    });

    res.status(200).json({ message: 'Image descriptions updated successfully.' });
  } catch (error) {
    console.error('Error updating image descriptions:', error);
    res.status(500).json({ message: 'Failed to update image descriptions', error: error.message });
  }
});


const addictionsRoute = require('./routes/addictions');
app.use('/addictions', addictionsRoute);


const emotionsRoute = require('./routes/emotions');
app.use('/emotions', emotionsRoute);

const qolRoute = require('./routes/qol');
app.use('/qol', qolRoute);

const crimeRoutes = require('./routes/crimes');
app.use('/crimes', crimeRoutes);

const professionsRoute = require('./routes/professions');
app.use('/professions', professionsRoute);

const activitiesRoute = require('./routes/activities');
app.use('/activities', activitiesRoute);

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
