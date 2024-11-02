// src/FacultyDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Math Assignment', dueDate: '2024-11-10' },
    { id: 2, title: 'Science Project', dueDate: '2024-11-15' },
  ]);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDate, setNewAssignmentDate] = useState('');
  const navigate = useNavigate();

  const handleAddAssignment = () => {
    if (newAssignmentTitle && newAssignmentDate) {
      setAssignments([...assignments, { id: assignments.length + 1, title: newAssignmentTitle, dueDate: newAssignmentDate }]);
      setNewAssignmentTitle('');
      setNewAssignmentDate('');
    }
  };

  const handleViewPerformance = (assignmentId) => {
    navigate(`/performance/${assignmentId}`); // Navigate to performance page
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Faculty Dashboard</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Create New Assignment</h5>
          <input
            type="text"
            placeholder="Assignment Title"
            value={newAssignmentTitle}
            onChange={(e) => setNewAssignmentTitle(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="date"
            value={newAssignmentDate}
            onChange={(e) => setNewAssignmentDate(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={handleAddAssignment}>Add Assignment</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Existing Assignments</h5>
          <ul className="list-group">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="list-group-item d-flex justify-content-between align-items-center">
                {assignment.title} - Due: {assignment.dueDate}
                <button className="btn btn-secondary" onClick={() => handleViewPerformance(assignment.id)}>View Performance</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
