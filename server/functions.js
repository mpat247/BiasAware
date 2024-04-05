const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// Import Image model
const Image = require('./models/imageModel');

// MongoDB connection string
const mongoDB = 'mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority';

// async function saveImagesToMongoDB() {
//   console.log('MongoDB connection established.');
//   const conn = mongoose.connection;
//   const gfs = new GridFSBucket(conn.db, { bucketName: 'images' });

//   // CSV file path and images folder path
//   const csvFilePath = 'D:/manav/Documents/Engineering/4th Year/Capstone/BiasAware/server/Emotions/import.csv';
//   const imagesFolderPath = 'D:/manav/Documents/Engineering/4th Year/Capstone/BiasAware/server/Emotions';

//   fs.createReadStream(csvFilePath)
//     .pipe(csv())
//     .on('data', async (row) => {
//       const { name, prompt, bias_id, bias_name, generator } = row;
//       const imageName = `${name}.jpg`;
//       const imagePath = path.join(imagesFolderPath, imageName);

//       // Check if image file exists
//       if (fs.existsSync(imagePath)) {
//         console.log(`Processing image: ${imageName}`);

//         // Create read stream for image
//         const readStream = fs.createReadStream(imagePath);
//         // Open upload stream to GridFSBucket
//         const writeStream = gfs.openUploadStream(imageName);

//         // Pipe image read stream to GridFSBucket write stream
//         readStream.pipe(writeStream)
//           .on('finish', async () => {
//             console.log(`Successfully uploaded ${imageName}`);

//             // Save image metadata in the images collection
//             await Image.create({
//               name: imageName,
//               prompt,
//               bias_id,
//               bias_name,
//               bias_type: null,
//               generator,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//               age_bias: null,
//               gender_bias: null,
//               race_bias: null
//             });

//             console.log(`Metadata for ${name} saved in the images collection.`);
//           })
//           .on('error', (err) => {
//             console.error(`Error uploading ${imageName}:`, err);
//           });
//       } else {
//         console.log(`Image file ${imageName} does not exist in the specified path: ${imagePath}`);
//       }
//     })
//     .on('end', () => {
//       console.log('CSV file processing completed. Initiating image fetch and save process.');
//     });
// }

async function fetchAndSaveImages() {
  console.log('Fetching images with name starting with EMO_P6.');
  const conn = mongoose.connection;
  const gfs = new GridFSBucket(conn.db, { bucketName: 'images' });
  const fetchedDir = path.join(__dirname, 'FETCHED');

  if (!fs.existsSync(fetchedDir)) {
    fs.mkdirSync(fetchedDir);
  }

  const images = await Image.find({ name: /^EMO_P6/ });
  images.forEach(image => {
    const readStream = gfs.openDownloadStreamByName(image.name);
    const writeStream = fs.createWriteStream(path.join(fetchedDir, `${image.name}`));
    readStream.pipe(writeStream).on('finish', () => {
      console.log(`Successfully fetched and saved ${image.name}`);
    });
  });
}

async function main() {
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
   // await saveImagesToMongoDB();
    await fetchAndSaveImages();
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

// Init function to call main
function init() {
  main().then(() => console.log('All operations completed.'));
}

init();
