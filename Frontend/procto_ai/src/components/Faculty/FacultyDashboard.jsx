// src/components/FacultyDashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FacultyDashboard = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/assessments', {
        title,
        dueDate,
        questions,
      });
      alert('Assessment created successfully');
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Faculty Dashboard - Create Assessment</h2>
      <input
        type="text"
        placeholder="Assessment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control my-2"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="form-control my-2"
      />

      <h4>Questions</h4>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="card my-3 p-3">
          <input
            type="text"
            placeholder="Question Text"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
            className="form-control mb-2"
          />
          <h6>Options:</h6>
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              className="form-control my-1"
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
            className="form-control mt-2"
          />
        </div>
      ))}

      <button className="btn btn-secondary mt-2" onClick={addQuestion}>
        Add Question
      </button>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Create Assessment
      </button>
    </div>
  );
};

export default FacultyDashboard;
