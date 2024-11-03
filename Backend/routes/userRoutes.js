const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get specific user by username
router.post('/users', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ name: username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
