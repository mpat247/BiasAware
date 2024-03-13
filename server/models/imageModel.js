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
  generator: {
    type: String,
    required: false // Set to false if some images might not have a prompt
  }
}, {
  timestamps: true // Optionally add timestamps for created and updated times
});

const Image = mongoose.model('Images', imageSchema);

module.exports = Image;
