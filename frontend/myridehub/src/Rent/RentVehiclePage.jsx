import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RentVehiclePage.css';

const vehicleData = {
  "4wheels": [
    {
      brand: "Toyota",
      model: "Fortuner 2024",
      price: 5000,
      type: "Mid-size SUV",
      seats: 7,
      engine: "2.8L I4",
      image: "/Fortuner.png",
    },
    {
      brand: "Toyota",
      model: "Avanza 2023",
      price: 2900,
      type: "MPV",
      seats: "6-7",
      engine: "1.5L I4",
      image: "/avanza.png",
    },
    {
      brand: "Honda",
      model: "Civic 2025",
      price: 2000,
      type: "Sedan",
      seats: 5,
      engine: "2.0L I4",
      image: "/Honda.png",
    },
  ],
  "2wheels": [
    {
      brand: "Yamaha",
      model: "Mio Gear i 125cc",
      price: 500,
      type: "Scooter",
      seats: 2,
      engine: "125cc",
      image: "/Mio.png",
    },
    {
      brand: "Yamaha",
      model: "Nmax 155cc",
      price: 800,
      type: "Scooter",
      seats: 2,
      engine: "155cc",
      image: "/nmax.png",
    },
    {
      brand: "Honda",
      model: "Click 160cc",
      price: 700,
      type: "Scooter",
      seats: 2,
      engine: "160cc",
      image: "/click.png",
    },
  ],
};

const RentVehiclePage = () => {
  const [category, setCategory] = useState("4wheels");
  const navigate = useNavigate();

  const handleDetailsClick = (vehicle) => {
    navigate("/cardetail", { state: { vehicle } });
  };

  const handleRentNowClick = (vehicle) => {
    navigate("/rentnow", { state: { vehicle } });
  };

  return (
    <div className="rent-page">
      <header className="rent-header">
        <div className="logo">
          <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub Logo" className="logo-img" />
        </div>
        <nav className="rent-nav">
          <ul>
            <li>Home</li>
            <li>Book</li>
            <li>Rent</li>
            <li>About Us</li>
          </ul>
        </nav>
        <div>
          <button className="btn-outline">Contact Us</button>
        </div>
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

        <div className="vehicle-grid">
          {vehicleData[category].map((v, idx) => (
            <div className="vehicle-card" key={idx}>
              <img src={v.image} alt={v.model} className="vehicle-image" />
              <div className="vehicle-info">
                <h2>
                  {v.brand} {v.model}
                </h2>
                <p className="price">
                  ₱ {v.price} <span>/ Day</span>
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
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RentVehiclePage;
