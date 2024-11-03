// src/components/AssessmentPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AssessmentPage = () => {
  const { assessmentId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`/api/assessments/${assessmentId}`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching assessment:', error);
      }
    };

    fetchAssessment();
  }, [assessmentId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/submissions', {
        assessmentId,
        answers,
      });
      alert('Assessment submitted successfully');
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Assessment</h2>
      {questions.map((question) => (
        <div key={question._id} className="card my-3 p-3">
          <h5>{question.questionText}</h5>
          {question.options.map((option, index) => (
            <label key={index} className="d-block">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={answers[question._id] === option}
                onChange={() => handleAnswerChange(question._id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit Assessment
      </button>
    </div>
  );
};

export default AssessmentPage;
