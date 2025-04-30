import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import './DashboardPage.css';
import Testimonials from './Testimonials';
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("");
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
        setUserEmail(decoded.sub || decoded.email);
        setUserName(name || decoded.name);
        setUserPicture(picture || decoded.picture);

        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          handleAutoLogout();
        } else {
          const timeUntilExpiry = (decoded.exp - currentTime) * 1000;
          setTimeout(() => handleAutoLogout(), timeUntilExpiry);
        }
      } catch {
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
    toast.error("Session expired. Please log in again.");
    setTimeout(() => navigate("/login"), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <>
      <ToastContainer />
      <header className="main-header">
        <div className="container header-flex">
          <div className="logo">
            <Link to="/dashboard"><img src="/Ride Hub Logo (White).png" alt="Ride Hub" /></Link>
          </div>

          <nav className="main-nav">
            <ul className="nav-links">
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/booking">Book</Link></li>
              <li><Link to="/rent">Rent</Link></li>
              <li><Link to="/about-us">About</Link></li>
              <li className="history-dropdown" onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)} ref={dropdownRef}>
                <span>History ▾</span>
                {isHistoryDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/rent-history">Rent History</Link></li>
                    <li><Link to="/booking-history">Booking History</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/contact-us">Contact</Link></li>
            </ul>
          </nav>

          <div className="profile-info">
            {userPicture && <img src={userPicture} alt="Profile" className="profile-pic" />}
            {userName && <span>Hi, {userName}</span>}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <h1>ENJOY YOUR RIDE HUB!</h1>
          <p>Your go-to ride and vehicle rental service, made easy, fast, and reliable.</p>
          <div className="cta-buttons">
            <Link className="btn-primary" to="/booking">Book a Ride</Link>
            <Link className="btn-secondary" to="/rent">Rent a Vehicle</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <img src="/parkinglot.jpg" alt="Wide Options" />
              <h3>Wide Vehicle Options</h3>
              <p>From motorcycles to cars, we've got the right ride for every trip.</p>
            </div>
            <div className="feature-card">
              <img src="/customersupport.jpg" alt="Support" />
              <h3>24/7 Customer Support</h3>
              <p>Questions? Our team is always ready to assist you anytime.</p>
            </div>
            <div className="feature-card">
              <img src="/affordable-rates.png" alt="Affordable" />
              <h3>Affordable Rates</h3>
              <p>Great rides at fair prices. No hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <ol>
            <li>Sign up or log in to your Ride Hub account.</li>
            <li>Choose whether to book a ride or rent a vehicle.</li>
            <li>Select your pickup and drop-off locations or vehicle type.</li>
            <li>Confirm your booking and enjoy the ride!</li>
          </ol>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <Testimonials />
        </div>
      </section>

      <footer className="main-footer">
        <div className="container footer-content">
          <div>
            <img className="footer-logo" src="/Ride Hub Logo (White).png" alt="Ride Hub" />
            <p>&copy; 2025 MyRideHub. All rights reserved.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/booking">Book</Link></li>
              <li><Link to="/rent">Rent</Link></li>
              <li><Link to="/about-us">About</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: myridehub.team@gmail.com</p>
            <p>Phone: 0912-345-6789</p>
            <p>Address: Natalio B. Bacalso Ave., Cebu</p>
          </div>
        </div>
      </footer>
    </>
  );
}