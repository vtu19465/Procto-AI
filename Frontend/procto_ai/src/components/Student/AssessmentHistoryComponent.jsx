// src/components/AssessmentHistoryComponent.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssessmentHistoryComponent = () => {
    const studentId = localStorage.getItem("u_id");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch assessment history for the student
    const fetchAssessmentHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/submissions/history/${studentId}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching assessment history:', error);
      }
    };

    fetchAssessmentHistory();
  }, [studentId]);

  if (submissions.length === 0) {
    return <p>No assessment history available.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Assessment History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {submissions.map((submission) => (
          <div key={submission._id} className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">
              {submission.assessmentId ? submission.assessmentId.title : 'Unknown Assessment'}
            </h3>
            <p className="text-gray-500">Score: {submission.score}</p>
            <p className="text-gray-500">Submitted on: {new Date(submission.submittedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentHistoryComponent;
