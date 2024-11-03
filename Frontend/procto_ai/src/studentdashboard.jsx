// src/StudentDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [assignments] = useState([
    { id: 1, title: 'Math Assignment', dueDate: '2024-11-10', status: 'submitted' },
    { id: 2, title: 'Science Project', dueDate: '2024-11-15', status: 'in-progress' },
    { id: 3, title: 'History Essay', dueDate: '2024-11-20', status: 'not submitted' },
  ]);

  const [previousResults] = useState([
    { id: 1, title: 'Math Assignment', score: 85, date: '2024-11-01', description: 'Detailed explanation of Math Assignment...' },
    { id: 2, title: 'Science Project', score: 90, date: '2024-10-28', description: 'Detailed explanation of Science Project...' },
  ]);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profile, setProfile] = useState({ name: 'Student Name', email: 'student@example.com' });
  const navigate = useNavigate();

  const handleAssignmentClick = (assignmentId) => {
    navigate(`/assessment/${assignmentId}`); // Navigate to assessment page
  };

  const handleResultClick = (resultId) => {
    navigate(`/result/${resultId}`); // Navigate to result page for detailed view
  };

  const handleEditProfile = () => {
    setShowEditProfile(true); // Show the edit profile modal
  };

  const handleSaveProfile = () => {
    setShowEditProfile(false); // Hide the modal after saving
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Dashboard</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          {/* Profile Overview */}
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Profile Overview</h5>
              <img src="https://via.placeholder.com/150" alt="Profile" className="img-fluid rounded-circle mb-3" />
              <h6>{profile.name}</h6>
              <p>Email: {profile.email}</p>
              <button className="btn btn-primary" onClick={handleEditProfile}>Edit Profile</button>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {showEditProfile && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Profile</h5>
                    <button type="button" className="btn-close" onClick={() => setShowEditProfile(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" value={profile.name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={profile.email} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditProfile(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <ul className="list-group">
                <li className="list-group-item">New assignment posted: Math Assignment</li>
                <li className="list-group-item">You received feedback on your Science Project</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assignments */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Assignments</h5>
              <ul className="list-group">
                {assignments.map((assignment) => (
                  <li key={assignment.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      {assignment.title} - Due: {assignment.dueDate} - Status: {assignment.status}
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => handleAssignmentClick(assignment.id)}>
                      Take Assessment
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Previous Assessment Results */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Previous Assessment Results</h5>
              <ul className="list-group">
                {previousResults.map((result) => (
                  <li
                    key={result.id}
                    className="list-group-item"
                    onClick={() => handleResultClick(result.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {result.title} - Score: {result.score} - Date: {result.date}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
