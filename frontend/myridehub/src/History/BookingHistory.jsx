import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HistoryPage.css";

const API_URL = "https://it342-myridehub.onrender.com/api/bookings";

export default function BookingHistoryPage() {
  const [histories, setHistories] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const fetchUserBookings = async () => {
    const customerId = localStorage.getItem("userId");
    if (!customerId) {
      console.error("User ID not found in localStorage.");
      return;
    }
  
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/customer/${customerId}`);
      setHistories(res.data);
    } catch (err) {
      console.error("Failed to fetch user's booking history:", err);
    } finally {
      setLoading(false);
    }
  };  

  const fetchByStatus = async (status) => {
    if (!userId || !status) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/customer/${userId}/status/${status}`);
      setHistories(res.data);
    } catch (err) {
      console.error("Failed to filter by status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setHistories(histories.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  return (
    <div className="booking-history-page">
      <h1>My Booking History</h1>

      <div className="filters">
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            if (e.target.value) {
              fetchByStatus(e.target.value);
            } else {
              fetchUserBookings(); // reset filter
            }
          }}
        >
          <option value="">Filter by status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button onClick={fetchUserBookings}>Clear Filters</button>
      </div>

      {loading ? (
        <p>Loading booking history...</p>
      ) : histories.length === 0 ? (
        <p>No bookings found for your account.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Pickup</th>
              <th>Drop-off</th>
              <th>Date</th>
              <th>Status</th>
              <th>Distance</th>
              <th>Fare</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((h) => (
              <tr key={h.id}>
                <td>{h.pickupLocation}</td>
                <td>{h.dropOffLocation}</td>
                <td>{new Date(h.pickupDate).toLocaleString()}</td>
                <td>{h.status}</td>
                <td>{h.distance}</td>
                <td>₱{h.totalPrice?.toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(h.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}