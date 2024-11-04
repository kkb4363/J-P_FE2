import { UniqueIdentifier } from "@dnd-kit/core";

export interface planItemProps {
  id: UniqueIdentifier;
  time: string;
  title: string;
  subtitle: string;
}

export interface planDetailsProps { 
  details: string;
  cost: number;
  moveTo: string;
}

export interface AddCostDataTypes {
  category: string;
  name: string;
  cost: number | null;
}