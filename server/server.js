require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const connectToDatabase = require('./dbConfig'); // Make sure the path is correct
const User = require('./models/userModel'); // Adjust the path as per your project structure

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the MERN Capstone Project' });
});

// Create a new user
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Connect to the database, then start the server
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log('Server is listening on port', port);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error);
});
