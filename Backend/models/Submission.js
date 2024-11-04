const mongoose = require('mongoose');
const submissionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  score : {type: Number},
  submittedAt: { type: Date, default: Date.now },
},
{
  collection: "submissions",
});

module.exports = mongoose.model('Submission', submissionSchema);
