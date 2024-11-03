// models/Submission.js
const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//   questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   answer: { type: String, required: true },
// });

const submissionSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // Or ObjectId if referencing a User model
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  // answers: [answerSchema],
  score : {type: Number},
  submittedAt: { type: Date, default: Date.now },
},
{
  collection: "submissions",
});

module.exports = mongoose.model('Submission', submissionSchema);
