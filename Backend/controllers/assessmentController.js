const Assessment = require('../models/Assessment');

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
  const { assessmentId } = req.params; 
  const { answers } = req.body; 

  try {
    const submission = new Submission({
      assessmentId,
      answers,
      submittedAt: new Date(),
    });

    await submission.save();

    res.status(201).json({ message: 'Assessment submitted successfully', submission });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
};

exports.updateAssessment = async (req, res) => {
  const { assessmentId } = req.params;
  const { title, dueDate, questions } = req.body;

  try {
    const updatedAssessment = await Assessment.findByIdAndUpdate(
      assessmentId,
      { title, dueDate, questions },
      { new: true } // Return the updated document
    );

    if (!updatedAssessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.status(200).json({ message: 'Assessment updated successfully', assessment: updatedAssessment });
  } catch (error) {
    console.error('Error updating assessment:', error);
    res.status(500).json({ error: 'Failed to update assessment' });
  }
};

exports.deleteAssessment = async (req, res) => {
  const { assessmentId } = req.params;

  try {
    const deletedAssessment = await Assessment.findByIdAndDelete(assessmentId);
    if (!deletedAssessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.status(200).json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ error: 'Failed to delete assessment' });
  }
};