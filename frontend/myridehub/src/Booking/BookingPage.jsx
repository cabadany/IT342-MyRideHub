"use client"

import { useState } from "react"
import "./BookingPage.css"

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1)
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropOffLocation, setDropOffLocation] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [showLocationOptions, setShowLocationOptions] = useState(false)

  const locations = [
    {
      id: 1,
      name: "Asian Seminary",
      address: "N. Bacalso Street, Samboan, Cebu City, Cebu, 6000, Central Visayas Region (VII), Philippines",
    },
    {
      id: 2,
      name: "Cebu Institute of Technology University",
      address:
        "Bldg. N3/N4, N. Bacalso Avenue, Cebu (PH), Cebu City, Cebu, 6000, Central Visayas Region (VII), Philippines",
    },
    {
      id: 3,
      name: "Ayala Center Cebu",
      address:
        "Bldg. N3/N4, N. Bacalso Avenue, Cebu (PH), Cebu City, Cebu, 6000, Central Visayas Region (VII), Philippines",
    },
  ]

  const handleNextStep = () => {
    setBookingStep(bookingStep + 1)
  }

  const handlePrevStep = () => {
    setBookingStep(bookingStep - 1)
  }

  const selectLocation = (location) => {
    if (bookingStep === 1) {
      setPickupLocation(location.name)
    } else if (bookingStep === 2) {
      setDropOffLocation(location.name)
    }
    setShowLocationOptions(false)
    handleNextStep()
  }

  return (
    <div className="booking-page">
      {/* Navigation */}
      <nav className="booking-nav">
        <div className="logo-container">
          <a href="/">
            <img src="/logo.png" alt="Ride Hub Logo" className="logo" />
          </a>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/booking" className="nav-link active">
            Book
          </a>
          <a href="/rent" className="nav-link">
            Rent
          </a>
          <a href="/about-us" className="nav-link">
            About Us
          </a>
          <a href="/contact-us" className="nav-link contact-link">
            Contact Us
          </a>
        </div>
      </nav>

      {/* Booking Container */}
      <div className="booking-container">
        {bookingStep === 1 && (
          <div className="booking-form">
            <h2 className="booking-title">BOOK NOW!</h2>

            <div className="form-fields">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  onClick={() => setShowLocationOptions(true)}
                  className="form-input"
                />
                <span className="input-icon search-icon"></span>
              </div>

              <div className="input-group">
                <input type="text" placeholder="Drop Off" value={dropOffLocation} className="form-input" disabled />
                <span className="input-icon search-icon"></span>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Select your Date"
                  value={selectedDate}
                  className="form-input"
                  disabled
                />
                <span className="input-icon calendar-icon"></span>
                <span className="input-icon-right chevron-icon"></span>
              </div>

              <div className="input-group">
                <input type="text" placeholder="Select Type" value={selectedType} className="form-input" disabled />
                <span className="input-icon clock-icon"></span>
                <span className="input-icon-right chevron-icon"></span>
              </div>
            </div>

            <div className="form-actions">
              <button className="find-vehicle-btn" onClick={handleNextStep}>
                Find a vehicle <span className="chevron-down-icon"></span>
              </button>
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

            <div className="location-list">
              {locations.map((location) => (
                <div key={location.id} className="location-item" onClick={() => selectLocation(location)}>
                  <span className="location-icon"></span>
                  <div className="location-details">
                    <p className="location-name">{location.name}</p>
                    <p className="location-address">{location.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="booking-form">
            <div className="form-header">
              <button className="back-btn" onClick={handlePrevStep}>
                <span className="arrow-left-icon"></span>
              </button>
              <h2 className="booking-title">Current location</h2>
            </div>

            <div className="input-group">
              <input type="text" value={pickupLocation} readOnly className="form-input" />
              <span className="input-icon blue-dot"></span>
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Drop off to?"
                value={dropOffLocation}
                onChange={(e) => setDropOffLocation(e.target.value)}
                onClick={() => setShowLocationOptions(true)}
                className="form-input"
              />
              <span className="input-icon red-dot"></span>
            </div>

            {showLocationOptions && (
              <div className="location-list">
                {locations.map((location) => (
                  <div key={location.id} className="location-item" onClick={() => selectLocation(location)}>
                    <span className="location-icon"></span>
                    <div className="location-details">
                      <p className="location-name">{location.name}</p>
                      <p className="location-address">{location.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {bookingStep === 4 && (
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
                  placeholder="Select Date"
                  className="form-input"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <span className="input-icon calendar-icon"></span>
              </div>

              <div className="input-group">
                <input type="time" placeholder="Select Time" className="form-input" />
                <span className="input-icon clock-icon"></span>
              </div>

              <button className="continue-btn" onClick={() => setBookingStep(5)}>
                Continue
              </button>
            </div>
          </div>
        )}

        {bookingStep === 5 && (
          <div className="booking-form">
            <div className="form-header">
              <button className="back-btn" onClick={handlePrevStep}>
                <span className="arrow-left-icon"></span>
              </button>
              <h2 className="booking-title">Select Vehicle Type</h2>
            </div>

            <div className="vehicle-options">
              <div
                className="vehicle-option"
                onClick={() => {
                  setSelectedType("Motorcycle")
                  handleNextStep()
                }}
              >
                <div className="vehicle-icon motorcycle-icon">🏍️</div>
                <div className="vehicle-details">
                  <h3 className="vehicle-name">Motorcycle</h3>
                  <p className="vehicle-description">For agility and adventure</p>
                </div>
              </div>

              <div
                className="vehicle-option"
                onClick={() => {
                  setSelectedType("Car")
                  handleNextStep()
                }}
              >
                <div className="vehicle-icon car-icon">🚗</div>
                <div className="vehicle-details">
                  <h3 className="vehicle-name">Car</h3>
                  <p className="vehicle-description">For comfort and convenience</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 6 && (
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

      {/* Background Image */}
      <div className="background-image"></div>
    </div>
  )
}

export default BookingPage
