import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Footer Tab 관련
export type TabProps = "홈" | "검색" | "일정" | "리뷰/여행기" | "마이페이지";

interface State {
  currentTab: TabProps;
}

interface Action {
  getTabs: () => TabProps;
  setTabs: (t: TabProps) => void;
}

const initData: State = {
  currentTab: "홈",
};

export const useDisplayStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      getTabs: () => get().currentTab,
      setTabs: (t: TabProps) => set({ currentTab: t }),
    }),

    // 새로고침해도 tab이 유지되게끔 세션 스토리지에 저장
    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
