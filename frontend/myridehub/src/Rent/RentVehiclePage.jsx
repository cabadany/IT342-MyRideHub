import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RentVehiclePage.css';

const RentVehiclePage = () => {
  const [category, setCategory] = useState("4wheels");
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/vehicles")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Failed to fetch vehicles:", err));
  }, []);

  const filteredVehicles = vehicles.filter((v) =>
    category === "4wheels"
      ? v.category.toLowerCase() === "4 wheels"
      : v.category.toLowerCase() === "2 wheels"
  );

  const handleDetailsClick = (vehicle) => {
    navigate("/rent/car-detail", { state: { vehicle } });
  };

  const handleRentNowClick = (vehicle) => {
    navigate("/rent/rent-now", { state: { vehicle } });
  };

  return (
    <div className="rent-vehicle-page">
      <div className="logo-top-center">
        <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub" className="dashboard-logo" />
      </div>

      <nav className="main-nav">
        <div className="nav-wrapper">
          <ul className="nav-menu">
            <li><a href="/dashboard">HOME</a></li>
            <li className="dropdown">
              <span>OUR SERVICES ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/booking">Book a Vehicle</a></li>
                <li><a href="/rent">Rent a Vehicle</a></li>
                <li><a href="/fare-calculator">Fare Calculator</a></li>
                <li><a href="/terms">Terms and Conditions</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <span>JOIN US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/be-a-driver">Be a Driver</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <span>CONTACT US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/passenger-appeal">Passenger Appeal Form</a></li>
              </ul>
            </li>
            <li>
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Full-width divider line */}
      <div className="divider-line"></div>

      <div className="rent-title">
        <h1>RENT A VEHICLE</h1>
      </div>

      <div className="category-buttons">
        <button className={category === "4wheels" ? "active" : ""} onClick={() => setCategory("4wheels")}>
          4 Wheels
        </button>
        <button className={category === "2wheels" ? "active" : ""} onClick={() => setCategory("2wheels")}>
          2 Wheels
        </button>
      </div>

      <div className="vehicle-grid">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((v, idx) => (
            <div className="vehicle-card" key={idx}>
              <img src={v.imageUrl} alt={v.model} className="vehicle-image" />
              <div className="vehicle-info">
                <h2>{v.brand} {v.model}</h2>
                <p className="price">₱ {v.pricePerDay} <span>/ Day</span></p>
                <p><strong>Type:</strong> {v.type} | <strong>Seats:</strong> {v.seats} | <strong>Engine:</strong> {v.engine}</p>
                <div className="vehicle-buttons">
                  <button className="btn-light" onClick={() => handleRentNowClick(v)}>Rent Now</button>
                  <button className="btn-dark" onClick={() => handleDetailsClick(v)}>Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-vehicles-message">
            <p>No vehicles found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentVehiclePage;