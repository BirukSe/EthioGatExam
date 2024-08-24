const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, phone });
    res.status(200).send({ success: true, msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error in /register route:', error);
    res.status(500).send({ msg: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ msg: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).send({ success: true, token });
  } catch (error) {
    console.error('Error in /login route:', error);
    res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = router;
