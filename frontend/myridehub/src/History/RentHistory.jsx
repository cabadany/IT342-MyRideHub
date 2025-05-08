import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HistoryPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RentHistory = () => {
  const navigate = useNavigate();
  const [rentHistory, setRentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const fetchRentHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/rent-history`);
        setRentHistory(response.data);
      } catch (error) {
        console.error("Error fetching rent history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentHistory();
  }, []);

  return (
    <div className="history-container">
      <h1>Your Rent History</h1>
      <button className="back-button" onClick={handleBack}>← Back to Home</button>

      {loading ? (
        <p>Loading...</p>
      ) : rentHistory.length === 0 ? (
        <p>No rental history found.</p>
      ) : (
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Renter Name</th>
                <th>Rent Date</th>
                <th>Return Date</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rentHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.vehicleId || item.vehicleType || 'N/A'}</td>
                  <td>{item.renterName || item.customerName}</td>
                  <td>{new Date(item.rentDate || item.pickupDate).toLocaleString()}</td>
                  <td>{new Date(item.returnDate).toLocaleString()}</td>
                  <td>₱{item.totalAmount?.toLocaleString() || item.totalPrice?.toLocaleString()}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RentHistory;