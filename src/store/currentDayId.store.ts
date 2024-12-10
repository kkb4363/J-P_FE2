import { create } from "zustand";

type CurrentDayIdState = {
  currentDayId: number | undefined; // currentDayId의 타입은 number 또는 undefined
  setCurrentDayId: (id: number | undefined) => void; // 상태를 업데이트하는 함수
  getCurrentDayId: () => number | undefined; // 상태를 반환하는 함수
};

export const useCurrentDayIdStore = create<CurrentDayIdState>((set, get) => ({
  currentDayId: undefined,
  setCurrentDayId: (id) => set({ currentDayId: id }), // 상태 업데이트
  getCurrentDayId: () => get().currentDayId, // 현재 상태 반환
}));
