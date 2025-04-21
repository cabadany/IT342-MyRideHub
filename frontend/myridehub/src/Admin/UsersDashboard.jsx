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

  const handleGoToCars = () => {
    navigate('/cardashboard');
  };

  const handleGoToMotorcycles = () => {
    navigate('/motordashboard');
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
        
        <div className="users-dashboard-column dropdown-wrapper">
          <button className="users-tab" onClick={toggleDropdown}>
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

        
        <div className="users-dashboard-column">
          <button className="users-tab selected">Users</button>
          <button className="add-user-btn" onClick={handleAddUser}>add user</button>
          <ul className="user-list">
            {users.map((user, index) => (
              <li className="user-item" key={index}>
                <span>{user}</span>
                <div className="user-buttons">
                  <button className="edit-btn" onClick={() => handleEditUser(index)}>edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(index)}>delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
