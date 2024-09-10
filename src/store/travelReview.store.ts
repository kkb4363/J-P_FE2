import { create } from "zustand";

interface State {
  isReview: boolean;
}

interface Action { 
  getIsReview: () => boolean;
  setIsReview: (toggle: boolean) => void;
}

export const useReviewStore = create<State & Action>((set, get) => ({
  isReview: true,
  getIsReview: () => get().isReview,
  setIsReview: (toggle: boolean) => set(() => ({ isReview: toggle })),
}));
