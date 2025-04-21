import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarsDashboard.css';

export default function CarsDashboard() {
  const [cars, setCars] = useState([
    "Toyota Corolla",
    "Ford Mustang"
  ]);

  const navigate = useNavigate(); 

  const handleAddCar = () => {
    const newCar = prompt("Enter car name:");
    if (newCar && newCar.trim() !== '') {
      setCars([...cars, newCar.trim()]);
    }
  };

  const handleDeleteCar = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
  };

  const handleEditCar = (index) => {
    const currentName = cars[index];
    const newName = prompt("Edit car name:", currentName);
    if (newName && newName.trim() !== '') {
      const updatedCars = [...cars];
      updatedCars[index] = newName.trim();
      setCars(updatedCars);
    }
  };

  const handleGoToUsers = () => {
    navigate('/usersdashboard'); 
  };

  return (
    <div className="cars-dashboard-container">
      <div className="cars-dashboard-header">
      <img
          src="/Ride Hub Logo (White).png"
          alt="Ride Hub Logo"
          className="motorcycles-dashboard-logo"
        />
        <h1>Admin Panel</h1>
      </div>

      <div className="cars-dashboard-panel">
        <div className="cars-dashboard-column">
          <button className="cars-dashboard-tab selected">Vehicles</button>
          <button className="add-car-btn" onClick={handleAddCar}>add car</button>
          <ul className="car-list">
            {cars.map((car, index) => (
              <li className="car-item" key={index}>
                <span>{car}</span>
                <div className="car-buttons">
                  <button className="edit-btn" onClick={() => handleEditCar(index)}>edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteCar(index)}>delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="cars-dashboard-column">
          <button className="cars-dashboard-tab" onClick={handleGoToUsers}>
            Users
          </button>
        </div>
      </div>
    </div>
  );
}
