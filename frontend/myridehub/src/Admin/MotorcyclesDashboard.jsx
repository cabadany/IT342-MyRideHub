import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MotorcyclesDashboard.css';

export default function MotorcyclesDashboard() {
  const [motorcycles, setMotorcycles] = useState([
    "Ducati Monster 821",
    "Suzuki GSX-R600"
  ]);

  const navigate = useNavigate();

  const handleAddMotorcycle = () => {
    const newMotor = prompt("Enter motorcycle name:");
    if (newMotor && newMotor.trim() !== '') {
      setMotorcycles([...motorcycles, newMotor.trim()]);
    }
  };

  const handleEditMotorcycle = (index) => {
    const currentName = motorcycles[index];
    const newName = prompt("Edit motorcycle name:", currentName);
    if (newName && newName.trim() !== '') {
      const updated = [...motorcycles];
      updated[index] = newName.trim();
      setMotorcycles(updated);
    }
  };

  const handleDeleteMotorcycle = (index) => {
    const updated = [...motorcycles];
    updated.splice(index, 1);
    setMotorcycles(updated);
  };

  const handleGoToUsers = () => {
    navigate('/usersdashboard');
  };

  return (
    <div className="motorcycles-dashboard-container">
      <div className="motorcycles-dashboard-header">
        <img
          src="/Ride Hub Logo (White).png"
          alt="Ride Hub Logo"
          className="motorcycles-dashboard-logo"
        />
        <h1>Admin Panel</h1>
      </div>

      <div className="motorcycles-dashboard-panel">
        <div className="motorcycles-dashboard-column">
          <button className="motorcycles-dashboard-tab selected">Vehicles</button>
          <button className="add-motorcycle-btn" onClick={handleAddMotorcycle}>add motorcycle</button>
          <ul className="motorcycle-list">
            {motorcycles.map((bike, index) => (
              <li className="motorcycle-item" key={index}>
                <span>{bike}</span>
                <div className="motorcycle-buttons">
                  <button className="edit-btn" onClick={() => handleEditMotorcycle(index)}>edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteMotorcycle(index)}>delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="motorcycles-dashboard-column">
          <button className="motorcycles-dashboard-tab" onClick={handleGoToUsers}>
            Users
          </button>
        </div>
      </div>
    </div>
  );
}
