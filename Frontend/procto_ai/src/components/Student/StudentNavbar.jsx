// src/components/StudentNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentNavbar = ({ profile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic (e.g., clearing tokens or session storage)
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Student Dashboard</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {profile.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Profile</a>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
