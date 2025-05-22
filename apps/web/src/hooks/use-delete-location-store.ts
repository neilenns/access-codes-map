import { LocationWithUsers } from "@/db/locations";
import { create } from "zustand";

interface DeleteLocationState {
  isOpen: boolean;
  selectedLocation?: LocationWithUsers;
  openDeleteDialog: (location: LocationWithUsers) => void;
  closeDialog: () => void;
}

export const useDeleteLocationStore = create<DeleteLocationState>((set) => ({
  isOpen: false,
  selectedLocation: undefined,
  openDeleteDialog: (location) =>
    set({ isOpen: true, selectedLocation: location }),
  closeDialog: () => set({ isOpen: false, selectedLocation: undefined }),
}));
