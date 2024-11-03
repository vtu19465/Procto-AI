// src/components/FacultyDashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddAssessmentComponent = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
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
    if (questions[questions.length - 1].questionText === '') {
      questions.pop();
    }

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
      <h2 className="text-center mb-4 text-3xl font-bold">Create Assessment</h2>



      <div className="mb-3">
        <label className="form-label">Assessment Title</label>
        <input
          type="text"
          placeholder="Enter assessment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-control"
        />
      </div>

      <h4>Questions</h4>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Question {questionIndex + 1}</label>
              <input
                type="text"
                placeholder="Enter question text"
                value={question.questionText}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, 'questionText', e.target.value)
                }
                className="form-control"
              />
            </div>

            <div>
              <h6>Options</h6>
              {question.options.map((option, optionIndex) => (
                <div className="input-group mb-2" key={optionIndex}>
                  <span className="input-group-text">{`Option ${optionIndex + 1}`}</span>
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(questionIndex, optionIndex, e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label className="form-label">Correct Answer</label>
              <input
                type="text"
                placeholder="Enter correct answer"
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)
                }
                className="form-control"
              />
            </div>

            <button className="btn btn-danger mt-3" onClick={() => removeQuestion(questionIndex)}>
              Remove Question
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={addQuestion}>
          Add Question
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Create Assessment
        </button>
      </div>
    </div>
  );
};

export default AddAssessmentComponent;
