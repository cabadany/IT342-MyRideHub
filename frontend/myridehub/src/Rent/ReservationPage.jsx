import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { vehicle, pickUpDate, pickUpTime, returnDate, returnTime, total, isDriverSelected } = state || {};

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleReserveNow = () => {
    if (!form.agree) {
      alert("Please agree to the Terms and Conditions before proceeding.");
      return;
    }

    navigate("/rent/payment", {
      state: {
        vehicle,
        pickUpDate,
        pickUpTime,
        returnDate,
        returnTime,
        total,
        isDriverSelected,
        customerInfo: form,
      },
    });
  };

  return (
    <div className="reservation-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <main className="reservation-main">
        <div className="left-section">
          <div className="box">
            <h3>Booking Details</h3>
            <p>Pick-up Date & Time: {pickUpDate} at {pickUpTime}</p>
            <p>Return Date & Time: {returnDate} at {returnTime}</p>
          </div>

          {isDriverSelected && (
            <div className="box">
              <h3>Driver Information</h3>
              <p>Driver Included.</p>
            </div>
          )}

          <div className="box">
            <h3>Vehicle Details</h3>
            <p>Car Model & Variant: {vehicle?.brand} {vehicle?.model}</p>
            <p>Engine: {vehicle?.engine}</p>
            <p>Seats: {vehicle?.seats}</p>
          </div>
        </div>

        <div className="center-section">
          <img src={vehicle?.imageUrl} alt={`${vehicle?.brand} ${vehicle?.model}`} />
          <h2>{vehicle?.brand} {vehicle?.model}</h2>
          <p>Rental Price: ₱ {vehicle?.pricePerDay?.toLocaleString()}/ Day</p>
        </div>

        <div className="right-section">
          <div className="box">
            <h3>Customer Details</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              /> I have read and agree to the Terms and Conditions.
            </label>
          </div>

          <div className="summary-box">
            <p>Estimated total due at the counter</p>
            <h2>PHP {total ? total.toLocaleString() : '0.00'}</h2>
            <button className="reserve-button" onClick={handleReserveNow}>
              RESERVE NOW
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationPage;