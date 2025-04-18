import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 10.3157, // Default to Cebu City
  lng: 123.8854,
};

const MapPicker = ({ onLocationSelect, initialPosition = center }) => {
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDUJsdF6iiOOMsqvpSOaP3tbI1q1-m7hgo"
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

  const handleSelect = () => {
    onLocationSelect(markerPosition);
  };

  return isLoaded ? (
    <div>
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
      <div style={{ marginTop: "16px" }}>
        <p><strong>Lat:</strong> {markerPosition.lat}</p>
        <p><strong>Lng:</strong> {markerPosition.lng}</p>
        <button onClick={handleSelect} style={{ marginTop: "8px", padding: "10px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Confirm Location
        </button>
      </div>
    </div>
  ) : <p>Loading map...</p>;
};

export default MapPicker;