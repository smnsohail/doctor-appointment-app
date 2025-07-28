const router = require("express").Router();
const doctorController = require('../controllers/doctor.controller');
const User = require("../models/User");

router.post('/register', doctorController.registerDoctor);

// Patient Login
router.post('/login', doctorController.loginDoctor);


// Get all doctors with optional filters
router.get("/", async (req, res) => {
  try {
    const filters = { role: "doctor" };

    if (req.query.specialization) {
      filters.specialization = req.query.specialization;
    }

    const doctors = await User.find(filters).select("-password");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get nearby doctors using geospatial query
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    const doctors = await User.find({
      role: "doctor",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius), // radius in meters
        },
      },
    }).select("-password");

    // Calculate distances
    const doctorsWithDistance = doctors.map((doctor) => {
      const distance = calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        doctor.location.coordinates[1],
        doctor.location.coordinates[0]
      );
      return {
        ...doctor.toObject(),
        distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
      };
    });

    res.json(doctorsWithDistance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}


module.exports = router;
