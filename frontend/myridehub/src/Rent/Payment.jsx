import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [reservationData, setReservationData] = useState(() => {
    // Try to load from location.state first, then localStorage
    return state || JSON.parse(localStorage.getItem("reservationData")) || null;
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem("reservationData", JSON.stringify(state));
    }
  }, [state]);

  if (!reservationData) {
    return (
      <div className="payment-page">
        <h2>No reservation data found.</h2>
        <button onClick={() => navigate("/rent")}>← Back to Rent</button>
      </div>
    );
  }

  const {
    vehicle,
    pickUpDate,
    pickUpTime,
    returnDate,
    returnTime,
    total,
    isDriverSelected,
    customerInfo,
  } = reservationData;

  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [gcashNumber, setGcashNumber] = useState("");
  const [gcashName, setGcashName] = useState("");

  const handleConfirmPayment = () => {
    navigate("/rent/confirmation", {
      state: {
        ...reservationData,
        paymentMethod,
        gcashNumber,
        gcashName,
      },
    });
  };

  return (
    <div className="payment-page">
      <h1>Payment Details</h1>

      <div className="payment-section">
        <h3>Selected Vehicle</h3>
        <p>{vehicle?.brand} {vehicle?.model}</p>
        <p>Pick-up: {pickUpDate} at {pickUpTime}</p>
        <p>Return: {returnDate} at {returnTime}</p>
        <p>Total: ₱{total?.toLocaleString()}</p>
      </div>

      <div className="payment-section">
        <h3>Customer Information</h3>
        <p>{customerInfo?.firstName} {customerInfo?.lastName}</p>
        <p>{customerInfo?.email}</p>
        <p>{customerInfo?.phone}</p>
      </div>

      <div className="payment-section">
        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="gcash">GCash</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        {paymentMethod === "gcash" && (
          <div className="gcash-fields">
            <input
              type="text"
              placeholder="GCash Mobile Number"
              value={gcashNumber}
              onChange={(e) => setGcashNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Account Holder Name"
              value={gcashName}
              onChange={(e) => setGcashName(e.target.value)}
            />
          </div>
        )}
      </div>

      <button className="confirm-button" onClick={handleConfirmPayment}>
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentPage;