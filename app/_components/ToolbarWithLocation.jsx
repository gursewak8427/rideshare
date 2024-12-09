'use client'

import React, { useState, useEffect } from "react"
import { useLoadScript } from "@react-google-maps/api"
import { MapPin, Map } from 'lucide-react'
import MapModal from './MapModal'
import { getLocalStorage, setLocalStorage } from "@/lib/utils"

const libraries = ["places"]; // Move outside the component

const ToolbarWithLocation = ({ onLocationChange, isSave = true }) => {
    const [currentLocation, setCurrentLocation] = useState(null)
    const [address, setAddress] = useState("")
    const [isMapModalOpen, setIsMapModalOpen] = useState(false)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              const newPosition = { lat: latitude, lng: longitude }
              getAddressFromLatLng(newPosition)
            },
            (error) => {
              console.error("Error fetching location:", error.message)
            }
          )
        } else {
          console.error("Geolocation is not supported by this browser.")
        }
      }

    const getAddressFromLatLng = async (location) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            )
            const data = await response.json()
            if (data.results.length > 0) {
                const formattedAddress = data.results[0].formatted_address
                setAddress(formattedAddress)
                if (onLocationChange) onLocationChange(location)
            } else {
                setAddress("Unknown Location")
            }
        } catch (error) {
            console.error("Error fetching address:", error.message)
        }
    }

    const handleMapSelect = async (location, address) => {
        console.log({ address })
        setCurrentLocation(location)
        setAddress(address)
        if (isSave)
            setLocalStorage("userLocation", JSON.stringify(location))
        setIsMapModalOpen(false)
        if (onLocationChange) onLocationChange(location)
    }

    useEffect(() => {
        const savedLocation = getLocalStorage("userLocation")
        if (savedLocation) {
            const location = JSON.parse(savedLocation)
            setCurrentLocation(location)
            getAddressFromLatLng(location)
        }else{
            fetchCurrentLocation()
        }
    }, [])

    if (!isLoaded) return <p className="text-center py-4">Loading...</p>

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-2 w-full mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-grow">
                        {/* <MapPin className="text-blue-500 w-10 h-10" /> */}
                        <p className="text-gray-700 line-clamp-1">{address || "No location set"}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsMapModalOpen(true)}
                            className="text-blue-500 hover:text-blue-600 focus:outline-none transition-colors"
                            title="Choose location on map"
                        >
                            <Map className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            {currentLocation && (
                <MapModal
                    isOpen={isMapModalOpen}
                    onClose={() => setIsMapModalOpen(false)}
                    onSelectLocation={handleMapSelect}
                    initialLocation={currentLocation}
                />
            )}
        </>
    )
}

export default ToolbarWithLocation

