import React from "react";
import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/booking">Book</a></li>
          <li><a href="/rent">Rent</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><button className="contact-btn">Contact Us</button></li>
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
          <button className="learn-more-btn">Learn More</button>
        </div>
      </section>

      <section className="services">
        <div className="service">
          <h2>BOOK A RIDE</h2>
          <p>
            Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub
            has the perfect ride for you!
          </p>
        </div>
        <div className="service">
          <h2>RENT A VEHICLE</h2>
          <p>
            Rent a motorcycle for agility and adventure or a car for comfort and convenience—MyRideHub
            has the perfect ride for you!
          </p>
        </div>
      </section>
    </div>
  );
}