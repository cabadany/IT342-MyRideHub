import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignupPage.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://it342-myridehub.onrender.com';

export default function SignupPage() {
  const navigate = useNavigate();
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
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long, include an uppercase, lowercase, number, and special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const fullContactNumber = formData.countryCode + formData.contactNumber;

    const submissionData = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      contactNumber: fullContactNumber,
      address: formData.address,
      password: formData.password
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Account created successfully!");
        localStorage.setItem("userEmail", result.email);
        localStorage.setItem("userName", result.fullName || result.username);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        const error = await response.text();
        toast.error(error || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-image">
        <img src="/car and motor.png" alt="Background" className="image-content" />
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
                <option value="+63">PH +63</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+61">AU +61</option>
                <option value="+91">IN +91</option>
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