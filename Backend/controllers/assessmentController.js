// controllers/assessmentController.js
const Assessment = require('../models/Assessment');

exports.createAssessment = async (req, res) => {
  try {
    const { title, dueDate, questions } = req.body;
    const assessment = new Assessment({ title, dueDate, questions });
    await assessment.save();
    res.status(201).json({ message: 'Assessment created successfully', assessment });
  } catch (error) {
    console.error('Error creating assessment:', error); // Log the specific error
    res.status(500).json({ error: 'Failed to create assessment' });
  }
};
// controllers/assessmentController.js
exports.getAssessments = async (req, res) => {
    try {
      const assessments = await Assessment.find();
      res.status(200).json(assessments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch assessments' });
    }
  };
  