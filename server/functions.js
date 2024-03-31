const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// MongoDB connection string
const mongoDB = 'mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established.'))
  .catch(err => console.error('MongoDB connection error:', err));

const conn = mongoose.connection;

conn.once('open', function () {
  console.log('Connection open. Ready to stream files to GridFS.');

  const gfs = new GridFSBucket(conn.db, { bucketName: 'images' });
  const csvFilePath = './server/Emotions/emotions123.csv'; // Adjust to your CSV file path
  const imagesFolderPath = './server/Emotions'; // Adjust to your images folder path

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      const { name, prompt, bias_id, bias_name, generator } = row;
      const imagePath = path.join(imagesFolderPath, `${name}.jpeg`);

      if (fs.existsSync(imagePath)) {
        console.log(`Processing image: ${name}`);

        const readStream = fs.createReadStream(imagePath);
        const writeStream = gfs.openUploadStream(name + '.jpeg', {
          metadata: {
            prompt, bias_id, bias_name, generator,
            bias_type: null, gender: null, qol_type: null, profession_type: null, skin_shade: null, description: null
          }
        });

        readStream.pipe(writeStream)
          .on('finish', () => {
            console.log(`Successfully uploaded ${name}. Metadata:`, {
              prompt, bias_id, bias_name, generator
              // Logging additional fields if necessary
            });
          })
          .on('error', (err) => {
            console.error(`Error uploading ${name}:`, err);
          });
      } else {
        console.log(`Image file ${name} does not exist in the specified path: ${imagePath}`);
      }
    })
    .on('end', () => {
      console.log('CSV file processing completed. Check logs for details on each operation.');
    });
});
