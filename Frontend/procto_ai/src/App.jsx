import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Navbar from './components/navbar';
import StudentDashboard from './components/Student/StudentDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import AddAssessmentComponent from './components/Faculty/AddAssessmentComponent';
import ViewAssessmentsComponent from './components/Faculty/ViewAssessmentsComponent';
import StudentListComponent from './components/Faculty/StudentListComponent';
import ProfileComponent from './components/Faculty/ProfileComponent';
import AssessmentPage from './components/Student/AssessmentPage';
import TakeAssessmentComponent from './components/Student/TakeAssessmentComponent';
import './App.css';
import AssessmentHistoryComponent from './components/Student/AssessmentHistoryComponent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm />} /> 
          <Route path="/student" element={<StudentDashboard />} /> 
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/create-assessment" element={<AddAssessmentComponent />} />
          <Route path="/view-assessments" element={<ViewAssessmentsComponent />} />
          <Route path="/student-list" element={<StudentListComponent />} />
          <Route path="/profile" element={<ProfileComponent/>} />
          <Route path="/assessment/:assessmentId" element={<AssessmentPage />} />
          <Route path="/take-assessment" element={<TakeAssessmentComponent />} />
          <Route path="/assessment-history" element={<AssessmentHistoryComponent />} />
          




        </Routes>
      </div>
    </Router>
  );
}

export default App;
