import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Auth/SignupPage';
import LoginPage from './Auth/LoginPage';
import DashboardPage from './Dashboard/DashboardPage';
import BookingPage from './Booking/BookingPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}