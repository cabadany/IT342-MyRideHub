import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const MapAutocomplete = ({ onPlaceSelected, placeholder, inputRef }) => {
  const autocompleteRef = useRef(null);

  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        onPlaceSelected(place);
      }
    }
  };

  return (
    <div className="input-group">
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="form-input"
          style={{
            backgroundColor: "#444",
            color: "white",
            border: "1px solid #555",
            padding: "12px 36px",
            width: "100%",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
      </Autocomplete>
      <span className="input-icon search-icon"></span>
    </div>
  );
};

export default MapAutocomplete;