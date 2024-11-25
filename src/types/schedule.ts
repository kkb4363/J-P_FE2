import { UniqueIdentifier } from "@dnd-kit/core";
import { placeApiProps } from "./home";
import { DayProps, UserProps } from "./res.dto";

export type StatusType = "UPCOMING" | "NOW" | "COMPLETED";

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
