import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();
  
  
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  
  
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);

  const toggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };

  const toggleHistoryDropdown = () => {
    setIsHistoryDropdownOpen(!isHistoryDropdownOpen);
  };

  
  const handleLearnMoreClick = () => {
    navigate('/testimonials'); 
  };

  const handleFeedbackSubmit = (feedback) => {
    setFeedbackList([...feedbackList, feedback]);
  };

  
  const handleFeedbackClick = () => {
    navigate('/feedback');  
  };


  const handleGoToBookingHistory = () => {
    navigate('/booking-history');
  };

  const handleGoToRentHistory = () => {
    navigate('/rent-history');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="">Home</Link></li>
          <li><Link to="">Book</Link></li>
          <li><Link to="">Rent</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="" className="nav-link">Settings</Link></li>
          <li><Link to="/contact-us">Contacts Us</Link></li>
          
        

          <li><a href="/login" className="contact-link">Log In</a></li>
          <li><a href="/signup" className="contact-link">Sign Up</a></li>
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
          <Link to=""><h2>BOOK A RIDE</h2></Link>
          <p>
            Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub
            has the perfect ride for you!
          </p>
        </div>
        <div className="service">
          <Link to=""><h2>RENT A VEHICLE</h2></Link>
          <p>
            Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub
            has the perfect ride for you!
          </p>
        </div>
      </section>

    
    </div>
  );
}
