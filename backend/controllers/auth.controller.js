const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role, specialization, qualifications, clinicName, address, location } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword, role, specialization, qualifications, clinicName, address, location });
    await user.save();
    res.status(201).json({ message: 'Registered successfully.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials.' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};
