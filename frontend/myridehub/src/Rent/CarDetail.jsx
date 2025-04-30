import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './CarDetail.css';
import axios from 'axios';

const CarDetail = () => {
  const { state } = useLocation(); 
  const { vehicle: passedVehicle } = state || {}; 
  const [vehicle, setVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (passedVehicle?.id) {
      axios.get(`https://it342-myridehub.onrender.com/api/vehicles/${passedVehicle.id}`)
        .then(res => setVehicle(res.data))
        .catch(err => console.error('Failed to fetch vehicle details:', err));
    } else {
      setVehicle(passedVehicle); 
    }
  }, [passedVehicle]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rent-page">
      <main className="rent-main">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="main-content">
          <div className="details-box">
            <h1 className="title">{vehicle.brand} {vehicle.model}</h1>

            <div className="section">
              <h2 className="section-title">VEHICLE DETAILS</h2>
              <ul className="section-list">
                <li>Rent: ₱ {vehicle.pricePerDay}</li>
                <li>Color: {vehicle.color || 'N/A'}</li>
                <li>Transmission: {vehicle.transmission || '6-Speed Auto / Manual'}</li>
                <li>Engine: {vehicle.engine || 'N/A'}</li>
                <li>Fuel Type: {vehicle.fuelType || 'Diesel'}</li>
                <li>VIN: {vehicle.vin || 'N/A'}</li>
                <li>Registration: {vehicle.registration || 'N/A'}</li>
                <li>Reg Expiry: {vehicle.regExpiry || 'N/A'}</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">FEATURES</h2>
              <ul className="section-list">
                {vehicle.features
                  ? vehicle.features.split(',').map((feature, index) => (
                      <li key={index}>✓ {feature.trim()}</li>
                    ))
                  : <li>No features listed.</li>}
              </ul>
            </div>
          </div>

          <div className="image-box">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.model}
              className="vehicle-image"
            />
            <button className="btn-light" onClick={() => navigate('/rent/rent-now', { state: { vehicle } })}>
              Rent Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetail;