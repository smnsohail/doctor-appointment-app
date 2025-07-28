const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlot: String,
  status: { type: String, enum: ['pending', 'confirmed', 'canceled', 'completed'], default: 'pending' },
  reasonForVisit: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
