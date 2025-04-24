import React, { useState } from 'react';
import './DriverLoginPage.css';

const DriverLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/car and motor.png" alt="Login" />
      </div>

      <div className="login-form">
        <h2>Login to MyRideHub</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username/Mobile Number"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">LOG IN</button>
        </form>

        <p className="signup-link">
          <a href="/driver-registration">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default DriverLoginPage;
