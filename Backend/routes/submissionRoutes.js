const express = require('express');
const Submission = require('../models/Submission');
const Assessment = require('../models/Assessment');

const router = express.Router();

router.post('/submissions', async (req, res) => {
  try {
    const { studentId, assessmentId, answers } = req.body;

    // Fetch the assessment to retrieve correct answers
    const assessment = await Assessment.findById(assessmentId).populate('questions');
    // console.log(answers);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Calculate the score
    let score = 0;
    const answerMap = {};
    // Create a map of the selected answers for easy access
    answers.forEach((answer) => {
      answerMap[answer.questionId] = answer.selectedAnswer;
    });


    assessment.questions.forEach((question) => {
      // Compare the selected answer with the correct answer
      if (question.correctAnswer === answerMap[question._id.toString()]) {
        score += 1; // Increment score for correct answers
      }
    });
    // Create a new submission
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

    // Fetch submissions for the given studentId, populate assessment details
    const submissions = await Submission.find({ studentId })
      .populate('assessmentId', 'title')  // Only populate the title field of assessment
      .sort({ submittedAt: -1 }); // Sort by submission date in descending order
    console.log(submissions);
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submission history:', error);
    res.status(500).json({ message: 'Failed to fetch submission history' });
  }
});


module.exports = router;
