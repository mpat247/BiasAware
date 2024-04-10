// Dependencies
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');

// MongoDB Atlas connection string
const mongoDBUri = 'mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority';

// Connect to MongoDB without deprecated options
mongoose.connect(mongoDBUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Successfully connected to MongoDB Atlas.');
});

// Crime Schema Definition
const crimeSchema = new mongoose.Schema({
    crime: String,
    crimeId: Number
});
const Crime = mongoose.model('Crime', crimeSchema);

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

// Function to Update Images with crimeId
async function updateImagesWithCrimeId() {
    const crimes = await Crime.find({});
    for (const crime of crimes) {
        await Image.updateMany({ bias_name: 'Crime', prompt: crime.crime }, { $set: { crimeId: crime.crimeId.toString() } });
    }
    console.log('Images updated with crimeId where applicable.');
}

// Function to parse CSV and insert data
const insertCrimesFromCSV = (filePath) => {
    const crimes = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            crimes.push({
                crime: row.crime,
                crimeId: parseInt(row.crimeId, 10) // Ensure crimeId is a Number
            });
        })
        .on('end', async () => {
            await Crime.insertMany(crimes);
            console.log('Crimes data successfully inserted into MongoDB Atlas.');
            await updateImagesWithCrimeId();
        });
};

// Path to your CSV file - Update this to the actual path
const filePath = 'server/crime.csv';

// Execute the function
insertCrimesFromCSV(filePath);
