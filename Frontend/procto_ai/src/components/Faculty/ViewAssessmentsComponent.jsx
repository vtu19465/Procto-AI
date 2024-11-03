// src/components/ViewAssessments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/assessments');
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, []);

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleBackClick = () => {
    setSelectedAssessment(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-3xl font-bold">View Assessments</h2>

      {!selectedAssessment ? (
        <div>
          {assessments.length === 0 ? (
            <p className="text-center text-gray-500">No assessments available.</p>
          ) : (
            <ul className="list-group">
              {assessments.map((assessment) => (
                <li
                  key={assessment._id}
                  className="list-group-item list-group-item-action cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => handleAssessmentClick(assessment)}
                >
                  <span className="text-lg font-semibold">{assessment.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold mb-3">{selectedAssessment.title}</h3>
          <h5 className="text-lg font-semibold">Questions:</h5>
          <ul className="list-group">
            {selectedAssessment.questions.map((question, index) => (
              <li key={index} className="list-group-item border p-3 my-2 rounded shadow-sm">
                <strong>Q{index + 1}: </strong> {question.questionText}
                <ul className="mt-2 list-disc list-inside pl-5">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
                <p className="mt-2"><strong>Correct Answer:</strong> {question.correctAnswer}</p>
              </li>
            ))}
          </ul>
          <button 
            className="btn btn-secondary mt-3" 
            onClick={handleBackClick}
          >
            Back to Assessments
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAssessments;
