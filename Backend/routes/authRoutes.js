const express = require('express');
const authController = require('../controllers/authController');
const { validateLogin } = require('../middlewares/validateLogin');

const router = express.Router();
router.post('/login', validateLogin, authController.login);

module.exports = router;
