import { useState, useRef, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import MapAutocomplete from "../Map/MapAutocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [driverInfo, setDriverInfo] = useState(null);

  const dropoffRef = useRef(null);
  const navigate = useNavigate();

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

  const saveBookingToBackend = async () => {
    try {
      const bookingData = {
        customerName: "Juan Dela Cruz",
        contactNumber: "09123456789",
        vehicle: { id: 1 },
        pickupLocation: pickupLocation?.formatted_address || "Unknown Pickup",
        dropOffLocation: dropOffLocation?.formatted_address || "Unknown Dropoff",
        pickupDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        totalPrice: parseFloat(totalPrice),
        status: "Pending"
      };

      const response = await axios.post("http://localhost:8080/api/bookings", bookingData);
      console.log("Booking saved:", response.data);
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
      await saveBookingToBackend();
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

          // 🎯 Auto redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);

        } else {
          setRideStatus("No drivers available. Try again later.");
        }
      }, 3000);

    } catch (error) {
      setLoading(false);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="booking-page">
        <nav className="booking-nav">
          <div className="logo-container">
            <a href="/dashboard">
              <img src="/Ride Hub Logo (White).png" alt="Ride Hub Logo" className="logo" />
            </a>
          </div>
          <ul className="nav-links">
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/booking" className="nav-link active">Book</a></li>
            <li><a href="/rent">Rent</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </nav>

        <div className="booking-content">
          {!showMapPicker ? (
            <div className="booking-container">
              
              {/* Stepper Progress */}
              <div className="booking-stepper">
                <div className={`step ${bookingStep >= 1 ? "active" : ""}`}>Pickup</div>
                <div className={`step ${bookingStep >= 2 ? "active" : ""}`}>Drop-off</div>
                <div className={`step ${bookingStep >= 3 ? "active" : ""}`}>Vehicle</div>
                <div className={`step ${bookingStep >= 4 ? "active" : ""}`}>Confirm</div>
              </div>

              {/* Booking Steps */}
              {bookingStep === 1 && (
                <div className="booking-form">
                  <h2 className="booking-title">BOOK NOW!</h2>
                  <div className="form-fields">
                    <MapAutocomplete
                      placeholder="Pickup Location"
                      onPlaceSelected={(place) => setPickupLocation({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        formatted_address: place.formatted_address
                      })}
                      value={pickupLocation?.formatted_address || ""}
                    />
                    <a href="#" className="map-select-link" onClick={() => { setSelectingField("pickup"); setShowMapPicker(true); }}>
                      Choose from Maps
                    </a>
                    <button className="continue-btn" onClick={handleNextStep} disabled={!pickupLocation}>
                      Confirm Pickup
                    </button>
                  </div>
                </div>
              )}

              {/* Other steps can continue like you have before... */}
            </div>
          ) : (
            <div className="map-picker-modal">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "90vh" }}
                center={selectedCoords || { lat: 10.3157, lng: 123.8854 }}
                zoom={selectedCoords ? 16 : 13}
                onClick={(e) => setSelectedCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
              >
                {selectedCoords && <Marker position={selectedCoords} />}
              </GoogleMap>
              <div className="map-confirm-footer">
                <button className="confirm-btn" onClick={() => selectedCoords && handleLocationSelect(selectedCoords)}>
                  Confirm Location
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
}