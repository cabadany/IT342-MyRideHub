import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "Philippines",
    phone: "",
    reason: "",
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must acknowledge the Code of Conduct to submit.");
      return;
    }

    alert("Appeal submitted successfully!");
    setFormData({
      name: "",
      country: "Philippines",
      phone: "",
      reason: "",
      agree: false
    });
  };

  return (
    <div className="contact-page">
      <div className="logo-top-center">
        <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub" className="dashboard-logo" />
      </div>

      <nav className="main-nav">
        <div className="nav-wrapper">
          <ul className="nav-menu">
            <li><a href="/dashboard">HOME</a></li>
            <li className="dropdown">
              <span>OUR SERVICES ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/booking">Book a Vehicle</a></li>
                <li><a href="/rent">Rent a Vehicle</a></li>
                <li><a href="/fare-calculator">Fare Calculator</a></li>
                <li><a href="/terms">Terms and Conditions</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <span>JOIN US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/be-a-driver">Be a Driver</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <span>CONTACT US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/passenger-appeal">Passenger Appeal Form</a></li>
              </ul>
            </li>
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </nav>

      <div className="appeal-form-container">
        <div className="appeal-form">
          <h1>Passenger Appeal Form</h1>
          <p>
            We review our bookings on a regular basis to ensure a good experience for both our drivers and passengers.
            Our review shows that you may not have used our app in accordance with Ride Hub’s Terms of Service and hence
            we have deactivated your access.
          </p>
          <p>
            Appeal forms submitted will be evaluated based on the merits of the information provided and we will only respond
            to applicants with a strong case for appeal. Our decision is final and no further correspondence will be entertained.
          </p>
          <p className="note">
            *Please note that we reserve the right to pursue legal action if you submit an appeal application and,
            upon further investigation, we collect further evidence of fraudulent activity.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
              Country Registered
              <input type="text" name="country" value={formData.country} disabled />
            </label>

            <label>
              Country Code
              <input type="text" value="Philippines (+63)" disabled />
            </label>

            <label>
              Phone Number
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>

            <label>
              Reason
              <select name="reason" value={formData.reason} onChange={handleChange} required>
                <option value="">-- Select a reason --</option>
                <option>I may have cancelled too many bookings</option>
                <option>I have more than one passenger account</option>
                <option>I may have outstanding payment for previous ride</option>
                <option>I am not sure why I am being suspended</option>
                <option>Others</option>
              </select>
            </label>

            <label className="checkbox-label">
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
              I hereby acknowledge that I have read, understood, and agree to comply with the Code of Conduct.
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;