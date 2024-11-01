import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in as:', { username, password, userType });

    try {
      const response = await axios.post('/api/login', { username, password, userType });

      if (response.status === 200) {
        alert('Login successful!');
        // Reset form fields
        setUsername('');
        setPassword('');
        setUserType('student');
      }
    } catch (err) {
      setErrorMessage('Login failed. Please try again.');
      console.error(err);
      // Reset the form even on failure
      setUsername('');
      setPassword('');
      setUserType('student');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    console.log('Creating account for:', { newUsername, password, name, gmail, userType });
    // Implement account creation logic here
  };

  // Styles for the error message
  const errorMessageStyle = {
    color: 'red',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    textAlign: 'center',
  };

  return (
    <div className="container mt-5">
      {/* Internal CSS for background image and styles */}
      <style>
        {`
          .background {
            background-image: url(https://img.freepik.com/free-photo/red-pen-with-spiral-notepads-laptop-cactus-plant-pot-white-background_23-2148042101.jpg); /* Replace with your image URL */
            background-size: cover;
            background-position: center;
            height: 100vh; /* Full height */
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .card {
            background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white for card */
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
      <div className="background">
        <div className="col-md-6">
          {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
          {showCreateAccount ? (
            <div className="card">
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
                    <label htmlFor="gmail">Gmail</label>
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
          ) : (
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
                    onClick={() => setShowCreateAccount(true)}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
