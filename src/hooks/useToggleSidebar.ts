import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const useToggleSidebar = create<SidebarStore>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
