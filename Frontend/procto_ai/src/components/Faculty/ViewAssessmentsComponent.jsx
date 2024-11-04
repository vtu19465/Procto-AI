// src/components/ViewAssessments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/assessments');
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment);
    setIsEditing(false); // Reset editing mode
  };

  const handleBackClick = () => {
    setSelectedAssessment(null);
    setIsEditing(false);
  };

  const handleDeleteAssessment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/assessments/${id}`);
      alert('Assessment deleted successfully!');
      fetchAssessments(); // Refresh the list after deletion
      setSelectedAssessment(null);
    } catch (error) {
      console.error('Error deleting assessment:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3000/api/assessments/${selectedAssessment._id}`, selectedAssessment);
      alert('Assessment updated successfully!');
      setIsEditing(false);
      fetchAssessments(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating assessment:', error);
    }
  };

  const handleInputChange = (e, index, field) => {
    const updatedAssessment = { ...selectedAssessment };
    if (field === 'title') {
      updatedAssessment.title = e.target.value;
    } else {
      updatedAssessment.questions[index][field] = e.target.value;
    }
    setSelectedAssessment(updatedAssessment);
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
                  className="list-group-item list-group-item-action cursor-pointer hover:bg-gray-200 transition d-flex justify-content-between align-items-center"
                  onClick={() => handleAssessmentClick(assessment)}
                >
                  <span className="text-lg font-semibold">{assessment.title}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click on assessment item
                      handleDeleteAssessment(assessment._id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold mb-3">
            {isEditing ? (
              <input
                type="text"
                value={selectedAssessment.title}
                onChange={(e) => handleInputChange(e, null, 'title')}
                className="form-control"
              />
            ) : (
              selectedAssessment.title
            )}
          </h3>
          <h5 className="text-lg font-semibold">Questions:</h5>
          <ul className="list-group">
            {selectedAssessment.questions.map((question, index) => (
              <li key={index} className="list-group-item border p-3 my-2 rounded shadow-sm">
                <strong>Q{index + 1}: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleInputChange(e, index, 'questionText')}
                    className="form-control"
                  />
                ) : (
                  question.questionText
                )}
                <ul className="mt-2 list-disc list-inside pl-5">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
                <p className="mt-2">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            {!isEditing ? (
              <button className="btn btn-warning mr-2" onClick={handleEditClick}>
                Edit
              </button>
            ) : (
              <button className="btn btn-success mr-2" onClick={handleSaveClick}>
                Save
              </button>
            )}
            <button className="btn btn-secondary" onClick={handleBackClick}>
              Back to Assessments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAssessments;
