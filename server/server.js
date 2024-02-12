require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3001

app.get('/', (req,res) => {
    res.json({msg: 'Welcome'})
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(port, () => {
            console.log('Successfully Connected to Database & Listening on Port     ', port);
        })
    })
    .catch((error) => {
        console.log(error)
    })




