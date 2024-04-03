const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  bias_id: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  bias_name: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  bias_type: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  gender: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  qol_type: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  profession_type: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  skin_shade: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  },
  gender_bias: {
    type: String, // Added field for gender bias
    required: false
  },
  race_bias: {
    type: String, // Added field for race bias
    required: false
  },
  age_bias: {
    type: String, // Added field for age bias
    required: false
  }

}, {
  timestamps: true // Optionally add timestamps for created and updated times
});

const Image = mongoose.model('Images', imageSchema);

module.exports = Image;
