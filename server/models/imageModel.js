const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: false
  },
  bias_id: {
    type: String,
    required: false
  },
  bias_name: {
    type: String,
    required: false
  },
  bias_type: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  qol_type: {
    type: String,
    required: false
  },
  profession_type: {
    type: String,
    required: false
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
  timestamps: true
});

const Image = mongoose.model('Images', imageSchema);

module.exports = Image;
