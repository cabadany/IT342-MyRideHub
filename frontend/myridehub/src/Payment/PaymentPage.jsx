import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Rent/ReservationPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Car and reservation details passed from previous page
  const vehicle = location.state?.vehicle || {
    model: 'Toyota Fortuner',
    amount: '₱6,027.92',
    rentalPeriod: 'April 20 - April 22',
    pickupLocation: 'Downtown Branch'
  };

  const handlePayment = (method) => {
    const transactionId = 'TXN' + Math.floor(Math.random() * 1000000000); // Mock ID
    navigate('/confirmation', {
      state: {
        transactionId,
        amountPaid: vehicle.amount,
        model: vehicle.model,
        rentalPeriod: vehicle.rentalPeriod,
        pickupLocation: vehicle.pickupLocation
      }
    });
  };

  return (
    <div className="reservation-container">
      <header className="reservation-header">
        <img src="/Ride Hub Logo (Dark).png" alt="Logo" style={{ height: '40px' }} />
        <h2 style={{ flex: 1, textAlign: 'center' }}>Select Payment Method</h2>
        <button className="contact-button" onClick={() => navigate(-1)}>Back</button>
      </header>

      <main className="confirmation-box">
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          You’re about to pay <strong>{vehicle.amount}</strong> for <strong>{vehicle.model}</strong>.
        </p>

        <div className="box" style={{ cursor: 'pointer' }} onClick={() => handlePayment('Credit Card')}>
          💳 Credit/Debit Card
        </div>
        <div className="box" style={{ cursor: 'pointer' }} onClick={() => handlePayment('PayPal')}>
          🅿️ PayPal
        </div>
        <div className="box" style={{ cursor: 'pointer' }} onClick={() => handlePayment('Gcash')}>
          💸 GCash
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
