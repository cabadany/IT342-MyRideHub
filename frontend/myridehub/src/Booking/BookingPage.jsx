import { useState, useRef, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import MapAutocomplete from "../Map/MapAutocomplete";
import MapPicker from "../Map/MapPicker";
import "./BookingPage.css";

const GOOGLE_MAPS_API_KEY = "AIzaSyDUJsdF6iiOOMsqvpSOaP3tbI1q1-m7hgo";
const BASE_FARE = 20;
const RATE_PER_KM = 10;

const VEHICLES = {
  motorcycles: [
    { id: 1, name: "Honda CRF250", description: "Agility and adventure" },
    { id: 2, name: "Yamaha R1", description: "Sporty and quick" }
  ],
  cars: [
    { id: 1, name: "Toyota Camry", description: "Comfort and convenience" },
    { id: 2, name: "Honda Civic", description: "Reliable and efficient" }
  ]
};

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [distanceText, setDistanceText] = useState("");
  const [durationText, setDurationText] = useState("");
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [selectingField, setSelectingField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rideStatus, setRideStatus] = useState("");

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
    } else if (selectingField === "dropoff") {
      setDropOffLocation(locationText);
    }
    setShowMapPicker(false);
    setSelectingField(null);
  };

  const calculateFare = async () => {
    if (!pickupLocation || !dropOffLocation) return;

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [pickupLocation],
        destinations: [dropOffLocation],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === "OK") {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          const distanceKm = distanceInMeters / 1000;
          const distanceText = response.rows[0].elements[0].distance.text;
          const durationText = response.rows[0].elements[0].duration.text;
          const total = BASE_FARE + RATE_PER_KM * distanceKm;
          setDistanceText(distanceText);
          setDurationText(durationText);
          setTotalPrice(total.toFixed(2));
          handleNextStep();
        } else {
          alert("Error calculating distance: " + status);
        }
      }
    );
  };

  const handleVehicleSelection = (type) => {
    setSelectedType(type);
    setAvailableVehicles(VEHICLES[type.toLowerCase()]);
    handleNextStep();
  };

  const handleConfirmBooking = () => {
    setLoading(true);
    setRideStatus("");

    // Simulate an API call to find a driver
    setTimeout(() => {
      // Simulating a driver found (you can randomly set this in a real-world scenario)
      const driverFound = Math.random() > 0.5; // Randomly decide if a driver is found
      setLoading(false);
      if (driverFound) {
        setRideStatus("We have found you a ride!");
      } else {
        setRideStatus("Sorry, no drivers available at the moment.");
      }
    }, 3000); // Simulate a 3 second API call
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
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/booking" className="nav-link active">Book</a></li>
            <li><a href="/rent" className="nav-link">Rent</a></li>
            <li><a href="/about-us" className="nav-link">About Us</a></li>
            <li><a href="settings" className="nav-link">Settings</a></li>
            <li><a href="/contact-us" className="contact-link">Contact Us</a></li>
          </ul>
        </nav>

        {!showMapPicker && (
          <div className="booking-container">
            {bookingStep === 1 && (
              <div className="booking-form">
                <h2 className="booking-title">BOOK NOW!</h2>
                <div className="form-fields">
                  <MapAutocomplete
                    placeholder="Pickup Location"
                    onPlaceSelected={(place) => setPickupLocation(place.formatted_address)}
                    value={pickupLocation}
                  />
                  <a href="#" onClick={() => { setSelectingField("pickup"); setShowMapPicker(true); }} className="map-select-link">
                    Choose from Maps
                  </a>
                  <button className="continue-btn" onClick={handleNextStep} disabled={!pickupLocation}>
                    Confirm Pick-Up Location
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="booking-form">
                <div className="form-header">
                  <button className="back-btn" onClick={handlePrevStep}><span className="arrow-left-icon"></span></button>
                  <h2 className="booking-title">Where to?</h2>
                </div>
                <div className="form-fields">
                  <MapAutocomplete
                    placeholder="Drop-off Location"
                    onPlaceSelected={(place) => setDropOffLocation(place.formatted_address)}
                    inputRef={dropoffRef}
                    value={dropOffLocation}
                  />
                  <a href="#" onClick={() => { setSelectingField("dropoff"); setShowMapPicker(true); }} className="map-select-link">
                    Choose from Maps
                  </a>
                  <button className="continue-btn" onClick={handleNextStep} disabled={!dropOffLocation}>
                    Confirm Drop-Off Location
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="booking-form">
                <div className="form-header">
                  <button className="back-btn" onClick={handlePrevStep}><span className="arrow-left-icon"></span></button>
                  <h2 className="booking-title">Select Vehicle Type</h2>
                </div>
                <div className="vehicle-options">
                  <div className="vehicle-option" onClick={() => handleVehicleSelection("Motorcycle")}>
                    <div className="vehicle-icon">🏍️</div>
                    <div className="vehicle-details">
                      <h3 className="vehicle-name">Motorcycle</h3>
                      <p className="vehicle-description">For agility and adventure</p>
                    </div>
                  </div>
                  <div className="vehicle-option" onClick={() => handleVehicleSelection("Car")}>
                    <div className="vehicle-icon">🚗</div>
                    <div className="vehicle-details">
                      <h3 className="vehicle-name">Car</h3>
                      <p className="vehicle-description">For comfort and convenience</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 4 && (
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
                    <p className="confirmation-label">Vehicle Type</p>
                    <p className="confirmation-value">{selectedType}</p>
                  </div>
                  <div className="confirmation-item">
                    <p className="confirmation-label">Distance</p>
                    <p className="confirmation-value">{distanceText}</p>
                  </div>
                  <div className="confirmation-item">
                    <p className="confirmation-label">Estimated Duration</p>
                    <p className="confirmation-value">{durationText}</p>
                  </div>
                  <div className="confirmation-item">
                    <p className="confirmation-label">Total Fare</p>
                    <p className="confirmation-value">₱{totalPrice}</p>
                  </div>
                </div>
                <button className="confirm-btn" onClick={handleConfirmBooking}>
                  {loading ? "Loading..." : "Confirm Booking"}
                </button>
                {rideStatus && <p>{rideStatus}</p>}
              </div>
            )}
          </div>
        )}

        {showMapPicker && (
          <div className="map-picker-modal full-overlay">
            <div className="map-modal-content">
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
