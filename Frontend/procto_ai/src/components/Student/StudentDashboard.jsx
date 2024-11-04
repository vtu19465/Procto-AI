// src/components/StudentDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';
import TakeAssessmentIcon from '../../assets/take-assessment.svg';
import AssessmentHistoryIcon from '../../assets/assessment-history.svg';
import DiscussionForumIcon from '../../assets/discussion.svg';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const handleTakeAssessment = () => navigate('/take-assessment');
  const handleAssessmentHistory = () => navigate('/assessment-history');
  const handleDiscussionForum = () => navigate('/discussion-forum');


  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />
      <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          onClick={handleTakeAssessment}
          className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <img src={TakeAssessmentIcon} alt="Take Assessment" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Take Assessment</h3>
          <p className="mt-2 text-gray-500">Start a new assessment.</p>
        </div>
        <div
          onClick={handleAssessmentHistory}
          className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <img src={AssessmentHistoryIcon} alt="Assessment History" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Assessment History</h3>
          <p className="mt-2 text-gray-500">View completed assessments and scores.</p>
        </div>
        <div
          onClick={handleDiscussionForum}
          className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <img src={DiscussionForumIcon} alt="Discussion Forum" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Discussion Forum</h3>
          <p className="mt-2 text-gray-500">Participate in discussions with peers.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
