const Submission = require('../models/Submission');

exports.submitAnswers = async (req, res) => {
  try {
    const { studentId, assessmentId, answers } = req.body;
    const submission = new Submission({ studentId, assessmentId, answers });
    await submission.save();
    res.status(201).json({ message: 'Assessment submitted successfully', submission });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
};
