import { create } from "zustand";
import { AddedPlaceProps } from "../types/schedule";
import { GooglePlaceProps } from "../types/place";

interface State {
  nearPlace: GooglePlaceProps[];
  addedPlace: AddedPlaceProps[];
}

interface Action {
  getNearPlace: () => GooglePlaceProps[];
  setNearPlace: (places: GooglePlaceProps[]) => void;
  getAddedPlace: () => AddedPlaceProps[];
  setAddedPlace: (places: AddedPlaceProps[]) => void;
  clear: () => void;
}

const initData: State = {
  nearPlace: [],
  addedPlace: [],
};

export const useMapStore = create<State & Action>()((set, get) => ({
  ...initData,
  getNearPlace: () => get().nearPlace,
  setNearPlace: (places: GooglePlaceProps[]) => set({ nearPlace: places }),
  getAddedPlace: () => get().addedPlace,
  setAddedPlace: (places: AddedPlaceProps[]) => set({ addedPlace: places }),
  clear: () => set({ ...initData }),
}));
