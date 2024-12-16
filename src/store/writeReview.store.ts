import { create } from "zustand";

interface State {
  selectedPlace: string;
  selectedPlaceId: string;
  star: number;
  selectedImg: any[];
  title: string;
  reviewText: string;
}

interface Action {
  getSelectedPlace: () => string;
  setSelectedPlace: (p: string) => void;
  getSelectedPlaceId: () => string;
  setSelectedPlaceId: (id: string) => void;
  getStar: () => number;
  setStar: (s: number) => void;
  getSelectedImg: () => any[];
  setSelectedImg: (i: any[]) => void;
  getTitle: () => string;
  setTitle: (t: string) => void;
  getReviewText: () => string;
  setReviewText: (t: string) => void;
  clear: () => void;
}

const initData: State = {
  selectedPlace: "",
  selectedPlaceId: "",
  star: 0,
  selectedImg: [],
  title: "",
  reviewText: "",
};

export const useWriteReviewStore = create<State & Action>()((set, get) => ({
  ...initData,
  getSelectedPlace: () => get().selectedPlace,
  setSelectedPlace: (p: string) => set({ selectedPlace: p }),
  getStar: () => get().star,
  setStar: (s: number) => set({ star: s }),
  getSelectedImg: () => get().selectedImg,
  setSelectedImg: (i: any[]) => set({ selectedImg: i }),
  getTitle: () => get().title,
  setTitle: (t: string) => set({ title: t }),
  getReviewText: () => get().reviewText,
  setReviewText: (t: string) => set({ reviewText: t }),
  getSelectedPlaceId: () => get().selectedPlaceId,
  setSelectedPlaceId: (id: string) => set({ selectedPlaceId: id }),
  clear: () => set({ ...initData }),
}));
