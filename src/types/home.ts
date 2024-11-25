import { UserProps } from "./res.dto";

export type ThemeType = "TRAVEL" | "FESTIVAL";


export interface placeApiProps {
  id: number;
  placeId: string;
  name: string;
  subName: string;
  themeType: ThemeType;
  rating: number;
  photourl: string;
}

export interface reviewApiProps {
  commentCnt: number;
  id: number;
  createdAt: string;
  likeCnt: number;
  placeId: string;
  star: number;
  subject: string;
  content: string;
  userCompactResDto: UserProps;
}
