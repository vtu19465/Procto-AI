// controllers/assessmentController.js

const Assessment = require('../models/Assessment');

// Existing functions
exports.createAssessment = async (req, res) => {
  try {
    const { title, dueDate, questions } = req.body;
    const assessment = new Assessment({ title, dueDate, questions });
    await assessment.save();
    res.status(201).json({ message: 'Assessment created successfully', assessment });
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ error: 'Failed to create assessment' });
  }
};

exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
};

// New function to get a specific assessment by ID
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessmentId);
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessment' });
  }
};


exports.submitAssessment = async (req, res) => {
  const { assessmentId } = req.params; // Get the assessment ID from the URL parameters
  const { answers } = req.body; // Get the submitted answers from the request body

  try {
    // Here you can save the submission to a database
    const submission = new Submission({
      assessmentId,
      answers,
      submittedAt: new Date(),
    });

    await submission.save(); // Save the submission

    res.status(201).json({ message: 'Assessment submitted successfully', submission });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
};
