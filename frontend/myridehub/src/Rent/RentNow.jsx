import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RentNow.css";

const RentNow = () => {
  const { state } = useLocation();
  const { vehicle } = state || {};
  const navigate = useNavigate();

  const [isDriverSelected, setIsDriverSelected] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("12:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("12:00");
  const [total, setTotal] = useState(0);

  const handleDriverChange = (event) => {
    setIsDriverSelected(event.target.value === "withDriver");
  };

  const calculateDays = (startDate, startTime, endDate, endTime) => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const diffMs = end - start;

    if (diffMs <= 0) return 0;

    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return Math.ceil(diffDays);
  };

  const handleCalculateTotal = () => {
    const rentalDays = calculateDays(pickUpDate, pickUpTime, returnDate, returnTime);
    const pricePerDay = vehicle?.pricePerDay || 0;
    const driverFee = isDriverSelected ? 500 : 0;
    const computedTotal = rentalDays * pricePerDay + driverFee;
    setTotal(computedTotal);
  };

  const handleProceed = () => {
    navigate("/rent/reservation", {
      state: {
        vehicle,
        isDriverSelected,
        pickUpDate,
        pickUpTime,
        returnDate,
        returnTime,
        total,
      },
    });
  };

  return (
    <div className="rent-now-page">
      <div className="rent-container">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="rent-title">{vehicle?.brand} {vehicle?.model}</h1>

        <div className="form-wrapper">
          <img src={vehicle?.imageUrl} alt={vehicle?.model} className="vehicle-image" />

          <div className="form-container">
            <div className="driver-selection">
              <label className={`driver-radio ${isDriverSelected ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="withDriver"
                  checked={isDriverSelected}
                  onChange={handleDriverChange}
                  className="hidden"
                />
                With Driver
              </label>

              <label className={`driver-radio ${!isDriverSelected ? 'active' : ''}`}>
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
                <input
                  type="time"
                  value={pickUpTime}
                  onChange={(e) => setPickUpTime(e.target.value)}
                  className="input-field"
                />
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
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="total-container">
              <span className="total-text">Total: ₱ {total}</span>
              <button onClick={handleCalculateTotal} className="calculate-button">
                Calculate
              </button>
            </div>

            <button className="proceed-button" onClick={handleProceed}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentNow;
