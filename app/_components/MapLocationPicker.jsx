"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const MapWithLocationPicker = ({ onLocationChange }) => {
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
    const [selectedLocation, setSelectedLocation] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
    });

    // Fetch current location
    const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = { lat: latitude, lng: longitude };
                    setCurrentLocation(location);
                    setSelectedLocation(location); // Default to current location
                    onLocationChange(location); // Notify parent component
                },
                (error) => console.error("Error fetching location:", error)
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        fetchCurrentLocation();
    }, []);

    // Handle marker drag or map click to select location
    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const location = { lat, lng };
        setSelectedLocation(location);
        onLocationChange(location);
    };

    if (!isLoaded) return <p>Loading...</p>;

    return (
        <div style={{ height: "450px", width: "100%", position: "relative" }}>
            <GoogleMap
                center={selectedLocation || currentLocation}
                zoom={14}
                mapContainerStyle={{ height: "100%", width: "100%" }}
                onClick={handleMapClick}
            >
                {selectedLocation && (
                    <Marker
                        position={selectedLocation}
                        draggable={true}
                        onDragEnd={(event) =>
                            handleMapClick({
                                latLng: event.latLng,
                            })
                        }
                    />
                )}
            </GoogleMap>

            {/* Button to fetch current location */}
            <button
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 10,
                    padding: "10px 15px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                onClick={fetchCurrentLocation}
            >
                Get Current Location
            </button>
        </div>
    );
};

export default MapWithLocationPicker;
