import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReservationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure data passed from previous page
  const {
    transactionId = '#123456789',
    amountPaid = '₱6,027.92',
    model = 'Toyota Fortuner',
    rentalPeriod = 'April 20 - April 22',
    pickupLocation = 'Downtown Branch'
  } = location.state || {};

  return (
    <div className="reservation-container">
      <header className="reservation-header">
        <img src="/Ride Hub Logo (Dark).png" alt="Logo" style={{ height: '40px' }} />
        <h2 style={{ flex: 1, textAlign: 'center' }}>Confirmation</h2>
        <button className="contact-button" onClick={() => navigate('/')}>Done</button>
      </header>

      <main className="confirmation-box">
        <h2>✔ Payment Successful!</h2>
        <ul>
          <li>📜 Transaction ID: <strong>{transactionId}</strong></li>
          <li>💰 Amount Paid: <strong>{amountPaid}</strong></li>
          <li>🚗 Car Model: <strong>{model}</strong></li>
          <li>📅 Rental Period: <strong>{rentalPeriod}</strong></li>
          <li>📍 Pickup Location: <strong>{pickupLocation}</strong></li>
        </ul>
        <p style={{ marginTop: '1.5rem' }}>
          Thank you for choosing <strong>MyRideHub</strong>!
        </p>
      </main>
    </div>
  );
};

export default ConfirmationPage;
