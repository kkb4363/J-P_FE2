import { create } from "zustand";

interface ReviewState {
  isReview: boolean;
  toggleReview: (toggle: boolean) => void;
}
export const useReviewStore = create<ReviewState>((set) => ({
  isReview: true,
  toggleReview: (toggle: boolean) => set(() => ({ isReview: toggle })),
}));
