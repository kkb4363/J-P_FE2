import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  // 임시
  userId: string;
}

interface Action {
  getUserId: () => string;
  setUserId: (t: string) => void;
}

const initData: State = {
  userId: "",
};

export const useUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      getUserId: () => get().userId,
      setUserId: (t: string) => set({ userId: t }),
    }),

    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
