import { useEffect, useRef } from "react";

const MapAutocomplete = ({ placeholder, onPlaceSelected, value = "", inputRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.google?.maps?.places?.PlaceAutocompleteElement) {
      console.error("PlaceAutocompleteElement is not available. Make sure Places API is enabled.");
      return;
    }

    const autocomplete = new window.google.maps.places.PlaceAutocompleteElement();
    autocomplete.id = "place-autocomplete";
    autocomplete.placeholder = placeholder;
    autocomplete.setAttribute("autocomplete", "off");

    // Optional: style tweaks
    autocomplete.classList.add("autocomplete-box");

    autocomplete.addEventListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        onPlaceSelected(place);
      } else {
        alert("Please select a valid location from the suggestions.");
      }
    });

    // Clear old and append new autocomplete input
    const container = containerRef.current;
    container.innerHTML = "";
    container.appendChild(autocomplete);

    // Set initial value (if any)
    if (value) autocomplete.value = value;

    return () => {
      autocomplete.remove();
    };
  }, [placeholder, onPlaceSelected, value]);

  return <div ref={containerRef} />;
};

export default MapAutocomplete;