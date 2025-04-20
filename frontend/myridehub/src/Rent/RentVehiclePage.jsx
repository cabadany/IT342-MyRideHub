import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./RentVehiclePage.css";

const RentVehiclePage = () => {
  const [category, setCategory] = useState("4wheels");
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/vehicles")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch vehicles:", err);
      });
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
    <div className="rent-page">
      <header className="rent-header">
        <div className="logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/booking">Book</a></li>
          <li><a href="/rent">Rent</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="#" className="nav-link">Settings</a></li>
          <li><button className="contact-btn">Contact Us</button></li>
        </ul>
      </header>

      <main className="rent-main">
        <h1 className="rent-title">RENT US</h1>

        <div className="category-buttons">
          <button
            className={category === "4wheels" ? "active" : ""}
            onClick={() => setCategory("4wheels")}
          >
            4 Wheels
          </button>
          <button
            className={category === "2wheels" ? "active" : ""}
            onClick={() => setCategory("2wheels")}
          >
            2 Wheels
          </button>
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="vehicle-grid">
            {filteredVehicles.map((v, idx) => (
              <div className="vehicle-card" key={idx}>
                <img src={v.imageUrl} alt={v.model} className="vehicle-image" />
                <div className="vehicle-info">
                  <h2>
                    {v.brand} {v.model}
                  </h2>
                  <p className="price">
                    ₱ {v.pricePerDay} <span>/ Day</span>
                  </p>
                  <p>
                    <strong>Type:</strong> {v.type} &nbsp;
                    <strong>Seats:</strong> {v.seats} &nbsp;
                    <strong>Engine:</strong> {v.engine}
                  </p>
                  <div className="vehicle-buttons">
                    <button
                      className="btn-light"
                      onClick={() => handleRentNowClick(v)}
                    >
                      Rent Now
                    </button>
                    <button
                      className="btn-dark"
                      onClick={() => handleDetailsClick(v)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-vehicles-message">
            <p>No vehicles found for this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RentVehiclePage;