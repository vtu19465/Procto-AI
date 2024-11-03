const express = require('express');
const Submission = require('../models/Submission');
const Assessment = require('../models/Assessment');

const router = express.Router();

// Submit answers for an assessment
router.post('/', async (req, res) => {
  try {
    const { studentId, assessmentId, answers } = req.body;

    // Calculate the score
    const assessment = await Assessment.findById(assessmentId);
    let score = 0;

    assessment.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index].selectedAnswer) {
        score += 1;  // or apply your scoring logic
      }
    });

    const submission = new Submission({
      studentId,
      assessmentId,
      answers,
      score,
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
