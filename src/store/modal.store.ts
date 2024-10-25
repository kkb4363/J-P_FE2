import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ModalProps = "search" | "";

interface State {
  currentModal: ModalProps;
}

interface Action {
  getCurrentModal: () => ModalProps;
  setCurrentModal: (m: ModalProps) => void;
}

const initData: State = {
  currentModal: "",
};

export const useModalStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      getCurrentModal: () => get().currentModal,
      setCurrentModal: (m: ModalProps) => set({ currentModal: m }),
    }),
    {
      name: "modalStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
