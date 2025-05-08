import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HistoryPage.css";

const API_URL = "https://it342-myridehub.onrender.com/api/booking-history";

export default function BookingHistoryPage() {
  const [histories, setHistories] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchHistories = async () => {
    try {
      const res = await axios.get(API_URL);
      setHistories(res.data);
    } catch (err) {
      console.error("Failed to fetch booking history:", err);
    }
  };

  const fetchByCustomer = async (name) => {
    try {
      const res = await axios.get(`${API_URL}/customer/${name}`);
      setHistories(res.data);
    } catch (err) {
      console.error("Failed to filter by customer:", err);
    }
  };

  const fetchByStatus = async (status) => {
    try {
      const res = await axios.get(`${API_URL}/status/${status}`);
      setHistories(res.data);
    } catch (err) {
      console.error("Failed to filter by status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setHistories(histories.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Failed to delete booking history:", err);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  return (
    <div className="booking-history-page">
      <h1>Booking History</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by customer name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <button onClick={() => fetchByCustomer(filterName)}>Search</button>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            if (e.target.value) fetchByStatus(e.target.value);
          }}
        >
          <option value="">Filter by status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button onClick={fetchHistories}>Clear Filters</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
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
          {histories.length > 0 ? (
            histories.map((h) => (
              <tr key={h.id}>
                <td>{h.customerName}</td>
                <td>{h.pickupLocation}</td>
                <td>{h.dropOffLocation}</td>
                <td>{new Date(h.pickupDate).toLocaleString()}</td>
                <td>{h.status}</td>
                <td>{h.distance}</td>
                <td>₱{h.totalPrice}</td>
                <td>
                  <button onClick={() => handleDelete(h.id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No booking history found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}