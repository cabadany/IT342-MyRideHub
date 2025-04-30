import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import './DashboardPage.css';
import Testimonials from './Testimonials';
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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
        if (decoded.exp && decoded.exp < currentTime) {
          handleAutoLogout();
        } else {
          const timeUntilExpiry = (decoded.exp - currentTime) * 1000;
          setTimeout(() => handleAutoLogout(), timeUntilExpiry);
        }
      } catch (error) {
        handleAutoLogout();
      }
    } else {
      handleAutoLogout();
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsHistoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAutoLogout = () => {
    localStorage.clear();
    toast.error("Session expired. Please login again.");
    setTimeout(() => navigate("/login"), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />

      <header className="main-header">
        <div className="container header-flex">
          <Link to="/dashboard" className="logo">
            <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" />
          </Link>

          <nav className="main-nav">
            <ul className="nav-links">
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/booking">Book</Link></li>
              <li><Link to="/rent">Rent</Link></li>
              <li><Link to="/about-us">About</Link></li>
              <li className="history-dropdown" ref={dropdownRef} onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)}>
                History ▾
                {isHistoryDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/rent-history">Rent History</Link></li>
                    <li><Link to="/booking-history">Booking History</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/contact-us" className="btn-primary">Contact</Link></li>
            </ul>
          </nav>

          <div className="profile-info">
            {userPicture && <img src={userPicture} alt="Profile" className="profile-pic" />}
            <span>{userName}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <h1>Modern Transportation at Your Fingertips</h1>
          <p>Book or rent vehicles anytime, anywhere. Choose Ride Hub for convenience, comfort, and safety.</p>
          <div className="cta-buttons">
            <Link to="/booking" className="btn-primary">Book a Ride</Link>
            <Link to="/rent" className="btn-secondary">Rent a Vehicle</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <img src="/parkinglot.jpg" alt="Vehicles" />
              <h3>Wide Selection</h3>
              <p>Choose motorcycles, sedans, or SUVs for any occasion.</p>
            </div>
            <div className="feature-card">
              <img src="/customersupport.jpg" alt="Support" />
              <h3>24/7 Support</h3>
              <p>We’re always here for you, any time you need assistance.</p>
            </div>
            <div className="feature-card">
              <img src="/affordable-rates.png" alt="Affordable" />
              <h3>Affordable Rates</h3>
              <p>Competitive pricing without compromising quality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <ol>
            <li><strong>Sign Up:</strong> Create your free account.</li>
            <li><strong>Browse:</strong> View available vehicles by type or location.</li>
            <li><strong>Book:</strong> Choose your ride and confirm the details.</li>
            <li><strong>Ride:</strong> Enjoy your trip and track everything online.</li>
          </ol>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Users Say</h2>
          <Testimonials />
        </div>
      </section>

      <footer className="main-footer">
        <div className="container footer-content">
          <div>
            <img src="/Ride Hub Logo (White).png" alt="Ride Hub" className="footer-logo" />
            <p>Connecting riders and vehicles — anytime, anywhere.</p>
          </div>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/booking">Book</Link></li>
            <li><Link to="/rent">Rent</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
          <div className="footer-contact">
            <p>Email: myridehub.team@gmail.com</p>
            <p>Phone: 0912-345-6789</p>
          </div>
        </div>
      </footer>
    </div>
  );
}