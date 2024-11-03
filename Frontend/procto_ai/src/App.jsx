import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components for routing
import LoginForm from './components/loginForm';
import Navbar from './components/navbar';
import StudentDashboard from './components/Student/StudentDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
