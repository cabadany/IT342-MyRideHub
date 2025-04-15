import React, { useState } from "react";
import './SignupPage.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullContactNumber = formData.countryCode + formData.contactNumber;
    const submissionData = { ...formData, contactNumber: fullContactNumber };

    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submissionData)
    });

    const result = await response.json();
    console.log(result);
    alert("Account created successfully!");
  };

  return (
    <div className="signup-container">
      {/* Right Side with Image */}
      <div className="signup-image">
        <img
          src="/car and motor.png"
          alt="Background"
          className="image-content"
        />
      </div>

      {/* Left Side with Form */}
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Create Account</h2>
          <p className="signup-subtext">
            Sign up now to get started and experience the best ride-sharing service!
          </p>

          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

            <div className="phone-group">
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="country-code-select">
                <option value="+63">PH +63 (Philippines)</option>
                <option value="+1">US +1 (USA)</option>
                <option value="+44">CB +44 (UK)</option>
                <option value="+61">AU +61 (Australia)</option>
                <option value="+91">IN +91 (India)</option>
              </select>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Re-Enter Password" value={formData.confirmPassword} onChange={handleChange} />

            <div className="terms">
              <input type="checkbox" id="terms" name="agreed" checked={formData.agreed} onChange={handleChange} />
              <label htmlFor="terms">I agree to the the Terms and Conditions</label>
            </div>

            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}