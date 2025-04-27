import { create } from "zustand";

type LocationData = {
  latitude: string;
  longitude: string;
} | null;

interface UserLocationStore {
  userLocation: LocationData;
  setUserLocation: (location: LocationData) => void;
}

export const useUserLocationStore = create<UserLocationStore>((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}));