const express = require('express');
const Submission = require('../models/Submission');
const Assessment = require('../models/Assessment');

const router = express.Router();

router.post('/submissions', async (req, res) => {
  try {
    const { studentId, assessmentId, answers } = req.body;
    const assessment = await Assessment.findById(assessmentId).populate('questions');
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    let score = 0;
    const answerMap = {};
    answers.forEach((answer) => {
      answerMap[answer.questionId] = answer.selectedAnswer;
    });


    assessment.questions.forEach((question) => {
      if (question.correctAnswer === answerMap[question._id.toString()]) {
        score += 1;
      }
    });
    const submission = new Submission({
      studentId,
      assessmentId,
      score,
      submittedAt: Date.now(),
    });
    await submission.save();
    res.status(201).json({ message: 'Submission successful', submission, score });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ message: 'Failed to submit answers' });
  }
});

router.get('/submissions/history/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const submissions = await Submission.find({ studentId })
      .populate('assessmentId', 'title')
      .sort({ submittedAt: -1 });
    console.log(submissions);
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submission history:', error);
    res.status(500).json({ message: 'Failed to fetch submission history' });
  }
});


module.exports = router;
