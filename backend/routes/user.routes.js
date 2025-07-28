const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middlewares/auth.middleware');

// Get user profile
router.get('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Unauthorized' });
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  res.json(updated);
});

module.exports = router;
