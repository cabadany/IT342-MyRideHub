import React, { useState } from "react";
import './LoginPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with", formData);
    alert("Login submitted!");
  };

  return (
    <div className="login-container">
      {/* Right Side with Image */}
      <div className="login-image">
        <img
          src="/car and motor.png"
          alt="Background"
          className="image-content"
        />
      </div>

      {/* Left Side with Form */}
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
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit">Log In</button>

            <div className="social-login">
              <p>Or log in with:</p>
              <button type="button" className="social-btn google">Google</button>
              <button type="button" className="social-btn facebook">Facebook</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}