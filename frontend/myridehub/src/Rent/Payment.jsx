import React, { useState } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [gcashInfo, setGcashInfo] = useState({ number: "", name: "" });

  const handlePayment = () => {
    if (paymentMethod === "gcash") {
      if (!gcashInfo.number || !gcashInfo.name) {
        alert("Please enter your GCash information.");
        return;
      }
      alert("GCash Payment Successful!");
    } else {
      alert("Card Payment Successful!");
    }
    navigate("/");
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