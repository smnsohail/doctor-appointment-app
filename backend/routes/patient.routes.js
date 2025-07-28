const express = require('express');
const patientController = require('../controllers/patient.controller');
const router = express.Router();

// Patient Registration
router.post('/register', patientController.registerPatient);

// Patient Login
router.post('/login', patientController.loginPatient);

module.exports = router;
