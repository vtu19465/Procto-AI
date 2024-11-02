const { validationResult } = require('express-validator');
const User = require("../models/Users");
const bcrypt = require('bcrypt'); // Make sure bcrypt is installed

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array()); // Log validation errors
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, userType } = req.body;

  try {
    // Find the user by username and userType
    const user = await User.findOne({ name: username, role: userType });
    if (!user) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    // const isMatch = await bcrypt.compare(password, user.passwd); // Ensure user.passwd is hashed

    if (password == user.passwd) {
      return res.status(200).json({ message: 'Login successful', userType: user.role });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
