// BookingPage.jsx

import { useState, useRef, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import MapAutocomplete from "../Map/MapAutocomplete";
import MapPicker from "../Map/MapPicker";
import "./BookingPage.css";

const GOOGLE_MAPS_API_KEY = "AIzaSyDUJsdF6iiOOMsqvpSOaP3tbI1q1-m7hgo";

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [showMapPicker, setShowMapPicker] = useState(false);
  const [selectingField, setSelectingField] = useState(null); // 'pickup' or 'dropoff'

  const dropoffRef = useRef(null);

  useEffect(() => {
    if (bookingStep === 2 && dropoffRef.current) {
      dropoffRef.current.focus();
    }
  }, [bookingStep]);

  const handleNextStep = () => setBookingStep((prev) => prev + 1);
  const handlePrevStep = () => setBookingStep((prev) => prev - 1);

  const handleLocationSelect = (coords) => {
    const locationText = `Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`;
    if (selectingField === "pickup") {
      setPickupLocation(locationText);
      setBookingStep(2);
    } else if (selectingField === "dropoff") {
      setDropOffLocation(locationText);
      setBookingStep(3);
    }
    setShowMapPicker(false);
    setSelectingField(null);
    handleNextStep();
    setSelectingField(null);
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="booking-page">
        <nav className="booking-nav">
          <div className="logo-container">
            <a href="/">
              <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" className="logo" />
            </a>
          </div>
          <ul className="nav-links">
            <li><a href="/dashboard" className="nav-link">Home</a></li>
            <li><a href="/booking" className="nav-link active">Book</a></li>
            <li><a href="/rent" className="nav-link">Rent</a></li>
            <li><a href="/about-us" className="nav-link">About Us</a></li>
            <li><a href="#" className="nav-link">Settings</a></li>
            <li><a href="/contact-us" className="contact-link">Contact Us</a></li>
          </ul>
        </nav>

        {!showMapPicker && (
          <div className="booking-container">
            {bookingStep === 1 && (
              <div className="booking-form">
                <h2 className="booking-title">BOOK NOW!</h2>
                <div className="form-fields">
                  <input
                    type="text"
                    value={pickupLocation}
                    readOnly
                    placeholder="Pickup Location"
                    className="form-input"
                  />
                  <a
                    href="#"
                    onClick={() => {
                      setSelectingField("pickup");
                      setShowMapPicker(true);
                    }}
                    className="map-select-link"
                  >
                    Choose from Maps
                  </a>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="booking-form">
                <div className="form-header">
                  <button className="back-btn" onClick={handlePrevStep}>
                    <span className="arrow-left-icon"></span>
                  </button>
                  <h2 className="booking-title">Where to?</h2>
                </div>
                <div className="form-fields">
                  <input
                    type="text"
                    value={dropOffLocation}
                    readOnly
                    placeholder="Drop-off Location"
                    className="form-input"
                    ref={dropoffRef}
                  />
                  <a
                    href="#"
                    onClick={() => {
                      setSelectingField("dropoff");
                      setShowMapPicker(true);
                    }}
                    className="map-select-link"
                  >
                    Choose from Maps
                  </a>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="booking-form">
                <div className="form-header">
                  <button className="back-btn" onClick={handlePrevStep}>
                    <span className="arrow-left-icon"></span>
                  </button>
                  <h2 className="booking-title">Select Date & Time</h2>
                </div>
                <div className="form-fields">
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-input"
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <span className="input-icon calendar-icon"></span>
                  </div>
                  <div className="input-group">
                    <input type="time" className="form-input" />
                    <span className="input-icon clock-icon"></span>
                  </div>
                  <button className="continue-btn" onClick={handleNextStep}>Continue</button>
                </div>
              </div>
            )}

            {bookingStep === 4 && (
              <div className="booking-form">
                <div className="form-header">
                  <button className="back-btn" onClick={handlePrevStep}>
                    <span className="arrow-left-icon"></span>
                  </button>
                  <h2 className="booking-title">Select Vehicle Type</h2>
                </div>
                <div className="vehicle-options">
                  <div className="vehicle-option" onClick={() => { setSelectedType("Motorcycle"); handleNextStep(); }}>
                    <div className="vehicle-icon">🏍️</div>
                    <div className="vehicle-details">
                      <h3 className="vehicle-name">Motorcycle</h3>
                      <p className="vehicle-description">For agility and adventure</p>
                    </div>
                  </div>
                  <div className="vehicle-option" onClick={() => { setSelectedType("Car"); handleNextStep(); }}>
                    <div className="vehicle-icon">🚗</div>
                    <div className="vehicle-details">
                      <h3 className="vehicle-name">Car</h3>
                      <p className="vehicle-description">For comfort and convenience</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 5 && (
              <div className="booking-form">
                <h2 className="booking-title">Booking Confirmation</h2>
                <div className="confirmation-details">
                  <div className="confirmation-item">
                    <p className="confirmation-label">Pickup Location</p>
                    <p className="confirmation-value">{pickupLocation}</p>
                  </div>
                  <div className="confirmation-item">
                    <p className="confirmation-label">Drop-off Location</p>
                    <p className="confirmation-value">{dropOffLocation}</p>
                  </div>
                  <div className="confirmation-item">
                    <p className="confirmation-label">Date</p>
                    <p className="confirmation-value">{selectedDate}</p>
                  </div>
                  <div className="confirmation-item">
                    <p className="confirmation-label">Vehicle Type</p>
                    <p className="confirmation-value">{selectedType}</p>
                  </div>
                </div>
                <button className="confirm-btn" onClick={() => alert("Booking confirmed!")}>
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        )}

        {showMapPicker && (
          <div className="map-picker-modal full-overlay">
            <div className="map-modal-content">
              <button
                onClick={() => setShowMapPicker(false)}
                style={{ backgroundColor: "#ccc", border: "none", padding: "10px", borderRadius: "4px", cursor: "pointer", marginBottom: "10px" }}
              >
                ← Back
              </button>
              <MapPicker onLocationSelect={handleLocationSelect} />
            </div>
          </div>
        )}

        <div className="background-image"></div>
      </div>
    </LoadScript>
  );
};

export default BookingPage;