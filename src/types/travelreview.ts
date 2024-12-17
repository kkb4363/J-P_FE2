import { UserProps } from "./mypage";

export interface ReviewProps {
  commentCnt: number;
  id: number;
  createdAt: string;
  likeCnt: number;
  placeId: string;
  star: number;
  subject: string;
  content: string;
  userCompactResDto: UserProps;
  fileInfos: [
    {
      fileId: string;
      fileUrl: string;
    }
  ];
}

export interface ReviewDetailProps {
  id: number;
  subject: string;
  content: string;
  userCompactResDto: UserProps;
  placeId: string;
  star: number;
  likeCnt: number;
  viewCnt: number;
  createdAt: string;
  commentResDtoList: CommentProps[];
  fileInfos: [
    {
      fileId: string;
      fileUrl: string;
    }
  ];
}

export interface CommentProps {
  id: number;
  content: string;
  userCompactResDto: UserProps;
  user?: UserProps;
  createdAt: string;
  replyList: CommentProps[];
}

export interface TravelogProps {
  id: number;
  subject: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  userCompactResDto: {
    id: number;
    nickname: string;
    profile: string;
  };
  likeCnt: number;
  commentCnt: number;
  fileInfos: [
    {
      fileId: string;
      fileUrl: string;
    }
  ];
  isPublic: boolean;
  createdAt: string;
}

export interface TravelogDetailProps {
  id: number;
  subject: string;
  content: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  userCompactResDto: UserProps;
  likeCnt: number;
  viewCnt: number;
  commentCnt: 0;
  commentResDtoList: CommentProps[];
  fileInfos: [
    {
      fileId: string;
      fileUrl: string;
    }
  ];
  isPublic: true;
}
