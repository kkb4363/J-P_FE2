import { create } from "zustand";
import { DayLocationProps } from "../types/schedule";

type selectPlanItemState = {
  planItemId: number | undefined;
  planItemData: DayLocationProps | undefined;
  setPlanItemId: (id: number | undefined) => void;
  getPlanItemId: () => number | undefined;
  setPlanItemData: (item: DayLocationProps | undefined) => void;
  getPlanItemData: () => DayLocationProps | undefined };
};

export const useSelectPlanItemStore = create<selectPlanItemState>((set, get) => ({
  planItemId: undefined,
  planItemData: undefined,
  setPlanItemId: (id) => set({ planItemId: id }),
  getPlanItemId: () => get().planItemId,
  setPlanItemData: (item) => set({planItemData: item}),
  getPlanItemData: () => get().planItemData;
}));
