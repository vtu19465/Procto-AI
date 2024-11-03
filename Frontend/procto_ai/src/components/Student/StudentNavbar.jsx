// src/components/StudentNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentNavbar = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleProfile = () => navigate('/profile');
  const handleLogout = () => {
    localStorage.removeItem("creds");
    localStorage.removeItem("u_id");
    navigate('/');
    console.log("Logged out");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <button onClick={() => navigate('/')} className="text-white text-lg font-semibold">
            Student Dashboard
          </button>
        </div>
        <div className="space-x-4">
          <button onClick={handleProfile} className="text-white">Profile</button>
          <button onClick={handleLogout} className="text-white">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
