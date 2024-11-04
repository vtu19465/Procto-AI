const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

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

router.post('/users/create-account', async (req, res) => {
  const { userId, username, name, email, password, userType = "student" } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same username or email already exists' });
    }

    const newUser = new User({
      id: userId,
      name : name,
      email_id: email, 
      role: userType,
      passwd: password,
    });

    await newUser.save();

    res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

module.exports = router;