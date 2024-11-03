// models/Assessment.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  questions: [questionSchema],
},
{
  collection: "assessments",
});

module.exports = mongoose.model('Assessment', assessmentSchema);
