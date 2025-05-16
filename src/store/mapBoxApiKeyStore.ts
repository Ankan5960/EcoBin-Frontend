import { create } from "zustand";
import { fetchMapBoxApiKeyData } from "@/api/mapBoxApiKeyApi";

interface MapBoxApiKeyState {
  mapBoxApiKey: string | null;
  loading: boolean;
  error: string | null;
  fetchMapBoxApiKey: () => Promise<void>;
}

const mapBoxApiKeyStore = create<MapBoxApiKeyState>((set) => ({
  mapBoxApiKey: null,
  loading: false,
  error: null,

  fetchMapBoxApiKey: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchMapBoxApiKeyData();
      set({
        mapBoxApiKey: res,
        loading: false,
        error: null,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch MapBoxApiKey";
      console.error("Failed to fetch MapBoxApiKey", err);
      set({ error: message, loading: false });
    }
  },
}));

export default mapBoxApiKeyStore;
