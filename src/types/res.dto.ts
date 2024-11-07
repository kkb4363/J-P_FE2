export type DayOfWeekType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface userCompactResDto {
  id: number;
  nickname: string;
  profile: string;
}

export interface commentResDto {
  id: number;
  content: string;
  userCompactResDto: userCompactResDto;
  createdAt: string;
  replyList: commentResDto[];
}

export interface dayLocationResDto {
  id: number;
  index: number;
  time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
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

export interface dayResDto {
  id: number;
  date: string;
  dayIndex: number;
  dayOfWeek: DayOfWeekType;
  dayLocationResDtoList: dayLocationResDto[];
}
