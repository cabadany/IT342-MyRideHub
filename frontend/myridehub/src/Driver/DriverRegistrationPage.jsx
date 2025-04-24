import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router
import './DriverRegistrationPage.css';

const DriverRegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log({ firstName, lastName, mobileNumber, city, termsAccepted });
    // Navigate to the login page after submitting the registration form
    navigate('/driver-login');
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>New Driver Registration</h2>
        <p>Tell us about yourself.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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

          <div className="input-group">
            <div className="mobile-number">
              <span>+63</span>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="terms-checkbox">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label>
              I acknowledge that I have read, understood, and agree to the
              <span> Terms and Conditions</span>, Privacy Policy, and any additional terms provided.
            </label>
          </div>

          <button type="submit" className="submit-btn">Create Account</button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/driver-login')}>Login here</span>
        </p>
      </div>

      <div className="registration-image">
        <img src="/car and motor.png" alt="Driver Registration" />
      </div>
    </div>
  );
};

export default DriverRegistrationPage;
