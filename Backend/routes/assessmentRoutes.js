// routes/assessmentRoutes.js
const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

// Route to create a new assessment
router.post('/assessments', assessmentController.createAssessment);

// Route to get all assessments
router.get('/assessments', assessmentController.getAssessments);

module.exports = router;
