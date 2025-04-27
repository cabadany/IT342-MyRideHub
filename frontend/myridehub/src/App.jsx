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
import PaymentPage from './Rent/Payment';
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




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/rent" element={<RentVehiclePage />} />
        <Route path="/rent/car-detail" element={<CarDetail />} />
        <Route path="/rent/rent-now" element={<RentNow />} />
        <Route path="/rent/reservation" element={<ReservationPage />} />
        <Route path="/rent/payment" element={<PaymentPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />  
        <Route path="/cardashboard" element={<CarsDashboard />} />  
        <Route path="/motordashboard" element={<MotorcyclesDashboard />} />
        <Route path="/usersdashboard" element={<UsersDashboard />} />  
        <Route path="/contact-us" element={<ContactUs />} />  
        <Route path="/driver-registration" element={<DriverRegistrationPage />} />
        <Route path="/driver-login" element={<DriverLoginPage />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/feedback" element={<FeedbackForm />} /> 
        <Route path="/about-us" element={<AboutUsPage />} /> 
        <Route path="/rent-history" element={<RentHistory />} /> 
        <Route path="/booking-history" element={<BookingHistory />} />  
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/reset-password" element={<ResetPassword />} />  


        {/* Add other routes here */} 
 
      </Routes>
    </Router>
  );
}