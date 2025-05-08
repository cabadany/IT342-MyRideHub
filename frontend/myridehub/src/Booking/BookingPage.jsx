import { useState, useRef, useEffect } from "react";
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookingPage.css";

const API_BASE_URL = "https://it342-myridehub.onrender.com";
const GOOGLE_MAPS_API_KEY = "AIzaSyDUJsdF6iiOOMsqvpSOaP3tbI1q1-m7hgo";
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
  const [customerName, setCustomerName] = useState(""); 
  const [contactNumber, setContactNumber] = useState(""); 
  const [distanceText, setDistanceText] = useState("");
  const [durationText, setDurationText] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [selectingField, setSelectingField] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 14.5995, lng: 120.9842 });
  const [loading, setLoading] = useState(false);
  const [rideStatus, setRideStatus] = useState("");
  const [showDriverEnRoute, setShowDriverEnRoute] = useState(false);
  const [driverPosition, setDriverPosition] = useState(null);

  const navigate = useNavigate();
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

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

  useEffect(() => {
    if (showMapPicker && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setMapCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.warn("Geolocation not allowed or failed")
      );
    }
  }, [showMapPicker]);

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

  const confirmBooking = async () => {
    setLoading(true);
    try {
      const driverRes = await axios.get(`${API_BASE_URL}/api/drivers/available`);
      const driver = driverRes.data;
      if (!driver) {
        toast.error("No available drivers at the moment.");
        return;
      }
  
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
        status: "Pending",
        driverId: driver.id,
        customerName,
        contactNumber
      };
  
      await axios.post(`${API_BASE_URL}/api/bookings`, bookingData);
  
      const getNearbyPoint = (lat, lng, offset = 0.002) => {
        const randomOffset = () => (Math.random() - 0.5) * offset;
        return {
          lat: lat + randomOffset(),
          lng: lng + randomOffset()
        };
      };
  
      const startCoords = getNearbyPoint(pickupLocation.lat, pickupLocation.lng, 0.004);
      const endCoords = { lat: pickupLocation.lat, lng: pickupLocation.lng };
  
      setDriverPosition(startCoords);
      setShowDriverEnRoute(true);
      setRideStatus("Driver is nearby and on the way...");
      setBookingStep(5);
  
      const steps = 30;
      const interval = 300;
      let step = 0;
      const moveInterval = setInterval(() => {
        if (step >= steps) {
          clearInterval(moveInterval);
          setRideStatus("Driver has arrived!");
          toast.success("Driver has arrived at your location!");
          return;
        }
  
        const lat = startCoords.lat + ((endCoords.lat - startCoords.lat) * step) / steps;
        const lng = startCoords.lng + ((endCoords.lng - startCoords.lng) * step) / steps;
        setDriverPosition({ lat, lng });
        step++;
      }, interval);
  
    } catch (e) {
      toast.error("Booking failed.");
      console.error(e);
    } finally {
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

        {/* Stepper */}
        <div className="booking-stepper">
          <div className={`step ${bookingStep >= 1 ? "active" : ""}`}>Pickup</div>
          <div className={`step ${bookingStep >= 2 ? "active" : ""}`}>Drop-off</div>
          <div className={`step ${bookingStep >= 3 ? "active" : ""}`}>Vehicle</div>
          <div className={`step ${bookingStep >= 4 ? "active" : ""}`}>Confirm</div>
          <div className={`step ${bookingStep >= 5 ? "active" : ""}`}>Tracking</div>
        </div>

        {/* Step 1: Pickup */}
        {bookingStep === 1 && (
          <div className="booking-form">
            <h2>Select Pickup Location</h2>
            <div className="input-with-map">
              <input
                ref={pickupRef}
                value={pickupInput}
                onChange={(e) => setPickupInput(e.target.value)}
                placeholder="Type or select pickup location"
                className="location-input"
                style={{ color: "#000" }}
              />
              <button
                type="button"
                className="map-select-btn"
                onClick={() => {
                  setShowMapPicker(true);
                  setSelectingField("pickup");
                }}
              >
                Choose from Map
              </button>
            </div>
            <button onClick={() => setBookingStep(2)} disabled={!pickupLocation}>Next</button>
          </div>
        )}

        {/* Step 2: Drop-off */}
        {bookingStep === 2 && (
          <div className="booking-form">
            <h2>Select Drop-off Location</h2>
            <div className="input-with-map">
              <input
                ref={dropoffRef}
                value={dropoffInput}
                onChange={(e) => setDropoffInput(e.target.value)}
                placeholder="Type or select drop-off location"
                className="location-input"
                style={{ color: "#000" }}
              />
              <button
                type="button"
                className="map-select-btn"
                onClick={() => {
                  setShowMapPicker(true);
                  setSelectingField("dropoff");
                }}
              >
                Choose from Map
              </button>
            </div>
            <button onClick={calculateFare} disabled={!dropOffLocation}>Next</button>
          </div>
        )}

        {/* Step 3: Vehicle */}
        {bookingStep === 3 && (
          <div className="booking-form">
            <h2>Choose Vehicle Type</h2>
            <div className="vehicle-type-selector">
              <label>
                <input
                  type="radio"
                  name="vehicleType"
                  value="Motorcycle"
                  checked={selectedType === "Motorcycle"}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                Motorcycle
              </label>
              <label style={{ marginLeft: '20px' }}>
                <input
                  type="radio"
                  name="vehicleType"
                  value="Car"
                  checked={selectedType === "Car"}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                Car
              </label>
            </div>
            <button onClick={() => setBookingStep(4)} disabled={!selectedType}>Next</button>
          </div>
        )}

        {/* Step 4: Confirm */}
        {bookingStep === 4 && (
          <div className="booking-form">
            <h2>Confirm</h2>
              <p><strong>Pickup:</strong> {pickupLocation?.formatted_address}</p>
              <p><strong>Drop-off:</strong> {dropOffLocation?.formatted_address}</p>
              <p><strong>Distance:</strong> {distanceText}</p>
              <p><strong>Duration:</strong> {durationText}</p>
              <p><strong>Fare:</strong> ₱{totalPrice}</p>
              
            <input
              type="text"
              placeholder="Your Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="location-input"
              style={{ marginTop: "10px", color: "#000" }}
            />
            <input
              type="text"
              placeholder="Your Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="location-input"
              style={{ marginTop: "10px", color: "#000" }}
            />
            
            <button onClick={confirmBooking} disabled={!customerName || !contactNumber}>
              Confirm Booking
            </button>
            {loading && <p>Finding driver...</p>}
            {rideStatus && <p>{rideStatus}</p>}
            </div>
          )}

{bookingStep === 5 && driverPosition && pickupLocation && (
  <div className="booking-form">
    <h2>Live Driver Tracking</h2>
    <p>{rideStatus}</p>
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={driverPosition}
      zoom={15}
    >
      <Marker position={driverPosition}>
        <InfoWindow position={driverPosition}>
          <div style={{ fontSize: "14px" }}>Driver is coming</div>
        </InfoWindow>
      </Marker>
      <Marker
        position={pickupLocation}
        icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      >
        <InfoWindow position={pickupLocation}>
          <div style={{ fontSize: "14px" }}>Your Pickup Point</div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
)}
  
        {/* Google Maps Picker */}
        {showMapPicker && (
          <div className="map-picker-overlay">
            <div className="map-picker-modal">
              <h3>Select {selectingField === "pickup" ? "Pickup" : "Drop-off"} Location</h3>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "300px" }}
                center={selectedCoords || mapCenter}
                zoom={14}
                onClick={(e) => {
                  const coords = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };
                  setSelectedCoords(coords);
                  const geocoder = new window.google.maps.Geocoder();
                  geocoder.geocode({ location: coords }, (results, status) => {
                    if (status === "OK" && results[0]) {
                      setSelectedAddress(results[0].formatted_address);
                    }
                  });
                }}
              >
                {selectedCoords && (
                  <Marker position={selectedCoords}>
                    <InfoWindow position={selectedCoords}>
                      <div style={{ fontSize: "14px" }}>{selectedAddress || "Selected Location"}</div>
                    </InfoWindow>
                  </Marker>
                )}
              </GoogleMap>
              <div className="map-picker-actions">
                <p style={{ marginTop: "10px" }}><strong>Selected Address:</strong> {selectedAddress}</p>
                <button
                  onClick={() => {
                    if (!selectedCoords || !selectedAddress) return toast.error("Please choose a location.");
                    const finalLocation = {
                      lat: selectedCoords.lat,
                      lng: selectedCoords.lng,
                      formatted_address: selectedAddress,
                    };
                    if (selectingField === "pickup") {
                      setPickupLocation(finalLocation);
                      setPickupInput(finalLocation.formatted_address);
                    } else {
                      setDropOffLocation(finalLocation);
                      setDropoffInput(finalLocation.formatted_address);
                    }
                    setShowMapPicker(false);
                    setSelectedCoords(null);
                    toast.success("Location selected from map!");
                  }}
                >
                  Confirm
                </button>
                <button onClick={() => setShowMapPicker(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
}