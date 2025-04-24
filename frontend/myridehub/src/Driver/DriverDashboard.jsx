import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './DriverDashboard.css';

const DriverDashboard = () => {
  const navigate = useNavigate();

  // Function to handle log out
  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens, user data, etc.)
    navigate('/driver-login'); // Navigate back to the login page
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-picture">
              <img src="/path_to_profile_picture.png" alt="Profile" />
              <button>Update photo</button>
            </div>
            <div className="profile-info">
              <h3>Name: Juan Dela Cruz</h3>
              <p>Rating: ⭐⭐⭐⭐⭐</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <label>Contact Number:</label>
              <p>09123456789</p>
            </div>
            <div className="detail-item">
              <label>License Number:</label>
              <p>AB123456</p>
            </div>
            <div className="detail-item">
              <label>Total Earnings:</label>
              <p>$1200</p>
            </div>
            <div className="detail-item">
              <label>Total Rides Completed:</label>
              <p>45</p>
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
      <div className="need-help">
        <a href="/help">Need Help?</a>
      </div>
    </div>
  );
};

export default DriverDashboard;
