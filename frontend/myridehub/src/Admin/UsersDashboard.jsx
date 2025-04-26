import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersDashboard.css';

export default function UsersDashboard() {
  const [users, setUsers] = useState([

  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddUser = () => {
    const newUser = prompt("Enter user name:");
    if (newUser && newUser.trim() !== '') {
      setUsers([...users, newUser.trim()]);
    }
  };

  const handleEditUser = (index) => {
    const current = users[index];
    const updated = prompt("Edit user name:", current);
    if (updated && updated.trim() !== '') {
      const newUsers = [...users];
      newUsers[index] = updated.trim();
      setUsers(newUsers);
    }
  };

  const handleDeleteUser = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Navigation handlers
  const handleGoToVehicles = () => {
    navigate('/cardashboard'); // This will navigate to the /cardashboard page when Vehicles is clicked
  };

  const handleGoToMotorcycles = () => {
    navigate('/motordashboard'); // This will navigate to the motorcycles dashboard
  };

  return (
    <div className="users-dashboard-container">
      <div className="users-dashboard-header">
        <img 
          src="/Ride Hub Logo (White).png" 
          alt="Ride Hub Logo" 
          className="users-dashboard-logo" 
        />
        <h1>Admin Panel</h1>
      </div>

      <div className="users-dashboard-panel">
        {/* Vehicles Section */}
        <div className="users-dashboard-column dropdown-wrapper">
          <button className="vehicles-tab" onClick={handleGoToVehicles}> 
            <strong>Vehicles</strong> 
            <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="menu-item" onClick={handleGoToVehicles}>▶ Cars</div>
              <div className="menu-item" onClick={handleGoToMotorcycles}>▶ Motorcycles</div>
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="users-dashboard-column">
          <button className="users-tab selected">Users</button>
          <button className="add-user-btn" onClick={handleAddUser}>Add User</button>
          <ul className="user-list">
            {users.map((user, index) => (
              <li className="user-item" key={index}>
                <span>{user}</span>
                <div className="user-buttons">
                  <button className="edit-btn" onClick={() => handleEditUser(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
