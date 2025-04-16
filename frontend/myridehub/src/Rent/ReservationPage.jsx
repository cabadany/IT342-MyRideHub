// ReservationPage.jsx
import React, { useState } from 'react';
import './ReservationPage.css';

const ReservationPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="reservation-container">
      <header className="reservation-header">
        <img src="/Ride Hub Logo (Dark).png" alt="Logo" style={{ height: '40px' }} />
        <nav>
          <ul className="nav-links">
            <li>Home</li>
            <li>Book</li>
            <li>Rent</li>
            <li>About Us</li>
            <li><button className="contact-button">Contact Us</button></li>
          </ul>
        </nav>
      </header>

      <main className="reservation-main">
        <div className="left-section">
          <div className="box">
            <h3>Booking Details</h3>
            <p>Pick-up Date & Time:</p>
            <p>Return Date & Time:</p>
            <p>Rental Duration:</p>
          </div>

          <div className="box">
            <h3>Driver Information</h3>
            <p>Driver’s Name</p>
            <p>Driver’s Contact Number</p>
            <p>Driver’s License ID</p>
            <p>Experience Level</p>
          </div>

          <div className="box">
            <h3>Vehicle Details</h3>
            <p>Car Model & Variant</p>
            <p>Plate Number</p>
            <p>Number of Passengers Allowed</p>
          </div>
        </div>

        <div className="center-section">
          <img src="/Fortuner.png" alt="Toyota Fortuner 2024" />
          <h2>Toyota Fortuner 2024</h2>
          <p><strong>★★★★☆</strong></p>
          <p>Rental Price: 5000/ Day</p>
        </div>

        <div className="right-section">
          <div className="box">
            <h3>Customer Details</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              /> I have read and agree to the Terms and Conditions.
            </label>
            <small>By using MyRideHub...</small>
          </div>

          <div className="summary-box">
            <p>Estimated total due at the counter</p>
            <h2>PHP 6,027.92</h2>
            <button className="reserve-button">RESERVE NOW</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationPage;