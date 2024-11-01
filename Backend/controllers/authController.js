const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()); // Log validation errors to check
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, userType } = req.body;

  // Static data for validation (to be replaced with database logic)
  const staticUser = {
    username: 'testUser',
    password: 'password123',
    userType: 'student'
  };

  try {
    if (username === staticUser.username && password === staticUser.password && userType === staticUser.userType) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
