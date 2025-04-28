import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { paymentDetails } = state || {};

  const [paymentMethod, setPaymentMethod] = useState("Card"); 

  const handlePayNow = () => {
    navigate("/rent/confirmation", {
      state: {
        ...paymentDetails,
        paymentSuccess: true,
        paymentMethod: paymentMethod, 
      },
    });
  };

  if (!paymentDetails) {
    return <p style={{ textAlign: "center", color: "white" }}>No Payment Details Found</p>;
  }

  return (
    <div className="reservation-container">
      {/* Header area kung meron ka. Pwede mong ilagay dito */}

      <div className="main-content">
        <div className="payment-page">
          <h1>Choose Payment Method</h1>

          <div className="payment-method-buttons">
            <button
              className={paymentMethod === "Card" ? "active-button" : "inactive-button"}
              onClick={() => setPaymentMethod("Card")}
            >
              Credit/Debit Card
            </button>
            <button
              className={paymentMethod === "GCash" ? "active-button" : "inactive-button"}
              onClick={() => setPaymentMethod("GCash")}
            >
              GCash
            </button>
          </div>

          <div className="payment-info">
            <p><strong>Vehicle:</strong> {paymentDetails.vehicle?.brand} {paymentDetails.vehicle?.model}</p>
            <p><strong>Total Amount:</strong> ₱{paymentDetails.total?.toLocaleString()}</p>
            <p><strong>Selected Payment:</strong> {paymentMethod}</p>
          </div>

          <button className="pay-now-button" onClick={handlePayNow}>
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
