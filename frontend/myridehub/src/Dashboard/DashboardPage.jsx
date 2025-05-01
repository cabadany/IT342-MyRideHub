import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './DashboardPage.css';
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const picture = localStorage.getItem('userPicture');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(name || decoded.name);
        setUserPicture(picture || decoded.picture); 
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) handleAutoLogout();
        else setTimeout(() => handleAutoLogout(), (decoded.exp - currentTime) * 1000);
      } catch {
        handleAutoLogout();
      }
    } else handleAutoLogout();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".main-nav");
      if (window.scrollY > 10) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAutoLogout = () => {
    localStorage.clear();
    toast.error("Session expired. Please log in again.");
    setTimeout(() => navigate("/login"), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="dashboard-page">
      <ToastContainer />

      {/* Logo */}
      <div className="logo-top-center">
        <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub" className="dashboard-logo" />
      </div>

      <nav className="main-nav">
        <div className="nav-wrapper">
          <ul className="nav-menu">
            <li><Link to="/dashboard">HOME</Link></li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">OUR SERVICES ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/booking">Book a Vehicle</Link></li>
                <li><Link to="/rent">Rent a Vehicle</Link></li>
                <li><Link to="/fare-calculator">Fare Calculator</Link></li>
                <li><Link to="/terms">Terms and Conditions</Link></li>
              </ul>
            </li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">HISTORY ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/rent-history">Rent History</Link></li>
                <li><Link to="/book-history">Book History</Link></li>
              </ul>
            </li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">JOIN US ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/be-a-driver">Be a Driver</Link></li>
              </ul>
            </li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">CONTACT US ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/passenger-appeal">Passenger Appeal Form</Link></li>
              </ul>
            </li>

            <li><Link to="/settings">SETTINGS</Link></li>

            <li>
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="divider-line"></div>

      <div className="hero-image-section">
        <img src="/for dashboard.png" alt="Hero" className="hero-img" />
        <div className="hero-overlay">
          <h1 className="hero-title">RIDE HUB</h1>
          <Link to="/booking" className="hero-btn">Book a Ride</Link>
          <Link to="/rent" className="hero-btn">Rent a Vehicle</Link>
        </div>
      </div>

      <section className="dashboard-articles">
        <div className="article">
          <img src="/article 1.png" alt="Wide Vehicle Options" />
          <div className="article-text">
            <h3>Wide Vehicle Options</h3>
            <p>
              Whether you're navigating the city or going on a road trip, we offer a variety of vehicles to meet your needs.
              Choose from compact scooters, reliable sedans, spacious SUVs, and more—all maintained to deliver comfort, safety, and performance.
            </p>
          </div>
        </div>
        <div className="article">
          <img src="/article 2.png" alt="24/7 Customer Support" />
          <div className="article-text">
            <h3>24/7 Customer Support</h3>
            <p>
              Day or night, our customer care agents are just a click or call away. We provide 24/7 assistance to help you with bookings, concerns on the road, or safety-related issues—because your peace of mind is our priority.
            </p>
          </div>
        </div>
        <div className="article">
          <img src="/article 3.png" alt="Budget-Friendly Rates" />
          <div className="article-text">
            <h3>Budget-Friendly Rates</h3>
            <p>
              Enjoy reliable transport options without breaking the bank. With our competitive and transparent pricing, you'll know exactly what you’re paying for. We offer flexible rates for both short and long trips.
            </p>
          </div>
        </div>
      </section>

      <div className="dashboard-footer">
        <div className="footer-links">
          <Link to="/fare-calculator">Fare Calculator</Link>
          <Link to="/passenger-appeal">Passenger Appeal Form</Link>
          <Link to="/terms">Terms and Conditions</Link>
        </div>
        <div className="footer-logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub" />
        </div>
      </div>

      <div className="dashboard-copyright">
        ©2025 by RIDE HUB Philippines. All Rights Reserved
      </div>
    </div>
  );
}