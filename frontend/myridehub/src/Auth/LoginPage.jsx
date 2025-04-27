import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic login simulation
    alert("Login submitted!");
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/car and motor.png" alt="Background" className="image-content" />
      </div>

      <div className="login-form-container">
        <div className="login-form">
          <h2>Log In</h2>
          <p className="login-subtext">Welcome back! Please enter your details to continue.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="identifier"
              placeholder="Email Address or Username"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

<div className="form-options">
  <label className="remember-me">
    <input
      type="checkbox"
      name="rememberMe"
      onChange={handleChange}
    />
    Remember Me
  </label>
  <Link to="/reset-password" className="forgot-password">Forgot Password?</Link>
</div>

            <button type="submit">Log In</button>

            <div className="social-login">
              <p>Or log in with:</p>
              <button type="button" className="social-btn google">Google</button>
              <button type="button" className="social-btn facebook">Facebook</button>
            </div>

            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}