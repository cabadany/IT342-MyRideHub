import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import './DashboardPage.css';
import Testimonials from './Testimonials';
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isLearnMoreVisible, setIsLearnMoreVisible] = useState(false);
  const [areServicesVisible, setAreServicesVisible] = useState(true);
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const picture = localStorage.getItem('userPicture');

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUserEmail(decoded.sub || decoded.email);
        setUserName(name || decoded.name);
        setUserPicture(picture || decoded.picture);

        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          handleAutoLogout();
        } else {
          const timeUntilExpiry = (decoded.exp - currentTime) * 1000;
          setTimeout(() => {
            handleAutoLogout();
          }, timeUntilExpiry);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        handleAutoLogout();
      }
    } else {
      handleAutoLogout();
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHistoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAutoLogout = () => {
    localStorage.clear();
    toast.error("⚡ Session expired. Please login again.");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const toggleFeedback = () => setIsFeedbackVisible(!isFeedbackVisible);
  const toggleLearnMore = () => {
    setIsLearnMoreVisible(!isLearnMoreVisible);
    setAreServicesVisible(!areServicesVisible);
  };
  const toggleHistoryDropdown = () => setIsHistoryDropdownOpen(!isHistoryDropdownOpen);

  return (
    <div className="dashboard-container">
      <ToastContainer />

      <nav className="navbar">
        <div className="logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" />
        </div>

        <div className="welcome-user" style={{ display: 'flex', alignItems: 'center' }}>
          {userPicture && (
            <img
              src={userPicture}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px"
              }}
            />
          )}
          {userName && <span>Hi, {userName}</span>}

          <button
            onClick={handleLogout}
            style={{
              marginLeft: "16px",
              padding: "8px 12px",
              backgroundColor: "#f44336",
              border: "none",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </div>

        <ul className="nav-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/booking">Book</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          <li><Link to="/about-us">About Us</Link></li>

          <li className="history-dropdown" onClick={toggleHistoryDropdown} ref={dropdownRef}>
            <span>History ▾</span>
            {isHistoryDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/rent-history">Rent History</Link></li>
                <li><Link to="/booking-history">Booking History</Link></li>
              </ul>
            )}
          </li>

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