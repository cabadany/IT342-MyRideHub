import { useState, useRef, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookingPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY_HERE"; // replace with a secure key
const BASE_FARE = 20;
const RATE_PER_KM = 10;
const libraries = ["places"];

export default function BookingPage() {
  const [bookingStep, setBookingStep] = useState(1);
  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
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

  const navigate = useNavigate();
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/vehicles`);
        setAvailableVehicles(res.data || []);
      } catch (err) {
        console.error("Vehicle fetch failed:", err);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (bookingStep === 2 && dropoffRef.current) dropoffRef.current.focus();
  }, [bookingStep]);

  useEffect(() => {
    const initAutocomplete = (inputEl, setLocation, field) => {
      if (!inputEl || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputEl);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            formatted_address: place.formatted_address || place.name
          };
          setLocation(location);
          toast.success(`${field === "pickup" ? "Pickup" : "Drop-off"} location selected!`);
        }
      });
    };

    initAutocomplete(pickupRef.current, setPickupLocation, "pickup");
    initAutocomplete(dropoffRef.current, setDropOffLocation, "dropoff");
  }, []);

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
          const el = response.rows[0].elements[0];
          const distanceKm = el.distance.value / 1000;
          setDistanceText(el.distance.text);
          setDurationText(el.duration.text);
          const total = Math.round(BASE_FARE + RATE_PER_KM * distanceKm);
          setTotalPrice(total);
          setBookingStep(3);
        } else {
          alert("Failed to get distance.");
        }
      }
    );
  };

  const saveBooking = async () => {
    try {
      const bookingData = {
        vehicleType: selectedType,
        pickupLocation: pickupLocation?.formatted_address || "Unknown",
        dropOffLocation: dropOffLocation?.formatted_address || "Unknown",
        pickupLat: pickupLocation?.lat,
        pickupLng: pickupLocation?.lng,
        dropOffLat: dropOffLocation?.lat,
        dropOffLng: dropOffLocation?.lng,
        pickupDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 7200000).toISOString(),
        distance: distanceText,
        duration: durationText,
        totalPrice,
        status: "Pending"
      };
      await axios.post(`${API_BASE_URL}/api/bookings`, bookingData);
    } catch (e) {
      toast.error("Booking failed.");
      throw e;
    }
  };

  const confirmBooking = async () => {
    setLoading(true);
    try {
      await saveBooking();
      setTimeout(() => {
        const driverFound = Math.random() > 0.3;
        setLoading(false);
        setRideStatus(driverFound
          ? "Driver found! Please wait at your pickup location."
          : "No drivers available at the moment.");
        if (driverFound) setTimeout(() => navigate("/dashboard"), 3000);
      }, 2500);
    } catch {
      setLoading(false);
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="booking-page">
        <ToastContainer />
        <div className="logo-top-center">
          <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub" className="dashboard-logo" />
        </div>

        {/* Navbar */}
        <nav className="main-nav">
          <div className="nav-wrapper">
            <ul className="nav-menu">
              <li><Link to="/dashboard">HOME</Link></li>
              <li className="dropdown-container">
                <span>OUR SERVICES ▾</span>
                <ul className="dropdown-menu">
                  <li><Link to="/booking">Book a Vehicle</Link></li>
                  <li><Link to="/rent">Rent a Vehicle</Link></li>
                  <li><Link to="/fare-calculator">Fare Calculator</Link></li>
                  <li><Link to="/terms">Terms</Link></li>
                </ul>
              </li>
              <li className="dropdown-container">
                <span>HISTORY ▾</span>
                <ul className="dropdown-menu">
                  <li><Link to="/rent-history">Rent History</Link></li>
                  <li><Link to="/book-history">Book History</Link></li>
                </ul>
              </li>
              <li className="dropdown-container">
                <span>JOIN US ▾</span>
                <ul className="dropdown-menu">
                  <li><Link to="/be-a-driver">Be a Driver</Link></li>
                </ul>
              </li>
              <li className="dropdown-container">
                <span>CONTACT US ▾</span>
                <ul className="dropdown-menu">
                  <li><Link to="/contact-us">Passenger Appeal Form</Link></li>
                </ul>
              </li>
              <li><Link to="/settings">SETTINGS</Link></li>
            </ul>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
        </nav>

        <div className="divider-line" />

        <div className="booking-stepper">
          <div className={`step ${bookingStep >= 1 ? "active" : ""}`}>Pickup</div>
          <div className={`step ${bookingStep >= 2 ? "active" : ""}`}>Drop-off</div>
          <div className={`step ${bookingStep >= 3 ? "active" : ""}`}>Vehicle</div>
          <div className={`step ${bookingStep >= 4 ? "active" : ""}`}>Confirm</div>
        </div>

        {bookingStep === 1 && (
          <div className="booking-form">
            <h2>Select Pickup Location</h2>
            <input
              ref={pickupRef}
              value={pickupInput}
              onChange={(e) => setPickupInput(e.target.value)}
              placeholder="Type or select pickup location"
              className="location-input"
              style={{ color: "#000" }}
            />
            <button onClick={() => setBookingStep(2)} disabled={!pickupLocation}>Next</button>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="booking-form">
            <h2>Select Drop-off Location</h2>
            <input
              ref={dropoffRef}
              value={dropoffInput}
              onChange={(e) => setDropoffInput(e.target.value)}
              placeholder="Type or select drop-off location"
              className="location-input"
              style={{ color: "#000" }}
            />
            <button onClick={calculateFare} disabled={!dropOffLocation}>Next</button>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="booking-form">
            <h2>Choose Vehicle</h2>
            <ul>
              {availableVehicles.map((vehicle) => (
                <li key={vehicle.id}>
                  <h4>{vehicle.name}</h4>
                  <p>{vehicle.description}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => setBookingStep(4)}>Next</button>
          </div>
        )}

        {bookingStep === 4 && (
          <div className="booking-form">
            <h2>Confirm</h2>
            <p><strong>Pickup:</strong> {pickupLocation?.formatted_address}</p>
            <p><strong>Drop-off:</strong> {dropOffLocation?.formatted_address}</p>
            <p><strong>Distance:</strong> {distanceText}</p>
            <p><strong>Duration:</strong> {durationText}</p>
            <p><strong>Fare:</strong> ₱{totalPrice}</p>
            <button onClick={confirmBooking}>Confirm Booking</button>
            {loading && <p>Finding driver...</p>}
            {rideStatus && <p>{rideStatus}</p>}
          </div>
        )}
      </div>
    </LoadScript>
  );
}