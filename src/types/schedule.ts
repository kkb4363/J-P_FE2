import { UniqueIdentifier } from "@dnd-kit/core";
import { PlaceProps } from "./place";
import { UserProps } from "./mypage";

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
  place: PlaceProps;
  startDate: string;
  endDate: string;
  member: UserProps[];
  status: StatusType;
  isOpen: boolean;
  dayResDtos: DayProps[];
  mbti?: string;
  isEditing?: boolean;
}

export interface AddedPlaceProps {
  expense: any[];
  id: number;
  index: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}
export type DayOfWeekType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface DayLocationProps {
  id: number;
  index: number;
  time: string;
  memo: string;
  placeId: string;
  expense: {
    type: string;
    name: string;
    expense: number;
  }[];
  mobility: string[];
  name: string;
}

export interface DayProps {
  id: number;
  date: string;
  dayIndex: number;
  dayOfWeek: DayOfWeekType;
  dayLocationResDtoList: DayLocationProps[];
}

export interface CalendarProps {
  startDate: Date;
  endDate: Date | undefined;
  key: string;
}
