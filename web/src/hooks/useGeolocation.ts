import { useState, useCallback } from 'react'

interface GeolocationState {
  lat: number | null
  lng: number | null
  error: string | null
  isLoading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
    isLoading: false,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocation is not supported by your browser.' }))
      return
    }

    setState((s) => ({ ...s, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          isLoading: false,
        })
      },
      (err) => {
        let message = 'Unable to retrieve your location.'
        if (err.code === err.PERMISSION_DENIED) {
          message = 'Location permission denied. Please allow location access in your browser settings.'
        } else if (err.code === err.TIMEOUT) {
          message = 'Location request timed out. Please try again.'
        }
        setState((s) => ({ ...s, error: message, isLoading: false }))
      },
      { timeout: 10000, maximumAge: 60000 }
    )
  }, [])

  return {
    lat: state.lat,
    lng: state.lng,
    error: state.error,
    isLoading: state.isLoading,
    hasLocation: state.lat !== null && state.lng !== null,
    requestLocation,
  }
}
