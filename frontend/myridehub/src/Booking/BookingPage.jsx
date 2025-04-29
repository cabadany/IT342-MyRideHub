import { useState, useRef, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import MapAutocomplete from "../Map/MapAutocomplete";
import axios from "axios";
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
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [distanceText, setDistanceText] = useState("");
  const [durationText, setDurationText] = useState("");
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [selectingField, setSelectingField] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rideStatus, setRideStatus] = useState("");
  const [driverInfo, setDriverInfo] = useState(null);

  const dropoffRef = useRef(null);

  useEffect(() => {
    if (bookingStep === 2 && dropoffRef.current) {
      dropoffRef.current.focus();
    }
  }, [bookingStep]);

  const handleNextStep = () => setBookingStep(prev => prev + 1);
  const handlePrevStep = () => setBookingStep(prev => prev - 1);

  const handleLocationSelect = (coords) => {
    if (selectingField === "pickup") {
      setPickupLocation({
        lat: coords.lat,
        lng: coords.lng,
        formatted_address: `Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`
      });
    } else if (selectingField === "dropoff") {
      setDropOffLocation({
        lat: coords.lat,
        lng: coords.lng,
        formatted_address: `Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`
      });
    }
    setShowMapPicker(false);
    setSelectingField(null);
    setSelectedCoords(null);
  };

  const calculateFare = async () => {
    if (!pickupLocation || !dropOffLocation) return;

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [new window.google.maps.LatLng(pickupLocation.lat, pickupLocation.lng)],
        destinations: [new window.google.maps.LatLng(dropOffLocation.lat, dropOffLocation.lng)],
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

  // ✅ Corrected: Save Booking to Backend with Full Fields
  const saveBookingToBackend = async () => {
    try {
      const bookingData = {
        customerName: "Juan Dela Cruz",
        contactNumber: "09123456789",
        vehicle: { id: 1 },  // You can dynamically set based on selected vehicle
        pickupLocation: pickupLocation ? pickupLocation.formatted_address : "Unknown Pickup",
        dropOffLocation: dropOffLocation ? dropOffLocation.formatted_address : "Unknown Dropoff",
        pickupDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // +2 hours
        totalPrice: totalPrice ? parseFloat(totalPrice) : 0,
        status: "Pending"
      };

      const response = await axios.post("http://localhost:8080/api/bookings", bookingData);

      console.log("Booking saved successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving booking:", error);
      throw error;
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setRideStatus("");
    setDriverInfo(null);

    try {
      await saveBookingToBackend(); // ✅ Save booking with full fields

      setTimeout(() => {
        const driverFound = Math.random() > 0.3;
        setLoading(false);

        if (driverFound) {
          const driver = {
            name: "Juan Dela Cruz",
            vehicle: selectedType,
            plateNumber: selectedType === "Motorcycle" ? "MC-1234" : "CAR-5678",
            estimatedArrival: "5 minutes",
          };
          setDriverInfo(driver);
          setRideStatus("Driver found! Please wait at your pickup location.");
        } else {
          setRideStatus("Sorry, no drivers available at the moment. Please try again later.");
        }
      }, 3000);

    } catch (error) {
      setLoading(false);
      alert("Failed to save booking. Please try again later.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="booking-page">
        {/* Navigation */}
        <nav className="booking-nav">
          <div className="logo-container">
            <a href="/dashboard">
              <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" className="logo" />
            </a>
          </div>
          <ul className="nav-links">
            <li><a href="/dashboard" className="nav-link">Home</a></li>
            <li><a href="/booking" className="nav-link active">Book</a></li>
            <li><a href="/rent" className="nav-link">Rent</a></li>
            <li><a href="/about-us" className="nav-link">About Us</a></li>
            <li><a href="/settings" className="nav-link">Settings</a></li>
            <li><a href="/contact-us" className="contact-link">Contact Us</a></li>
          </ul>
        </nav>

        {/* Booking Content */}
        <div className="booking-content">
          {!showMapPicker ? (
            <div className="booking-container">
              {/* Step 1: Pickup Location */}
              {bookingStep === 1 && (
                <div className="booking-form">
                  <h2 className="booking-title">BOOK NOW!</h2>
                  <div className="form-fields">
                    <MapAutocomplete
                      placeholder="Pickup Location"
                      onPlaceSelected={(place) => setPickupLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), formatted_address: place.formatted_address })}
                      value={pickupLocation ? pickupLocation.formatted_address : ""}
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

              {/* Step 2: Drop-off Location */}
              {bookingStep === 2 && (
                <div className="booking-form">
                  <div className="form-header">
                    <button className="back-btn" onClick={handlePrevStep}><span className="arrow-left-icon"></span></button>
                    <h2 className="booking-title">Where to?</h2>
                  </div>
                  <div className="form-fields">
                    <MapAutocomplete
                      placeholder="Drop-off Location"
                      onPlaceSelected={(place) => setDropOffLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), formatted_address: place.formatted_address })}
                      inputRef={dropoffRef}
                      value={dropOffLocation ? dropOffLocation.formatted_address : ""}
                    />
                    <a href="#" onClick={() => { setSelectingField("dropoff"); setShowMapPicker(true); }} className="map-select-link">
                      Choose from Maps
                    </a>
                    <button className="continue-btn" onClick={calculateFare} disabled={!dropOffLocation}>
                      Calculate Fare
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Select Vehicle Type */}
              {bookingStep === 3 && (
                <div className="booking-form">
                  <div className="form-header">
                    <button className="back-btn" onClick={handlePrevStep}><span className="arrow-left-icon"></span></button>
                    <h2 className="booking-title">Select Vehicle Type</h2>
                  </div>
                  <div className="vehicle-options">
                    <div className="vehicle-option" onClick={() => handleVehicleSelection("Motorcycle")}>🏍️ Motorcycle</div>
                    <div className="vehicle-option" onClick={() => handleVehicleSelection("Car")}>🚗 Car</div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm Booking */}
              {bookingStep === 4 && (
                <div className="booking-form">
                  <h2 className="booking-title">Booking Confirmation</h2>
                  <div className="confirmation-details">
                    <p>Pickup: {pickupLocation?.formatted_address}</p>
                    <p>Dropoff: {dropOffLocation?.formatted_address}</p>
                    <p>Vehicle: {selectedType}</p>
                    <p>Distance: {distanceText}</p>
                    <p>Duration: {durationText}</p>
                    <p>Fare: ₱{totalPrice}</p>
                  </div>
                  <button className="confirm-btn" onClick={handleConfirmBooking}>
                    {loading ? "Loading..." : "Confirm Booking"}
                  </button>

                  {loading && <p>Searching for drivers...</p>}

                  {!loading && driverInfo && (
                    <div className="driver-info">
                      <h3>Driver Details</h3>
                      <p><strong>Name:</strong> {driverInfo.name}</p>
                      <p><strong>Vehicle:</strong> {driverInfo.vehicle}</p>
                      <p><strong>Plate:</strong> {driverInfo.plateNumber}</p>
                      <p><strong>ETA:</strong> {driverInfo.estimatedArrival}</p>
                    </div>
                  )}

                  {!loading && rideStatus && <p>{rideStatus}</p>}
                </div>
              )}
            </div>
          ) : (
            <div className="map-picker-modal">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100vh' }}
                center={selectedCoords || { lat: 10.3157, lng: 123.8854 }}
                zoom={13}
                onClick={(e) => setSelectedCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
              >
                {selectedCoords && <Marker position={selectedCoords} />}
              </GoogleMap>
              <div className="map-confirm-footer">
                <button className="confirm-btn" onClick={() => {
                  if (selectedCoords) {
                    handleLocationSelect(selectedCoords);
                  }
                }}>
                  Confirm Location
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default BookingPage;