import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css'; // Shared CSS file

const RentHistory = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const [rentHistory] = useState([
    {
      vehicle: "Toyota Corolla",
      date: "2023-06-15",
      duration: "3 days",
      price: "₱4,500",
    },
    {
      vehicle: "Ford Mustang",
      date: "2023-06-10",
      duration: "2 days",
      price: "₱6,000",
    },
    {
      vehicle: "Honda Civic",
      date: "2023-06-05",
      duration: "1 day",
      price: "₱2,500",
    },
  ]);

  return (
    <div className="history-container">
      <h1>Your Rent History</h1>
      <button onClick={handleBack}>Back to Home</button>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rentHistory.map((item, index) => (
              <tr key={index}>
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

export default RentHistory;
