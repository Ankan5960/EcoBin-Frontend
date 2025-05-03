import { create } from 'zustand'
import axios from 'axios'
import { LocationData } from '@/types/dustbinTypes'

interface LocationState {
  city: string | null
  location: LocationData | null
  loading: boolean
  error: string | null
  fetchCityFromIP: () => Promise<void>
  fetchGeoLocation: () => Promise<void>
  fetchLocation: () => Promise<void> // Main function to call
}

const useLocationStore = create<LocationState>((set, get) => ({
  city: null,
  location: null,
  loading: false,
  error: null,

  fetchCityFromIP: async () => {
    try {
      const res = await axios.get('https://ipapi.co/json/')
      set({
        city: res.data.city,
        location: {
          latitude: res.data.latitude.toString(),
          longitude: res.data.longitude.toString(),
        },
      })
    } catch (err) {
      console.error('Failed to fetch location from IP:', err)
      set({ error: 'IP-based location fetch failed' })
    }
  },

  fetchGeoLocation: async () => {
    return new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        const msg = 'Geolocation is not supported by your browser.'
        set({ error: msg, loading: false })
        alert(msg)
        return reject(new Error(msg))
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          set({
            location: {
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            },
          })
          resolve()
        },
        (error) => {
          const msg = `Geolocation error: ${error.message}`
          set({ error: msg })
          alert(msg)
          reject(error)
        }
      )
    })
  },

  fetchLocation: async () => {
    set({ loading: true, error: null })

    try {
      await get().fetchGeoLocation()
    } catch {
      // If geolocation fails, fallback to IP
      await get().fetchCityFromIP()
    }

    set({ loading: false })
  },
}))

export default useLocationStore;