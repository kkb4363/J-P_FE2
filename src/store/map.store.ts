import { create } from "zustand";
import { NearByPlaceProps } from "../types/home.details";

interface State {
  nearPlace: NearByPlaceProps[];
}

interface Action {
  getNearPlace: () => NearByPlaceProps[];
  setNearPlace: (places: NearByPlaceProps[]) => void;
}

const initData: State = {
  nearPlace: [],
};

export const useMapStore = create<State & Action>()((set, get) => ({
  ...initData,
  getNearPlace: () => get().nearPlace,
  setNearPlace: (places: NearByPlaceProps[]) => set({ nearPlace: places }),
}));
