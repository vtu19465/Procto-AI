const express = require('express');
const authController = require('../controllers/authController');
const { validateLogin } = require('../middlewares/validateLogin');

const router = express.Router();

// Login route with validation middleware
router.post('/login', validateLogin, authController.login);

module.exports = router;
