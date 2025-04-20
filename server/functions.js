// Dependencies
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');

// MongoDB Atlas connection string
const mongoDBUri = 'mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoDBUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Successfully connected to MongoDB Atlas.');
});

// Image Schema Definition
const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: false },
    bias_id: { type: String, required: false },
    bias_name: { type: String, required: false },
    bias_type: { type: String, required: false },
    gender: { type: String, required: false },
    qol_type: { type: String, required: false },
    profession_type: { type: String, required: false },
    skin_shade: { type: String, required: false },
    gender_bias: { type: String, required: false },
    race_bias: { type: String, required: false },
    age_bias: { type: String, required: false },
    description: { type: String, required: false },
    crimeId: { type: String, required: false },
}, { timestamps: true });
const Image = mongoose.model('Images', imageSchema);

// Function to update Images with bias data from CSV
async function updateImagesWithBiasData(filePath) {
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
            const { prompt, gender_bias, race_bias, age_bias } = row;
            // Check if prompt is not empty and try to update the corresponding images
            if (prompt) {
                const result = await Image.updateMany({ prompt: prompt }, {
                    $set: {
                        gender_bias: gender_bias || null, // Set to null if empty
                        race_bias: race_bias || null,
                        age_bias: age_bias || null,
                    }
                });

                if (result.matchedCount === 0) {
                    console.log(`No images found with prompt: ${prompt}. Skipping.`);
                } else if (result.modifiedCount === 0) {
                    console.log(`Images with prompt: ${prompt} were already up-to-date. Skipping.`);
                } else {
                    console.log(`Images with prompt: ${prompt} updated with bias data. Count: ${result.modifiedCount}`);
                }
            } else {
                console.log("Encountered an empty prompt. Skipping this row.");
            }
        })
        .on('end', () => {
            console.log('Completed updating images with bias data.');
        });
}

// Path to your CSV file - Update this to the actual path
const filePath = 'server/race.csv';

// Execute the function
updateImagesWithBiasData(filePath);
