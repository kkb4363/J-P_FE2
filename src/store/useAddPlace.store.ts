import { create } from "zustand";

type AddPlaceState = {
  selectDay: number;
  setSelectDay: (day: number) => void;
  selectTime: string;
  setSelectTime: (time: string) => void;
  openModal: {
    selectDay: boolean;
    selectTime: boolean;
  };
  setOpenModal: (
    modal: Partial<{ selectDay: boolean; selectTime: boolean }>
  ) => void;
};

export const useAddPlaceStore = create<AddPlaceState>((set) => ({
  selectDay: 1,
  setSelectDay: (day) => set({ selectDay: day }),
  selectTime: "",
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
