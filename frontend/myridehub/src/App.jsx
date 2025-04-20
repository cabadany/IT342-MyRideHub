import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Auth/SignupPage';
import LoginPage from './Auth/LoginPage';
import DashboardPage from './Dashboard/DashboardPage';
import RentVehiclePage from './Rent/RentVehiclePage';  
import BookingPage from './Booking/BookingPage';
import CarDetail from './Rent/CarDetail';
import RentNow from './Rent/RentNow';
import ReservationPage from './Rent/ReservationPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/rent" element={<RentVehiclePage />} />
        <Route path="/rent/car-detail" element={<CarDetail />} />
        <Route path="/rent/rent-now" element={<RentNow />} />
        <Route path="/rent/reservation" element={<ReservationPage />} />    
      </Routes>
    </Router>
  );
}