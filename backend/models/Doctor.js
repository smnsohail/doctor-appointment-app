const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  specialization: String,
  phone: String,
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  availability: [{
    day: String,
    from: String,
    to: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
