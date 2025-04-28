import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css'; // Shared CSS file

const BookingHistory = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const [bookingHistory] = useState([
    {
      bookingId: "B12345",
      vehicle: "Honda Accord",
      date: "2023-07-20",
      duration: "5 days",
      price: "₱7,500",
    },
    {
      bookingId: "B12346",
      vehicle: "Nissan Altima",
      date: "2023-07-18",
      duration: "3 days",
      price: "₱4,500",
    },
    {
      bookingId: "B12347",
      vehicle: "Mazda 6",
      date: "2023-07-15",
      duration: "4 days",
      price: "₱6,000",
    },
  ]);

  return (
    <div className="history-container">
      <h1>Your Booking History</h1>
      <button onClick={handleBack}>Back to Home</button>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Vehicle</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.bookingId}</td>
                <td>{item.vehicle}</td>
                <td>{item.date}</td>
                <td>{item.duration}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;
