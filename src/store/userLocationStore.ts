import { create } from "zustand";
import axios from "axios";
import { LocationData } from "@/models/dustbin-model";

interface LocationState {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  fetchLocationFromIP: () => Promise<void>;
  fetchGeoLocation: () => Promise<void>;
  fetchLocation: () => Promise<void>; // Main function to call
}

const userLocationStore = create<LocationState>((set, get) => ({
  location: null,
  loading: false,
  error: null,

  fetchLocationFromIP: async () => {
    try {
      const res = await axios.get("https://ipapi.co/json/");
      set({
        location: {
          latitude: res.data.latitude.toString(),
          longitude: res.data.longitude.toString(),
        },
      });
    } catch (err) {
      console.error("Failed to fetch location from IP:", err);
      set({ error: "IP-based location fetch failed" });
    }
  },

  fetchGeoLocation: async () => {
    return new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        const msg = "Geolocation is not supported by your browser.";
        set({ error: msg, loading: false });
        alert(msg);
        return reject(new Error(msg));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          set({
            location: {
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            },
          });
          resolve();
        },
        (error) => {
          const msg = `Geolocation error: ${error.message}`;
          set({ error: msg });
          alert(msg);
          reject(error);
        }
      );
    });
  },

  fetchLocation: async () => {
    set({ loading: true, error: null });

    // try {
    //   await get().fetchGeoLocation();
    // } catch {
    //   // If geolocation fails, fallback to IP
    //   await get().fetchLocationFromIP();
    // }
    await get().fetchLocationFromIP();

    set({ loading: false });
  },
}));

export default userLocationStore;
