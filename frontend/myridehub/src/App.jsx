import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Auth/SignupPage';
import LoginPage from './Auth/LoginPage';
import DashboardPage from './Dashboard/DashboardPage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}