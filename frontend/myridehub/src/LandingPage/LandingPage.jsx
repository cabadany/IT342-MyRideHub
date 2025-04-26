import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css'; // Make sure to change the name of your CSS file as well
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();
  
  // State for controlling feedback dropdown visibility
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  
  // State for controlling history dropdown visibility
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);

  const toggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };

  const toggleHistoryDropdown = () => {
    setIsHistoryDropdownOpen(!isHistoryDropdownOpen);
  };

  // Function to handle "Learn More" button click to navigate to Testimonials
  const handleLearnMoreClick = () => {
    navigate('/testimonials'); // Navigate to testimonials page
  };

  const handleFeedbackSubmit = (feedback) => {
    setFeedbackList([...feedbackList, feedback]);
  };

  // Function to handle feedback button click and navigate to Feedback Form page
  const handleFeedbackClick = () => {
    navigate('/feedback');  // Navigate to the Feedback Form page
  };

  // Navigation for history
  const handleGoToBookingHistory = () => {
    navigate('/booking-history');
  };

  const handleGoToRentHistory = () => {
    navigate('/rent-history');
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/booking">Book</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/settings" className="nav-link">Settings</Link></li>

          {/* Login and Sign Up buttons */}
          <li><Link to="/login" className="login-link">Login</Link></li>
          <li><Link to="/signup" className="signup-link">Sign Up</Link></li>
        </ul>
      </nav>
      
      <section className="hero">
        <div className="hero-text">
          <h1>ENJOY YOUR RIDE HUB!</h1>
          <p>
            Ride Hub is a modern and convenient platform designed for both drivers and passengers.
            Whether you need a rental car for a trip or a quick ride around the city, Ride Hub connects
            you to reliable drivers and rental services with ease.
          </p>
          <button className="learn-more-btn" onClick={handleLearnMoreClick}>Learn More</button>
        </div>
      </section>

      <section className="services">
        <div className="service">
          <Link to="/booking"><h2>BOOK A RIDE</h2></Link>
          <p>
            Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub
            has the perfect ride for you!
          </p>
        </div>
        <div className="service">
          <Link to="/rent"><h2>RENT A VEHICLE</h2></Link>
          <p>
            Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub
            has the perfect ride for you!
          </p>
        </div>

      </section>
    </div>
  );
}
