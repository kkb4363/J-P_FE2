import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Footer Tab 관련
export type TabProps = "홈" | "검색" | "일정" | "리뷰/여행기" | "마이페이지";

interface State {
  currentTab: TabProps;
  bottomSheetHeight: number;
}

interface Action {
  getTabs: () => TabProps;
  setTabs: (t: TabProps) => void;
  getBottomSheetHeight: () => number;
  setBottomSheetHeight: (h: number) => void;
}

const initData: State = {
  currentTab: "홈",
  bottomSheetHeight: 0,
};

export const useDisplayStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      getTabs: () => get().currentTab,
      setTabs: (t: TabProps) => set({ currentTab: t }),
      getBottomSheetHeight: () => get().bottomSheetHeight,
      setBottomSheetHeight: (h: number) => {
        if (h !== get().bottomSheetHeight) {
          return set({ bottomSheetHeight: h });
        }
      },
    }),

    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
