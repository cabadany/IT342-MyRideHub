import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Auth/SignupPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}