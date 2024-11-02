import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in as:', { username, password, userType });

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
        userType,
      });

      if (response.status === 200) {
        alert('Login successful!');
        setUsername('');
        setPassword('');
        setUserType('student');
        navigate(`/${response.data.userType}`);
      }
    } catch (err) {
      setErrorMessage('Login failed. Please try again.');
      console.error(err);
      setUsername('');
      setPassword('');
      setUserType('student');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    console.log('Password reset request for:', emailForReset);

    try {
      const response = await axios.post('/api/forgot-password', { email: emailForReset });
      if (response.status === 200) {
        alert('Password reset link sent to your email.');
        setEmailForReset('');
        setShowForgotPassword(false);
      }
    } catch (err) {
      setErrorMessage('Password reset failed. Please try again.');
      console.error(err);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    console.log('Creating account for:', { newUsername, password, name, gmail, userType });
    // Implement account creation logic here
  };

  return (
    <div className="container mt-5">
      <style>{`
        .background {
          background-image: url(https://img.freepik.com/free-photo/red-pen-with-spiral-notepads-laptop-cactus-plant-pot-white-background_23-2148042101.jpg);
          background-size: cover;
          background-position: center;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .card {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .full-screen-overlay .card {
          width: 90%;
          max-width: 500px;
          height: auto;
          padding: 2rem;
          overflow-y: auto;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.9);
        }
        .error-message {
          color: #d9534f; /* Bootstrap danger color */
          background-color: rgba(255, 235, 238, 0.8); /* Light red background */
          border: 1px solid #f5c6cb; /* Light red border */
          border-radius: 5px;
          padding: 10px;
          margin: 10px 0;
          text-align: center;
          font-weight: bold;
        }
      `}</style>

      <div className="background">
        <div className="col-md-6">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>User Type</label>
                  <div className="btn-group btn-group-toggle d-flex justify-content-center">
                    {['student', 'faculty', 'admin'].map((type) => (
                      <label key={type} className={`btn btn-outline-primary flex-fill ${userType === type ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="userType"
                          value={type}
                          checked={userType === type}
                          onChange={() => setUserType(type)}
                        /> {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setShowCreateAccount(false);
                  }}
                >
                  Forgot Password?
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setShowCreateAccount(true);
                    setShowForgotPassword(false);
                  }}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="overlay">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Forgot Password</h2>
              <form onSubmit={handlePasswordReset}>
                <div className="form-group">
                  <label htmlFor="emailForReset">Email</label>
                  <input
                    type="email"
                    id="emailForReset"
                    className="form-control"
                    value={emailForReset}
                    onChange={(e) => setEmailForReset(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Send Reset Link
                </button>
              </form>
              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateAccount && (
        <div className="overlay">
          <div className="card full-screen-overlay">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create Account</h2>
              <form onSubmit={handleCreateAccount}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gmail">Email</label>
                  <input
                    type="email"
                    id="gmail"
                    className="form-control"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newUsername">Username</label>
                  <input
                    type="text"
                    id="newUsername"
                    className="form-control"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>User Type</label>
                  <div className="btn-group btn-group-toggle d-flex justify-content-center">
                    {['student', 'faculty', 'admin'].map((type) => (
                      <label key={type} className={`btn btn-outline-primary flex-fill ${userType === type ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="userType"
                          value={type}
                          checked={userType === type}
                          onChange={() => setUserType(type)}
                        /> {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn btn-success btn-block">
                  Create Account
                </button>
              </form>
              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => setShowCreateAccount(false)}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
