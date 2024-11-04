
import React from 'react';
import UserManagement from './UserManagement';
import AssessmentList from './AssessmentList';
import Analytics from './Analytics';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="analytics-section mb-8">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <Analytics />
      </div>
      <div className="assessment-management-section mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Assessments</h2>
        <AssessmentList />
      </div>
      <div className="user-management-section mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        <UserManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;
