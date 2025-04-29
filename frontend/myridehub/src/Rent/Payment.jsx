import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveRental } from "../../api";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    vehicle,
    pickUpDate,
    pickUpTime,
    returnDate,
    returnTime,
    total,
    isDriverSelected,
    customerInfo
  } = state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [gcashInfo, setGcashInfo] = useState({ number: "", name: "" });

  const handlePayment = async () => {
    if (paymentMethod === "gcash" && (!gcashInfo.number || !gcashInfo.name)) {
      alert("Please enter your GCash information.");
      return;
    }

    const rentalData = {
      vehicleId: vehicle?.id,
      customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
      email: customerInfo.email,
      phone: customerInfo.phone,
      pickUpDate,
      pickUpTime,
      returnDate,
      returnTime,
      paymentMethod,
      gcashNumber: gcashInfo.number,
      gcashName: gcashInfo.name,
      withDriver: isDriverSelected,
      totalFare: total,
    };

    try {
      await saveRental(rentalData);
      alert("Payment Successful! Reservation Saved.");
      navigate("/rent/confirmation", {
        state: {
          vehicle,
          pickUpDate,
          pickUpTime,
          returnDate,
          returnTime,
          total,
          isDriverSelected,
          customerInfo,
          paymentMethod,
          gcashNumber: gcashInfo.number,
          gcashName: gcashInfo.name,
        }
      });
    } catch (error) {
      console.error("Error saving rental:", error);
      alert("Something went wrong while saving reservation.");
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Choose Payment Method</h1>

      <div className="payment-methods">
        <button
          className={`method-button ${paymentMethod === "card" ? "active" : ""}`}
          onClick={() => setPaymentMethod("card")}
        >
          Credit/Debit Card
        </button>
        <button
          className={`method-button ${paymentMethod === "gcash" ? "active" : ""}`}
          onClick={() => setPaymentMethod("gcash")}
        >
          GCash
        </button>
      </div>

      {paymentMethod === "card" ? (
        <div className="payment-form">
          <label>Cardholder Name</label>
          <input type="text" placeholder="John Doe" />

          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" />

          <label>Expiration Date</label>
          <input type="text" placeholder="MM/YY" />

          <label>CVV</label>
          <input type="text" placeholder="123" />
        </div>
      ) : (
        <div className="gcash-form">
          <label>GCash Mobile Number</label>
          <input
            type="text"
            placeholder="09XXXXXXXXX"
            value={gcashInfo.number}
            onChange={(e) => setGcashInfo({ ...gcashInfo, number: e.target.value })}
          />

          <label>Account Holder Name</label>
          <input
            type="text"
            placeholder="Juan Dela Cruz"
            value={gcashInfo.name}
            onChange={(e) => setGcashInfo({ ...gcashInfo, name: e.target.value })}
          />
        </div>
      )}

      <button className="pay-button" onClick={handlePayment}>
        {paymentMethod === "gcash" ? "Pay via GCash" : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;