import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import SignupPage from './Auth/SignupPage';
import LoginPage from './Auth/LoginPage';
import DashboardPage from './Dashboard/DashboardPage';
import RentVehiclePage from './Rent/RentVehiclePage';
import BookingPage from './Booking/BookingPage';
import CarDetail from './Rent/CarDetail';
import RentNow from './Rent/RentNow';
import ReservationPage from './Rent/ReservationPage';
import PaymentPage from './Payment/PaymentPage';
import SettingsPage from './Settings/Settings';
import AdminLogin from './Admin/AdminLogin';  
import AdminPanel from './Admin/AdminPanel';
import CarsDashboard from './Admin/CarsDashboard';
import MotorcyclesDashboard from './Admin/MotorcyclesDashboard';
import UsersDashboard from "./Admin/UsersDashboard";
import ContactUs from './ContactUs/ContactUs';  
import DriverRegistrationPage from './Driver/DriverRegistrationPage';    
import DriverLoginPage from './Driver/DriverLoginPage'; 
import DriverDashboard from './Driver/DriverDashboard';
import HelpPage from './Driver/HelpPage';
import Testimonials from './Dashboard/Testimonials';
import FeedbackForm from './Feedback/FeedbackForm';
import AboutUsPage from './AboutUsPage';
import RentHistory from './History/RentHistory';
import BookingHistory from './History/BookingHistory';
import LandingPage from './LandingPage/LandingPage';  
import ResetPassword from './ResetPassword/ResetPassword';  
import ConfirmationPage from './Rent/ConfirmationPage';
import TermsAndConditionsPage from './TermsAndConditions/TermsAndConditionsPage';
import FareCalculatorPage from './Fare/FareCalculatorPage';

import ProtectedRoute from './ProtectedRoute';

export default function App() {
  return (
    <GoogleOAuthProvider clientId="655397651649-4tgqpa540obk51rdnsq8d8mqaneoln3b.apps.googleusercontent.com">
      <Router>
        <ToastContainer />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/driver-registration" element={<DriverRegistrationPage />} />
          <Route path="/driver-login" element={<DriverLoginPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} /> {/* ✅ Added */}

          {/* Protected User Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/booking" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/rent" element={
            <ProtectedRoute>
              <RentVehiclePage />
            </ProtectedRoute>
          } />
          <Route path="/rent/car-detail" element={
            <ProtectedRoute>
              <CarDetail />
            </ProtectedRoute>
          } />
          <Route path="/rent/rent-now" element={
            <ProtectedRoute>
              <RentNow />
            </ProtectedRoute>
          } />
          <Route path="/rent/reservation" element={
            <ProtectedRoute>
              <ReservationPage />
            </ProtectedRoute>
          } />
          <Route path="/rent/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path="/rent/confirmation" element={
            <ProtectedRoute>
              <ConfirmationPage />
            </ProtectedRoute>
          } />
          <Route path="/rent-history" element={
            <ProtectedRoute>
              <RentHistory />
            </ProtectedRoute>
          } />
          <Route path="/booking-history" element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          } />

          {/* Protected Driver Routes */}
          <Route path="/driver-dashboard" element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin/panel" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/cardashboard" element={
            <ProtectedRoute>
              <CarsDashboard />
            </ProtectedRoute>
          } />
          <Route path="/motordashboard" element={
            <ProtectedRoute>
              <MotorcyclesDashboard />
            </ProtectedRoute>
          } />
          <Route path="/usersdashboard" element={
            <ProtectedRoute>
              <UsersDashboard />
            </ProtectedRoute>
          } />
          <Route path="/fare-calculator" element={
            <ProtectedRoute>
              <FareCalculatorPage />
            </ProtectedRoute>
          } />

          {/* Fallback Route (optional) */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}