const mongoose = require('mongoose');

const uri = "mongodb+srv://arshroop:biasaware@biasaware.ipjjs0e.mongodb.net/capstone?retryWrites=true&w=majority";

const clientOptions = { 
    serverApi: { 
        version: '1', 
        strict: true, 
        deprecationErrors: true 
    } 
};

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
