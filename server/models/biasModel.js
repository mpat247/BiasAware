const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const biasSchema = new mongoose.Schema({
  bias_name: {
    type: String,
    required: true
  },
  bias_type: {
    type: String,
    default: null // Assuming bias_type can be optional
  }
});

biasSchema.plugin(AutoIncrement, { inc_field: 'bias_id', start_seq: 1 });

const Bias = mongoose.model('Bias', biasSchema);

module.exports = Bias;
