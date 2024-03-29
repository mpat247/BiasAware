const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Image = require('./models/imageModel'); // Adjust the import path as necessary

async function addDescriptionFromCSV(csvFilePath) {
  try {
    // Establish a connection to the MongoDB database
    await mongoose.connect('mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority&appName=biasaware', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to the database.');

    console.log(`Reading CSV file from: ${csvFilePath}`);

    // Create a promise to wait for CSV file processing to complete
    await new Promise((resolve, reject) => {
      const updates = []; // Hold promises for all update operations

      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          const prompt = row.prompt;
          const description = row.description;

          // Push update operation promises into the updates array
          const updatePromise = Image.findOne({ prompt: prompt }).then(image => {
            if (image) {
              // Update the image document with the description
              return Image.findByIdAndUpdate(image._id, { description: description });
            } else {
              console.log(`Image with prompt ${prompt} not found.`);
              return Promise.resolve();
            }
          });

          updates.push(updatePromise);
        })
        .on('end', () => {
          // Resolve the main promise after all updates are done
          Promise.all(updates).then(() => {
            console.log('CSV file processing completed.');
            resolve();
          }).catch(reject);
        })
        .on('error', (error) => {
          console.error('Error processing CSV file:', error);
          reject(error);
        });
    });

    console.log('Completed updating images with description information.');
  } catch (error) {
    console.error('Error updating images:', error);
  } finally {
    // Close the connection after all operations are done
    await mongoose.disconnect();
    console.log('Disconnected from the database.');
  }
}

async function main() {
  try {
    const csvFilePath = "/Users/manav/Documents/Fourth Year/Capstone/BiasAware/server/des1.csv";
    await addDescriptionFromCSV(csvFilePath);
  } catch (error) {
    console.error('Failed to update images:', error);
  }
}

main();
