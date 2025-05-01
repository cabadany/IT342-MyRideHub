import React, { useState } from "react";
import "./FareCalculatorPage.css";
import { Link } from "react-router-dom";

const FareCalculatorPage = () => {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fare, setFare] = useState(null);

  const BASE_FARE = 40;
  const PER_KM_RATE = 8;
  const PER_MIN_RATE = 1;

  const calculateFare = (e) => {
    e.preventDefault();
    const total = BASE_FARE + distance * PER_KM_RATE + duration * PER_MIN_RATE;
    setFare(Math.round(total));
  };

  return (
    <div className="dashboard-page">
      <div className="logo-top-center">
        <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub Logo" className="dashboard-logo" />
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
                <li><Link to="/terms">Terms & Conditions</Link></li>
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
                <li><Link to="/contact-us">Passenger Appeal Form</Link></li>
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

      <main className="fare-calc-wrapper">
        <h1>Fare Calculator</h1>
        <form onSubmit={calculateFare} className="fare-form">
          <label>
            Distance (km):
            <input
              type="number"
              min="0"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              required
              className="black-input"
            />
          </label>
          <label>
            Duration (minutes):
            <input
              type="number"
              min="0"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              required
              className="black-input"
            />
          </label>
          <button type="submit">Calculate Fare</button>
        </form>

        {fare !== null && (
          <div className="fare-result">
            <h2>Estimated Fare: ₱{fare}</h2>
          </div>
        )}
      </main>

      <div className="dashboard-footer">
        <div className="footer-links">
          <Link to="/fare-calculator">Fare Calculator</Link>
          <Link to="/contact-us">Passenger Appeal Form</Link>
          <Link to="/terms">Terms & Conditions</Link>
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
};

export default FareCalculatorPage;