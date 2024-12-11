import { create } from "zustand";

type selectPlanItemState = {
  planItemId: number | undefined;
  setPlanItemId: (id: number | undefined) => void;
  getPlanItemId: () => number | undefined;
};

export const useSelectPlanItemStore = create<selectPlanItemState>((set, get) => ({
  planItemId: undefined,
  setPlanItemId: (id) => set({ planItemId: id }),
  getPlanItemId: () => get().planItemId,
}));
