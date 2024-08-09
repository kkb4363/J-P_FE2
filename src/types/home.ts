export interface placeApiProps {
  id: number;
  placeId: string;
  name: string;
  subName: string;
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
  userCompactResDto: {
    id: number;
    nickname: string;
    picture: string;
  };
}
