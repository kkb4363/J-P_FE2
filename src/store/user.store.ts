import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

type UserType = "J" | "P";

interface State {
  userName: string;
  userType: UserType;
}

interface Action {
  getUserName: () => string;
  setUserName: (n: string) => void;
  getUserType: () => UserType;
  setUserType: (t: UserType) => void;
}

const initData: State = {
  userName: "",
  userType: "J",
};

export const useUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      getUserName: () => get().userName,
      setUserName: (n: string) => set({ userName: n }),
      getUserType: () => get().userType,
      setUserType: (t: UserType) => set({ userType: t }),
    }),

    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
