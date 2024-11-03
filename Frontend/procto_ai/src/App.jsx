import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components for routing
import LoginForm from './components/loginForm';
import Navbar from './components/navbar';
import StudentDashboard from './components/Student/studentDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import AddAssessmentComponent from './components/Faculty/AddAssessmentComponent';
import ViewAssessmentsComponent from './components/Faculty/ViewAssessmentsComponent';
import StudentListComponent from './components/Faculty/StudentListComponent';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> {/* Wrap your components in Router */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm />} /> {/* Route for LoginForm */}
          <Route path="/student" element={<StudentDashboard />} /> {/* Route for Dashboard */}
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/create-assessment" element={<AddAssessmentComponent />} />
          <Route path="/view-assessments" element={<ViewAssessmentsComponent />} />
          <Route path="/student-list" element={<StudentListComponent />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
