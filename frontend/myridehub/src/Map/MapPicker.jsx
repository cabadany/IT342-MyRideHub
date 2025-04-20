import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "./MapPicker.css"; // optional for styling

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const defaultCenter = {
  lat: 10.3157, // Cebu City default
  lng: 123.8854,
};

const MapPicker = ({ onLocationSelect }) => {
  const navigate = useNavigate();
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDUJsdF6iiOOMsqvpSOaP3tbI1q1-m7hgo",
  });

  const mapRef = useRef(null);
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  const handleConfirm = () => {
    onLocationSelect(markerPosition); // Pass to parent component
    navigate(-1); // Go back to booking page
  };

  return isLoaded ? (
    <div className="map-picker-container">
      {/* Back Button */}
      <button className="map-back-button" onClick={() => navigate(-1)}>← Back</button>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleDragEnd}
        />
      </GoogleMap>

      {/* Confirm Button */}
      <div className="map-confirm-footer">
        <p>Selected Coordinates: <strong>Lat:</strong> {markerPosition.lat.toFixed(5)}, <strong>Lng:</strong> {markerPosition.lng.toFixed(5)}</p>
        <button onClick={handleConfirm} className="confirm-map-btn">
          Confirm Location
        </button>
      </div>
    </div>
  ) : (
    <p>Loading map...</p>
  );
};

export default MapPicker;