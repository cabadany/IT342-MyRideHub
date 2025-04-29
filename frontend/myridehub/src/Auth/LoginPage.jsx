// LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; 
import { jwtDecode } from "jwt-decode"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginPayload = {
        email: formData.identifier,
        password: formData.password
      };

      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginPayload)
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.jwt;

        localStorage.setItem('token', jwtToken);

        toast.success('Login successful!');
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage || 'Login failed.');
      }

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);

    console.log("Google Decoded:", decoded);

    localStorage.setItem('token', credential);
    localStorage.setItem('userName', decoded.name);
    localStorage.setItem('userPicture', decoded.picture);

    toast.success(`Welcome ${decoded.name || decoded.email}!`);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="login-container">
      <ToastContainer />
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
              placeholder="Email Address"
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

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="social-login">
            <p>Or log in with:</p>

            {/* Google Login Button */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              width="100%"
              theme="outline"
              size="large"
            />
          </div>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}