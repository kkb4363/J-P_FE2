import { userCompactResDto } from "./res.dto";

export interface placeApiProps {
  id: number;
  placeId: string;
  name: string;
  subName: string;
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
  userCompactResDto: userCompactResDto;
}
