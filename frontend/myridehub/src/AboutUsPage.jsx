import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/booking">Book</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          <li><Link to="/about-us" className="active">About Us</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><a href="/contact-us" className="contact-link">Contact Us</a></li>
        </ul>
      </nav>

      {/* About Us Content Section */}
      <section className="about-us-content">
        <h1>ABOUT US</h1>
        <p>
          MyRideHub makes transportation effortless with flexibility, convenience, and reliability. Rent a car or motorcycle or book a ride instantly—all in one platform.
        </p>
        <p>
          With real-time tracking, you can monitor your vehicle or driver anytime for a secure, stress-free journey. Designed for simplicity, MyRideHub ensures a seamless experience—wherever you’re headed, we’ve got you covered.
        </p>
      </section>

      {/* Car Image Section */}
      <div className="car-image">
        <img src="/jimny.png" alt="Suzuki Jimny" />
      </div>
    </div>
  );
};

export default AboutUsPage;
