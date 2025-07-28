const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  specialization: String,
  qualifications: String,
  clinicName: String,
  address: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
});

userSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);
