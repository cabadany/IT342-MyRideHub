// SignupPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SignupPage.css';

// ✅ Connect to backend using environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    contactNumber: "",
    countryCode: "+63",
    address: "",
    password: "",
    confirmPassword: "",
    agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      alert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const fullContactNumber = formData.countryCode + formData.contactNumber;
    const submissionData = {
      ...formData,
      contactNumber: fullContactNumber
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Account created successfully!");
      } else {
        const error = await response.text();
        console.error("Signup failed:", error);
        alert(error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img
          src="/car and motor.png"
          alt="Background"
          className="image-content"
        />
      </div>

      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Create Account</h2>
          <p className="signup-subtext">
            Sign up now to get started and experience the best ride-sharing service!
          </p>

          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username (optional)" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

            <div className="phone-group">
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="country-code-select">
                <option value="+63">PH +63 (Philippines)</option>
                <option value="+1">US +1 (USA)</option>
                <option value="+44">UK +44 (United Kingdom)</option>
                <option value="+61">AU +61 (Australia)</option>
                <option value="+91">IN +91 (India)</option>
              </select>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

            <div className="terms">
              <input type="checkbox" id="terms" name="agreed" checked={formData.agreed} onChange={handleChange} required />
              <label htmlFor="terms">I agree to the Terms and Conditions</label>
            </div>

            <button type="submit">Create Account</button>

            <div className="social-login">
              <p>Or sign up with:</p>
              <button type="button" className="social-btn google">Google</button>
              <button type="button" className="social-btn facebook">Facebook</button>
            </div>

            <p className="login-link">
              Already have an account? <Link to="/">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}