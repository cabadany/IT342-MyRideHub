import React from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css'; // CSS natin

export default function ResetPassword() {
  return (
    <div className="reset-container">
      <img src="/Ride Hub Logo (White).png" alt="Logo" className="logo" /> {/* palitan mo path kung iba logo mo */}

      <h1 className="reset-title">Reset Password</h1>
      <p className="reset-subtitle">
        Provide the email address associated with your account to recover your password
      </p>

      <div className="reset-form-container">
        <form className="reset-form">
          <label className="reset-label">
            Email<span className="required">*</span>
          </label>
          <input type="email" className="reset-input" placeholder="Enter your email" />

          <button type="submit" className="reset-button">Reset Password</button>
        </form>

        <div className="reset-links">
          <Link to="/login" className="reset-link">Login</Link>
          <Link to="/signup" className="reset-link">Register</Link>
        </div>
      </div>
    </div>
  );
}
