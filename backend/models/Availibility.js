const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  isBooked: { type: Boolean, default: false },
  bookedByPatientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const availabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  slots: [slotSchema]
});

module.exports = mongoose.model('Availability', availabilitySchema);
