import { create } from "zustand";

type AddPlaceState = {
  selectDay: number;
  setSelectDay: (day: number) => void;
  selectTime: string;
  getSelectTime: () => string;
  setSelectTime: (time: string) => void;
  openModal: {
    selectDay: boolean;
    selectTime: boolean;
  };
  setOpenModal: (
    modal: Partial<{ selectDay: boolean; selectTime: boolean }>
  ) => void;
};

export const useAddPlaceStore = create<AddPlaceState>((set, get) => ({
  selectDay: 1,
  setSelectDay: (day) => set({ selectDay: day }),
  selectTime: "",
  getSelectTime: () => get().selectTime,
  setSelectTime: (time) => set({ selectTime: time }),
  openModal: {
    selectDay: false,
    selectTime: false,
  },
  setOpenModal: (modal) =>
    set((state) => ({
      openModal: { ...state.openModal, ...modal },
    })),
}));
