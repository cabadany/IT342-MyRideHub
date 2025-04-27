import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './DashboardPage.css';
import Testimonials from './Testimonials'; // Import Testimonials component
 
export default function DashboardPage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();
 
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isLearnMoreVisible, setIsLearnMoreVisible] = useState(false);
  const [areServicesVisible, setAreServicesVisible] = useState(true);
 
  const toggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };
 
  const toggleLearnMore = () => {
    setIsLearnMoreVisible(!isLearnMoreVisible);
    setAreServicesVisible(!areServicesVisible);
  };
 
  const handleFeedbackSubmit = (feedback) => {
    setFeedbackList([...feedbackList, feedback]);
  };
 
  const handleFeedbackClick = () => {
    toggleFeedback();
  };
 
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/booking">Book</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><button className="contact-btn">Contact Us</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
    <h1>ENJOY YOUR RIDE HUB!</h1>

        <div className="hero-description">
          <p>
            Ride Hub is a modern and convenient platform designed for both drivers and passengers.
            Whether you need a rental car for a trip or a quick ride around the city, Ride Hub connects
            you to reliable drivers and rental services with ease.
          </p>
        </div>

        <button className="learn-more-btn" onClick={toggleLearnMore}>
          Learn More
        </button>

        {/* Dropdown Section */}
        {isLearnMoreVisible && (
          <>
            <div className="learn-more-cards">
              <div className="learn-more-card">
                <img src="/parkinglot.jpg" alt="Wide Vehicle Options" />
                <h3>Wide Vehicle Options</h3>
                <p>Choose from motorcycles, cars, and more!</p>
              </div>
              <div className="learn-more-card">
                <img src="/customersupport.jpg" alt="24/7 Customer Support" />
                <h3>24/7 Customer Support</h3>
                <p>Our support team is available anytime, anywhere.</p>
              </div>
              <div className="learn-more-card">
                <img src="/affordable-rates.png" alt="Affordable Rates" />
                <h3>Affordable Rates</h3>
                <p>Great quality rides at affordable prices.</p>
              </div>
            </div>

            {/* Testimonials after Learn More cards */}
            <Testimonials />
          </>
        )}
      </section>

      {/* Services Section */}
      {areServicesVisible && (
        <section className="services">
          <div className="service">
            <Link to="/booking"><h2>BOOK A RIDE</h2></Link>
            <p>Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub has the perfect ride for you!</p>
          </div>
          <div className="service">
            <Link to="/rent"><h2>RENT A VEHICLE</h2></Link>
            <p>Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub has the perfect ride for you!</p>
          </div>
        </section>
      )}
    </div>
  );
}
