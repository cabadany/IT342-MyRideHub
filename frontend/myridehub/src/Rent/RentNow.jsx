import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./RentNow.css"; // ← Make sure this is here

const RentNow = () => {
  const { state } = useLocation();
  const { vehicle } = state || {};

  const [isDriverSelected, setIsDriverSelected] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("12:00 PM");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("12:00 PM");
  const [total, setTotal] = useState(0);

  const handleDriverChange = (event) => {
    setIsDriverSelected(event.target.value === "withDriver");
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleCalculateTotal = () => {
    const rentalDays = calculateDays(pickUpDate, returnDate);
    const pricePerDay = vehicle?.pricePerDay || 0;
    const driverFee = isDriverSelected ? 500 : 0;
    setTotal(rentalDays * pricePerDay + driverFee);
  };

  return (
    <div className="rent-container">
      <h1 className="rent-title">{vehicle?.brand} {vehicle?.model}</h1>

      <img
        src={vehicle?.imageUrl}
        alt={vehicle?.model}
        className="vehicle-image"
      />

      <div className="form-container">
        <div className="driver-selection">
          <label
            className={`driver-radio ${isDriverSelected ? 'active' : ''}`}
          >
            <input
              type="radio"
              value="withDriver"
              checked={isDriverSelected}
              onChange={handleDriverChange}
              className="hidden"
            />
            With Driver
          </label>

          <label
            className={`driver-radio ${!isDriverSelected ? 'active' : ''}`}
          >
            <input
              type="radio"
              value="noDriver"
              checked={!isDriverSelected}
              onChange={handleDriverChange}
              className="hidden"
            />
            No Driver
          </label>
        </div>

        <div className="form-fields">
          <div>
            <label className="input-label">Pick Up Date</label>
            <input
              type="date"
              value={pickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="input-label">Pick Up Time</label>
            <select
              value={pickUpTime}
              onChange={(e) => setPickUpTime(e.target.value)}
              className="input-field"
            >
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
            </select>
          </div>
          <div>
            <label className="input-label">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="input-label">Return Time</label>
            <select
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="input-field"
            >
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
            </select>
          </div>
        </div>

        <div className="total-container">
          <span className="total-text">Total: ₱ {total}</span>
          <button
            onClick={handleCalculateTotal}
            className="calculate-button"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentNow;