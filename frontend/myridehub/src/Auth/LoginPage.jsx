import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://it342-myridehub.onrender.com';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" }); // ✅ changed `identifier` to `email`
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginPayload = {
        email: formData.email,
        password: formData.password
      };

      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload)
      });

      const data = await response.json();

      if (response.ok) {
        const { token, id, email, fullName, username } = data;

        if (!token) {
          toast.error("Login failed: No token received.");
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('userId', id); // ✅ stores userId
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', fullName || username);

        toast.success("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);

    localStorage.setItem('token', credential);
    localStorage.setItem('userEmail', decoded.email);
    localStorage.setItem('userName', decoded.name);
    localStorage.setItem('userPicture', decoded.picture);

    toast.success(`Welcome ${decoded.name || decoded.email}!`);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    toast.error("Google login failed.");
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
          <p className="login-subtext">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
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
                <input type="checkbox" name="rememberMe" onChange={handleChange} />
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
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              size="large"
              shape="pill"
              theme="outline"
              text="signin_with"
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