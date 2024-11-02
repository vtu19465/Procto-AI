// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import StudentDashboard from './studentdashboard'; // Make sure the case matches your file name
import AssessmentPage from './AssessmentPage';
import ResultPage from './Result_page';
import FacultyDashboard from './Faculty_dashboard'; // Import the Faculty Dashboard
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} /> {/* New route for Faculty Dashboard */}
        <Route path="/assessment/:assignmentId" element={<AssessmentPage />} />
        <Route path="/result/:resultId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
