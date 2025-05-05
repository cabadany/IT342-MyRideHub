import { useEffect, useRef } from "react";

const MapAutocomplete = ({ placeholder, onPlaceSelected, value = "", inputRef }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    if (!window.google?.maps?.places?.Autocomplete) {
      console.error("Google Maps Autocomplete is not available.");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(inputEl.current, {
      types: ["geocode"],
      componentRestrictions: { country: "ph" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        onPlaceSelected(place);
      } else {
        alert("Please select a valid location from the suggestions.");
      }
    });

    return () => window.google.maps.event.clearInstanceListeners(autocomplete);
  }, [onPlaceSelected]);

  return (
    <input
      ref={(el) => {
        inputEl.current = el;
        if (inputRef) inputRef.current = el;
      }}
      type="text"
      placeholder={placeholder}
      defaultValue={value}
      className="autocomplete-box"
      style={{
        padding: "10px",
        width: "100%",
        borderRadius: "6px",
        border: "1px solid #ccc",
        color: "black",
      }}
    />
  );
};

export default MapAutocomplete;