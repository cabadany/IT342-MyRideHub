import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css'; 

export default function AdminPanel() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleGoToCars = () => {
    navigate('/cardashboard');
  };

  const handleGoToMotorcycles = () => {
    navigate('/motordashboard');
  };

  const handleGoToUsers = () => {
    navigate('/usersdashboard');
  };

  return (
    <div className="container">
      
      <div className="header">
      <img
          src="/Ride Hub Logo (White).png"
          alt="Ride Hub Logo"
          className="motorcycles-dashboard-logo"
        />
        <h1 className="title">Admin Panel</h1>
      </div>

      
      <div className="panel">
        
        <div className="section">
          <button className="dropdown-btn" onClick={toggleDropdown}>
            <strong>Vehicles</strong>
            <span className="arrow">▼</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="menu-item" onClick={handleGoToCars}>▶ Cars</div>
              <div className="menu-item" onClick={handleGoToMotorcycles}>▶ Motorcycles</div>
            </div>
          )}
        </div>

        
        <div className="section">
          <button className="users-btn" onClick={handleGoToUsers}>
            <strong>Users</strong>
          </button>
        </div>
      </div>
    </div>
  );
}
