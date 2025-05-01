import { useState, useRef, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import MapAutocomplete from "../Map/MapAutocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_MAPS_API_KEY = "AIzaSyDUJsdF6iiOOMsqvpSOaP3tbI1q1-m7hgo";
const BASE_FARE = 20;
const RATE_PER_KM = 10;

export default function BookingPage() {
  const [bookingStep, setBookingStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [distanceText, setDistanceText] = useState("");
  const [durationText, setDurationText] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [selectingField, setSelectingField] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rideStatus, setRideStatus] = useState("");

  const dropoffRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookingStep === 2 && dropoffRef.current) {
      dropoffRef.current.focus();
    }
  }, [bookingStep]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/vehicles`);
        setAvailableVehicles(response.data || []);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  const handleNextStep = () => setBookingStep((prev) => prev + 1);

  const handleLocationSelect = (coords) => {
    const formatted_address = `Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`;
    const location = { lat: coords.lat, lng: coords.lng, formatted_address };
    if (selectingField === "pickup") setPickupLocation(location);
    else if (selectingField === "dropoff") setDropOffLocation(location);
    setShowMapPicker(false);
    setSelectingField(null);
    setSelectedCoords(null);
  };

  const calculateFare = () => {
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
          const element = response.rows[0].elements[0];
          const distanceInMeters = element.distance.value;
          const distanceKm = distanceInMeters / 1000;
          setDistanceText(element.distance.text);
          setDurationText(element.duration.text);
          const total = BASE_FARE + RATE_PER_KM * distanceKm;
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
    handleNextStep();
  };

  const saveBookingToBackend = async () => {
    try {
      const bookingData = {
        vehicleType: selectedType,
        pickupLocation: pickupLocation?.formatted_address || "Unknown Pickup",
        dropOffLocation: dropOffLocation?.formatted_address || "Unknown Dropoff",
        pickupLat: pickupLocation?.lat,
        pickupLng: pickupLocation?.lng,
        dropOffLat: dropOffLocation?.lat,
        dropOffLng: dropOffLocation?.lng,
        pickupDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        distance: distanceText,
        duration: durationText,
        totalPrice: parseFloat(totalPrice),
        status: "Pending"
      };
      await axios.post(`${API_BASE_URL}/api/bookings`, bookingData);
    } catch (error) {
      console.error("Error saving booking:", error);
      throw error;
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setRideStatus("");
    try {
      await saveBookingToBackend();
      setTimeout(() => {
        const driverFound = Math.random() > 0.3;
        setLoading(false);
        setRideStatus(driverFound
          ? "Driver found! Please wait at your pickup location."
          : "No drivers available. Try again later.");
        if (driverFound) setTimeout(() => navigate("/dashboard"), 3000);
      }, 3000);
    } catch {
      setLoading(false);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="booking-page">
        <div className="logo-top-center">
          <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub" className="dashboard-logo" />
        </div>

        <nav className="main-nav">
          <div className="nav-wrapper">
            <ul className="nav-menu">
              <li><a href="/dashboard">HOME</a></li>
              <li className="dropdown">
                <span>OUR SERVICES ▾</span>
                <ul className="dropdown-menu">
                  <li><a href="/booking">Book a Vehicle</a></li>
                  <li><a href="/rent">Rent a Vehicle</a></li>
                  <li><a href="/fare-calculator">Fare Calculator</a></li>
                  <li><a href="/terms">Terms and Conditions</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <span>JOIN US ▾</span>
                <ul className="dropdown-menu">
                  <li><a href="/be-a-driver">Be a Driver</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <span>CONTACT US ▾</span>
                <ul className="dropdown-menu">
                  <li><a href="/passenger-appeal">Passenger Appeal Form</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <div className="booking-stepper">
          <div className={`step ${bookingStep >= 1 ? "active" : ""}`}>Pickup</div>
          <div className={`step ${bookingStep >= 2 ? "active" : ""}`}>Drop-off</div>
          <div className={`step ${bookingStep >= 3 ? "active" : ""}`}>Vehicle</div>
          <div className={`step ${bookingStep >= 4 ? "active" : ""}`}>Confirm</div>
        </div>

        {bookingStep === 1 && (
          <div className="booking-form">
            <h2>Select Pickup Location</h2>
            <MapAutocomplete
              placeholder="Pickup Location"
              onPlaceSelected={(place) =>
                setPickupLocation({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  formatted_address: place.formatted_address,
                })
              }
              value={pickupLocation?.formatted_address || ""}
            />
            <button onClick={() => { setSelectingField("pickup"); setShowMapPicker(true); }}>Pick from Map</button>
            <button onClick={handleNextStep} disabled={!pickupLocation}>Confirm</button>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="booking-form">
            <h2>Select Drop-off Location</h2>
            <MapAutocomplete
              placeholder="Drop-off Location"
              onPlaceSelected={(place) =>
                setDropOffLocation({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  formatted_address: place.formatted_address,
                })
              }
              value={dropOffLocation?.formatted_address || ""}
              inputRef={dropoffRef}
            />
            <button onClick={() => { setSelectingField("dropoff"); setShowMapPicker(true); }}>Pick from Map</button>
            <button onClick={calculateFare} disabled={!dropOffLocation}>Confirm</button>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="booking-form">
            <h2>Choose Vehicle Type</h2>
            {availableVehicles.length > 0 ? (
              <ul>
                {availableVehicles.map((vehicle) => (
                  <li key={vehicle.id}>
                    <h4>{vehicle.name}</h4>
                    <p>{vehicle.description}</p>
                  </li>
                ))}
              </ul>
            ) : <p>Loading vehicles...</p>}
            <button onClick={() => handleVehicleSelection("cars")}>Next</button>
          </div>
        )}

        {bookingStep === 4 && (
          <div className="booking-form">
            <h2>Confirm Booking</h2>
            <p><strong>Pickup:</strong> {pickupLocation?.formatted_address}</p>
            <p><strong>Drop-off:</strong> {dropOffLocation?.formatted_address}</p>
            <p><strong>Distance:</strong> {distanceText}</p>
            <p><strong>Duration:</strong> {durationText}</p>
            <p><strong>Total Price:</strong> ₱{totalPrice}</p>
            <button onClick={handleConfirmBooking}>Confirm Booking</button>
            {loading && <p>Looking for driver...</p>}
            {rideStatus && <p>{rideStatus}</p>}
          </div>
        )}

        {showMapPicker && (
          <div className="map-picker-modal">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "90vh" }}
              center={selectedCoords || { lat: 10.3157, lng: 123.8854 }}
              zoom={selectedCoords ? 16 : 13}
              onClick={(e) => setSelectedCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
            >
              {selectedCoords && <Marker position={selectedCoords} />}
            </GoogleMap>
            <button onClick={() => selectedCoords && handleLocationSelect(selectedCoords)}>Confirm Location</button>
          </div>
        )}
      </div>
    </LoadScript>
  );
}