import { LocationWithUsers } from "@/db/locations";
import { create } from "zustand";

interface EditLocationState {
  isOpen: boolean;
  selectedLocation?: Partial<LocationWithUsers>;
  openDialog: (location: Partial<LocationWithUsers>) => void;
  closeDialog: () => void;
}

export const useEditLocationStore = create<EditLocationState>((set) => ({
  isOpen: false,
  selectedLocation: undefined,
  openDialog: (location) => set({ isOpen: true, selectedLocation: location }),
  closeDialog: () => set({ isOpen: false, selectedLocation: undefined }),
}));
