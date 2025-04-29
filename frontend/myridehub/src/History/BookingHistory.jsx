import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HistoryPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ Connect to your .env backend URL

const BookingHistory = () => {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bookings`);
        setBookingHistory(response.data);
      } catch (err) {
        console.error('Failed to fetch booking history:', err);
        setError('Failed to load booking history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (loading) {
    return <div className="history-container"><p>Loading booking history...</p></div>;
  }

  if (error) {
    return <div className="history-container"><p>{error}</p></div>;
  }

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
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.length > 0 ? (
              bookingHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.id || '-'}</td>
                  <td>{item.vehicle?.brand && item.vehicle?.model ? `${item.vehicle.brand} ${item.vehicle.model}` : '-'}</td>
                  <td>{item.pickupDate ? new Date(item.pickupDate).toLocaleDateString() : '-'}</td>
                  <td>{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '-'}</td>
                  <td>₱{item.totalPrice?.toLocaleString() || '0.00'}</td>
                  <td>{item.status || 'Pending'}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;