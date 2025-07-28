const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
