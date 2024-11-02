// src/AssessmentPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AssessmentPage = () => {
  const { assignmentId } = useParams(); // Get the assignment ID from the URL

  // Mock data for questions - replace this with actual data as needed
  const questions = [
    { id: 1, text: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
    { id: 2, text: 'Solve: 5 + 3', options: ['5', '7', '8', '10'] },
    { id: 3, text: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'] },
  ];

  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Answers:', answers);
    alert('Your answers have been submitted!');
    // Here you could also send the answers to a backend server
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Assessment for Assignment ID: {assignmentId}</h1>

      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="mb-4">
            <h5>{question.text}</h5>
            {question.options.map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleOptionChange(question.id, option)}
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit Answers</button>
      </form>
    </div>
  );
};

export default AssessmentPage;
