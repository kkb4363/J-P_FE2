import { create } from "zustand";
import { GooglePlaceProps } from "../types/home.details";

interface State {
  nearPlace: GooglePlaceProps[];
}

interface Action {
  getNearPlace: () => GooglePlaceProps[];
  setNearPlace: (places: GooglePlaceProps[]) => void;
  clear: () => void;
}

const initData: State = {
  nearPlace: [],
};

export const useMapStore = create<State & Action>()((set, get) => ({
  ...initData,
  getNearPlace: () => get().nearPlace,
  setNearPlace: (places: GooglePlaceProps[]) => set({ nearPlace: places }),
  clear: () => set({ ...initData }),
}));
