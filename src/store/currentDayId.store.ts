import { create } from "zustand";

type CurrentDayIdState = {
  currentDayId: number | undefined; 
  setCurrentDayId: (id: number | undefined) => void;
  getCurrentDayId: () => number | undefined;
};

export const useCurrentDayIdStore = create<CurrentDayIdState>((set, get) => ({
  currentDayId: undefined,
  setCurrentDayId: (id) => set({ currentDayId: id }),
  getCurrentDayId: () => get().currentDayId,
}));
