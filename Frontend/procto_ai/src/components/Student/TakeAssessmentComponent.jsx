// src/components/StudentDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentNavbar from './StudentNavbar'; // Import the new navbar component

const TakeAssessmentComponent = () => {
  const [assessments, setAssessments] = useState([]);
  const [profile, setProfile] = useState({ name: 'Student Name', email: 'student@example.com' }); // Mock profile data
  const navigate = useNavigate();

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

  const handleTakeAssessment = (assessmentId) => {
    console.log(assessmentId);
    navigate(`/assessment/${assessmentId}`);
  };

  return (
    <div>
      <StudentNavbar profile={profile} />
      {console.log(assessments)}
      <div className="container mt-5">
        <h2>Take Assessment</h2>
        <ul className="list-group mt-3">
          {assessments.map((assessment) => (
            <li key={assessment._id} className="list-group-item d-flex justify-content-between align-items-center">
              {assessment.title} - Due: {new Date(assessment.dueDate).toLocaleDateString()}
              <button className="btn btn-primary" onClick={() => handleTakeAssessment(assessment._id)}>
                Start Assessment
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TakeAssessmentComponent;
