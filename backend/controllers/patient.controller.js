const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Patient
exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role: 'patient' });
  await user.save();
  res.status(201).json({ message: 'Patient registered successfully.' });
};

// Patient Login
exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'patient' });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials.' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};
