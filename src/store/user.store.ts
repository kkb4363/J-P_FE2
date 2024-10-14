import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

type UserType = "J" | "P";

interface State {
  userName: string;
  userType: UserType;
  searchData: string[];
}

interface Action {
  getUserName: () => string;
  setUserName: (n: string) => void;
  getUserType: () => UserType;
  setUserType: (t: UserType) => void;
  getSearchData: () => string[];
  addSearchData: (s: string) => void;
  deleteSearchData: (s: string) => void;
  clearSearchData: () => void;
}

const initData: State = {
  userName: "",
  userType: "J",
  searchData: [],
};

export const useUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      getUserName: () => get().userName,
      setUserName: (n: string) => set({ userName: n }),
      getUserType: () => get().userType,
      setUserType: (t: UserType) => set({ userType: t }),
      getSearchData: () => get().searchData,
      addSearchData: (s: string) => {
        const prev = get().searchData;
        set({ searchData: [...prev, s] });
      },
      deleteSearchData: (s: string) => {
        const prev = get().searchData;
        const deletedData = prev.filter((p) => p !== s);
        set({ searchData: deletedData });
      },
      clearSearchData: () => set({ searchData: [] }),
    }),

    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
