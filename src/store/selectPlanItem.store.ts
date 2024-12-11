import { create } from "zustand";

type selectPlanItemState = {
  planItemId: number | undefined;
  planPlaceId: string | undefined;
  setPlanItemId: (id: number | undefined) => void;
  getPlanItemId: () => number | undefined;
  setPlanPlaceId: (item: string | undefined) => void;
  getPlanPlaceId: () => string | undefined;
};

export const useSelectPlanItemStore = create<selectPlanItemState>((set, get) => ({
  planItemId: undefined,
  planPlaceId: undefined,
  setPlanItemId: (id) => set({ planItemId: id }),
  getPlanItemId: () => get().planItemId,
  setPlanPlaceId: (id) => set({ planPlaceId: id }),
  getPlanPlaceId: () => get().planPlaceId,
}));
