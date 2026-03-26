import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
  version: 'weekly',
  libraries: ['places'],
})

let mapsLoaded = false

export async function loadGoogleMaps(): Promise<typeof google> {
  if (mapsLoaded) return google
  await loader.load()
  mapsLoaded = true
  return google
}

export const SOFIA_CENTER = { lat: 42.6977, lng: 23.3219 }
export const PLOVDIV_CENTER = { lat: 42.1354, lng: 24.7453 }
export const VARNA_CENTER = { lat: 43.2141, lng: 27.9147 }
export const BURGAS_CENTER = { lat: 42.5048, lng: 27.4626 }
