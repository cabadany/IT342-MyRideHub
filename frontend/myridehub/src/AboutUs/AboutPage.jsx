import React from 'react';
import './AboutUsPage.css';
import carImage from '../assets/jimny.png'; // Make sure this image exists
import bikeImage from '../assets/bike.png'; // Make sure this image exists

const AboutUsPage = () => {
  return (
    <div className="about-container">
      <div className="about-box">
        <div className="about-header">
          <h1>ABOUT US</h1>
        </div>
        <div className="about-text">
          <p>
            MyRideHub makes transportation effortless with flexibility, convenience, and reliability.
            Rent a car or motorcycle or book a ride instantly—all in one platform.
          </p>
          <p>
            With real-time tracking, you can monitor your vehicle or driver anytime for a secure,
            stress-free journey. Designed for simplicity, MyRideHub ensures a seamless experience—
            wherever you’re headed, we’ve got you covered.
          </p>
        </div>
        <div className="about-images">
          <img src={bikeImage} alt="Motorbike" className="bike-image" />
          <img src={carImage} alt="Car" className="car-image" />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
