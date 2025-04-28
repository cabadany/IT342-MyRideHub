import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    vehicle,
    pickUpDate,
    pickUpTime,
    returnDate,
    returnTime,
    total,
    isDriverSelected,
    customerInfo,
    paymentMethod,        // <=== ADD THIS
    gcashNumber,          // <=== ADD THIS
    gcashName             // <=== ADD THIS
  } = state || {};

  if (!state) {
    return (
      <div className="confirmation-container">
        <h2>No reservation found.</h2>
        <button onClick={() => navigate("/rent")}>Back to Rent Page</button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">🎉 Reservation Successful!</h1>

      <div className="confirmation-row">
        {/* Customer Section */}
        <div className="confirmation-section">
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> {customerInfo?.firstName} {customerInfo?.lastName}</p>
          <p><strong>Phone:</strong> {customerInfo?.phone}</p>
          <p><strong>Email:</strong> {customerInfo?.email}</p>
        </div>

        {/* Rental Section */}
        <div className="confirmation-section">
          <h2>Rental Information</h2>
          <p><strong>Pick-up:</strong> {pickUpDate} at {pickUpTime}</p>
          <p><strong>Return:</strong> {returnDate} at {returnTime}</p>
          <p><strong>With Driver:</strong> {isDriverSelected ? "Yes" : "No"}</p>
          <p><strong>Total Fare:</strong> ₱{total?.toLocaleString()}</p>
        </div>

        {/* Vehicle Section */}
        <div className="confirmation-section">
          <h2>Vehicle Information</h2>
          <p><strong>Model:</strong> {vehicle?.brand} {vehicle?.model}</p>
          <p><strong>Engine:</strong> {vehicle?.engine}</p>
          <p><strong>Seats:</strong> {vehicle?.seats}</p>
        </div>

        {/* Payment Section */}
        <div className="confirmation-section">
          <h2>Payment Details</h2>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
          {paymentMethod === "GCash" && (
            <>
              <p><strong>GCash Mobile Number:</strong> {gcashNumber}</p>
              <p><strong>Account Holder Name:</strong> {gcashName}</p>
            </>
          )}
        </div>
      </div>

      <button onClick={() => navigate("/dashboard")} className="back-home-button">
        Return to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
