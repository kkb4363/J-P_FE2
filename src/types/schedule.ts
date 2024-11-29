import { UniqueIdentifier } from "@dnd-kit/core";
import { placeApiProps } from "./home";
import { DayProps, UserProps } from "./res.dto";

export type StatusType = "UPCOMING" | "NOW" | "COMPLETED";

export interface PlanItemProps {
  id: UniqueIdentifier;
  time: string;
  title: string;
  subtitle: string;
}

export interface PlanDetailsProps {
  memo: string;
  expense: AddCostDataTypes[];
  mobility: string[];
}

export interface AddCostDataTypes {
  type: string;
  name: string;
  expense: number | null;
}

export interface CityProps {
  id: number;
  name: string;
  photoUrl: string;
  placeId: string;
  rating: number;
  subName: string;
  themeType: string;
}

export interface ScheduleApiProps {
  id: number;
  title: string;
  place: placeApiProps;
  startDate: string;
  endDate: string;
  member: UserProps[];
  status: StatusType;
  isOpen: boolean;
  dayResDtos: DayProps[];
}
