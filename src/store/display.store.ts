import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Footer Tab 관련
export type TabType = "홈" | "검색" | "일정" | "리뷰/여행기" | "마이페이지";
export type HomeTabType = "TRAVEL_PLACE" | "CITY" | "THEME";

interface State {
  currentTab: TabType;
  currentHomeTab: HomeTabType;
  bottomSheetHeight: number;
  currentCity: string;
}

interface Action {
  getTabs: () => TabType;
  setTabs: (t: TabType) => void;
  getHomeTab: () => HomeTabType;
  setHomeTab: (t: HomeTabType) => void;
  getBottomSheetHeight: () => number;
  setBottomSheetHeight: (h: number) => void;
  getCurrentCity: () => string;
  setCurrentCity: (c: string) => void;
}

const initData: State = {
  currentTab: "홈",
  currentHomeTab: "TRAVEL_PLACE",
  bottomSheetHeight: 0,
  currentCity: "",
};

export const useDisplayStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      getTabs: () => get().currentTab,
      setTabs: (t: TabType) => set({ currentTab: t }),
      getHomeTab: () => get().currentHomeTab,
      setHomeTab: (t: HomeTabType) => set({ currentHomeTab: t }),
      getBottomSheetHeight: () => get().bottomSheetHeight,
      setBottomSheetHeight: (h: number) => {
        if (h !== get().bottomSheetHeight) {
          return set({ bottomSheetHeight: h });
        }
      },
      getCurrentCity: () => get().currentCity,
      setCurrentCity: (c: string) => set({ currentCity: c }),
    }),

    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
