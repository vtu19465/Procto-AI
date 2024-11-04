const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/assessments', assessmentController.createAssessment);
router.get('/assessments', assessmentController.getAssessments);
router.get('/assessments/:assessmentId', assessmentController.getAssessmentById);
router.post('/assessments/:assessmentId/submit', assessmentController.submitAssessment);
router.put('/assessments/:assessmentId', assessmentController.updateAssessment);
router.delete('/assessments/:assessmentId', assessmentController.deleteAssessment);

module.exports = router;
