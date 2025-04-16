import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './CarDetail.css';


const CarDetail = () => {
  const { state } = useLocation(); 
  const { vehicle } = state || {}; 

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car-container">
      {/* Navbar */}
      <nav className="navbar">
      <img src={logo} alt="Ride Hub Logo" className="w-16 h-auto" />
        <ul className="nav-links">
          <li>Home</li>
          <li>Book</li>
          <li>Rent</li>
          <li>About Us</li>
          <li>
            <button className="contact-button">Contact Us</button>
          </li>
        </ul>
      </nav>

      
      <div className="main-content">
      
        <div className="details-box">
          <h1 className="title">{vehicle.brand} {vehicle.model}</h1> {/* Dynamically display vehicle name */}

          <div className="section">
            <h2 className="section-title">VEHICLE DETAILS</h2>
            <ul className="section-list">
              <li>Rent: ₱ {vehicle.price}</li> {/* Dynamically display price */}
              <li>Kilometers: X,XXX</li>  {/* Add appropriate value if needed */}
              <li>Body Type: {vehicle.type}</li>  {/* Dynamically display vehicle type */}
              <li>Color: {vehicle.color || 'N/A'}</li>  {/* Add color dynamically if available */}
              <li>Interior: Premium Leather</li>  {/* Adjust if applicable */}
              <li>Transmission: 6-Speed Auto / Manual</li>  {/* Adjust based on the actual vehicle data */}
              <li>Engine: {vehicle.engine}</li>  {/* Dynamically display engine type */}
              <li>Fuel Type: Diesel</li>  {/* Adjust if applicable */}
              <li>VIN: {vehicle.vin || 'N/A'}</li>  {/* Add VIN dynamically if available */}
              <li>Registration: {vehicle.registration || 'N/A'}</li>  {/* Add registration number dynamically */}
              <li>Reg Expiry: {vehicle.regExpiry || 'N/A'}</li>  {/* Add expiry date dynamically */}
            </ul>
          </div>

          <div className="section">
            <h2 className="section-title">FEATURES</h2>
            <ul className="section-list">
              <li>✓ Air Conditioning & Climate Control</li>
              <li>✓ Leather Seats & Sunroof (Optional)</li>
              <li>✓ Keyless Entry & Push Start</li>
              <li>✓ ABS Braking & Traction Control</li>
              <li>✓ Parking Sensors & 360° Camera</li>
              <li>✓ Lane Departure Warning & Blind Spot Monitor</li>
              <li>✓ Alloy Wheels & Roof Rails</li>
            </ul>
          </div>
        </div>

        {/* Vehicle Image + Button */}
        <div className="image-box">
          <img
            src={vehicle.image} 
            alt={vehicle.model}
            className="vehicle-image"
          />
          <button className="rent-button">Rent Now</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
