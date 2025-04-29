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

const VEHICLES = {
  motorcycles: [
    { id: 1, name: "Honda CRF250", description: "Agility and adventure" },
    { id: 2, name: "Yamaha R1", description: "Sporty and quick" },
  ],
  cars: [
    { id: 1, name: "Toyota Camry", description: "Comfort and convenience" },
    { id: 2, name: "Honda Civic", description: "Reliable and efficient" },
  ],
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

  const handleNextStep = () => setBookingStep((prev) => prev + 1);
  const handleLocationSelect = (coords) => {
    const formatted_address = `Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`;
    const location = { lat: coords.lat, lng: coords.lng, formatted_address };
    if (selectingField === "pickup") {
      setPickupLocation(location);
    } else if (selectingField === "dropoff") {
      setDropOffLocation(location);
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
        status: "Pending",
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
    setDriverInfo(null);
    try {
      await saveBookingToBackend();
      setTimeout(() => {
        const driverFound = Math.random() > 0.3;
        setLoading(false);
        if (driverFound) {
          setRideStatus("Driver found! Please wait at your pickup location.");
          setTimeout(() => navigate("/dashboard"), 3000);
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
              onPlaceSelected={(place) => setPickupLocation({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                formatted_address: place.formatted_address
              })}
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
              onPlaceSelected={(place) => setDropOffLocation({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                formatted_address: place.formatted_address
              })}
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
            <button onClick={() => handleVehicleSelection("motorcycles")}>Motorcycle</button>
            <button onClick={() => handleVehicleSelection("cars")}>Car</button>

            {availableVehicles.length > 0 && (
              <ul>
                {availableVehicles.map(vehicle => (
                  <li key={vehicle.id}>
                    <h4>{vehicle.name}</h4>
                    <p>{vehicle.description}</p>
                  </li>
                ))}
              </ul>
            )}
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