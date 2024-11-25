export type DayOfWeekType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface UserProps {
  id: number;
  nickname: string;
  profile: string;
}

export interface CommentProps {
  id: number;
  content: string;
  userCompactResDto: UserProps;
  createdAt: string;
  replyList: CommentProps[];
}

export interface DayLocationProps {
  id: number;
  index: number;
  time: string;
  memo: string;
  location: {
    lat: number;
    lng: number;
  };
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
