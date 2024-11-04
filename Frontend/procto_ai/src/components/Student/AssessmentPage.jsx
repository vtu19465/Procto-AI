import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpeechDetection from '../SpeechDetection';
import VideoMonitoring from '../VideoMonitoring/VideoMonitoring'; // Import VideoMonitoring component

const AssessmentPage = () => {
  const { assessmentId } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState(null);
  const [assessmentStarted, setAssessmentStarted] = useState(false); // State to track if assessment has started
  const [isSpeechDetectionActive, setIsSpeechDetectionActive] = useState(false); // State to manage speech detection
  const navigate = useNavigate();

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/assessments/${assessmentId}`);
        setAssessment(response.data);
      } catch (error) {
        console.error('Error fetching assessment:', error);
      }
    };

    fetchAssessment();
  }, [assessmentId]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = JSON.parse(localStorage.getItem('creds'));
        const response = await axios.post('http://localhost:3000/api/users', {
          username: username.username,
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    const studentId = profile.id;
    const formattedAnswers = Object.keys(answers).map((index) => ({
      questionId: assessment.questions[index]._id,
      selectedAnswer: answers[index],
    }));

    try {
      const response = await axios.post(`http://localhost:3000/api/submissions`, { studentId, assessmentId, answers: formattedAnswers });
      alert(`Assessment submitted successfully! Your score: ${response.data.score}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment');
    }
    navigate('/student');
  };

  // Function to handle the start of the assessment
  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    setIsSpeechDetectionActive(true); // Activate speech detection when assessment starts
  };

  if (!assessment) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{assessment.title}</h2>
      <p className="text-gray-600 mb-8">Due Date: {new Date(assessment.dueDate).toLocaleDateString()}</p>

      {/* Render Start Assessment button if assessment has not started yet */}
      {!assessmentStarted ? (
        <button
          className="w-full md:w-auto btn btn-primary mt-8 px-6 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 transition"
          onClick={handleStartAssessment}
        >
          Start Assessment
        </button>
      ) : (
        <>
          {/* Render Speech Detection and Video Monitoring only after starting assessment */}
          {isSpeechDetectionActive && (
            <SpeechDetection 
              onWarning={(message) => alert(message)} 
              onAutoSubmit={() => {
                alert('Your assessment has been auto-submitted due to noise interference.');
                handleSubmit(); // Call handleSubmit for auto-submission
              }} 
            />
          )}
          <VideoMonitoring onAutoSubmit={handleSubmit} /> {/* Pass handleSubmit to VideoMonitoring */}

          <div className="space-y-6 mt-6">
            {assessment.questions.map((question, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h5 className="text-lg font-medium text-gray-800">{`Q${index + 1}. ${question.questionText}`}</h5>
                <div className="mt-2 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="form-check">
                      <input
                        className="form-check-input mr-2"
                        type="radio"
                        name={`question-${index}`}
                        id={`question-${index}-option-${optionIndex}`}
                        value={option}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      <label
                        className="form-check-label cursor-pointer text-gray-700"
                        htmlFor={`question-${index}-option-${optionIndex}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full md:w-auto btn btn-success mt-8 px-6 py-2 rounded font-semibold text-white bg-green-500 hover:bg-green-600 transition"
            onClick={handleSubmit}
          >
            Submit Assessment
          </button>
        </>
      )}
    </div>
  );
};

export default AssessmentPage;
