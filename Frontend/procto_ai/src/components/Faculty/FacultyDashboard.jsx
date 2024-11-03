import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddAssessmentIcon from '../../assets/add-assessment.svg';
import ViewAssessmentIcon from '../../assets/view-assessment.svg';
import StudentListIcon from '../../assets/student-list.svg';

function FacultyDashboard() {
  const navigate = useNavigate();

  // Navigation handlers
  const handleCreateAssessment = () => navigate('/create-assessment');
  const handleViewAssessments = () => navigate('/view-assessments');
  const handleStudentList = () => navigate('/student-list');
  const handleProfile = () => navigate('/profile');
  const handleHome = () => navigate('/');
  const handleLogout = () => {
    localStorage.removeItem("creds");
    navigate('/');
    console.log("Logged out");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <button onClick={handleHome} className="text-white text-lg font-semibold">
              Faculty Dashboard
            </button>
          </div>
          <div className="space-x-4">
            <button onClick={handleProfile} className="text-white">Profile</button>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </div>
        </div>
      </nav>

      {/* Dashboard Cards */}
      <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Create Assessment */}
        <div
          onClick={handleCreateAssessment}
          className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition duration-300 hover:bg-blue-50 hover:shadow-2xl hover:scale-105"
        >
          <img src={AddAssessmentIcon} alt="Create Assessment" className="mx-auto mb-4 h-16 w-16" />
          <h3 className="text-xl font-semibold text-gray-700">Create Assessment</h3>
          <p className="mt-2 text-gray-500">Set up new assessments for students.</p>
        </div>

        {/* View Assessments */}
        <div
          onClick={handleViewAssessments}
          className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition duration-300 hover:bg-blue-50 hover:shadow-2xl hover:scale-105"
        >
          <img src={ViewAssessmentIcon} alt="View Assessments" className="mx-auto mb-4 h-16 w-16" />
          <h3 className="text-xl font-semibold text-gray-700">View Assessments</h3>
          <p className="mt-2 text-gray-500">Check existing assessments and results.</p>
        </div>

        {/* Student List */}
        <div
          onClick={handleStudentList}
          className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition duration-300 hover:bg-blue-50 hover:shadow-2xl hover:scale-105"
        >
          <img src={StudentListIcon} alt="Student List" className="mx-auto mb-4 h-16 w-16" />
          <h3 className="text-xl font-semibold text-gray-700">Student List</h3>
          <p className="mt-2 text-gray-500">Manage students and view their performance.</p>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
