import React, { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'
import { Search, MapPin } from 'lucide-react'

interface MapModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectLocation: (location: { lat: number; lng: number }, address: string) => void
  initialLocation: { lat: number; lng: number }
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onSelectLocation, initialLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(initialLocation)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    setMarkerPosition(initialLocation)
  }, [initialLocation])

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
  }, [])

  const onMarkerDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
  }, [])

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.geometry && place.geometry.location) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        setMarkerPosition(newPosition)
        mapRef.current?.panTo(newPosition)
      }
    }
  }

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const newPosition = { lat: latitude, lng: longitude }
          setMarkerPosition(newPosition)
          mapRef.current?.panTo(newPosition)
        },
        (error) => {
          console.error("Error fetching location:", error.message)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Select Location</h2>
        </div>
        <div className="relative space-y-2">
          <div className="top-4 left-4 right-4 z-10 p-2">
            <div className="relative">
              <Autocomplete
                onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
                onPlaceChanged={handlePlaceSelect}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for a location"
                    className="w-full px-4 py-2 pr-20 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
                    <button
                      onClick={fetchCurrentLocation}
                      className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none transition-colors"
                      title="Use current location"
                    >
                      <MapPin size={20} />
                    </button>
                    <Search className="text-gray-400 ml-2" size={20} />
                  </div>
                </div>
              </Autocomplete>
            </div>
          </div>
          <div className="h-96 w-full">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={markerPosition}
              zoom={14}
              onClick={onMapClick}
              onLoad={onMapLoad}
            >
              <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={onMarkerDragEnd}
              />
            </GoogleMap>
          </div>
        </div>
        <div className="p-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const geocoder = new google.maps.Geocoder()
              geocoder.geocode({ location: markerPosition }, (results, status) => {
                if (status === 'OK' && results?.[0]) {
                  onSelectLocation(markerPosition, results[0].formatted_address)
                } else {
                  onSelectLocation(markerPosition, 'Unknown location')
                }
              })
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}

export default MapModal

