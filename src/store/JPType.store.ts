import { create } from "zustand";

type JPType = "J" | "P";

interface JPState {
  jpState: JPType;
  setJpState: (newState: JPType) => void;
}

export const useJPStore = create<JPState>((set) => ({
  jpState: "J", 
  setJpState: (newState) => set({ jpState: newState }),
}));
