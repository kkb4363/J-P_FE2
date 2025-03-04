export interface UserInfoProps {
  name: string;
  type: "J" | "P";
}

export interface UserProps {
  id: number;
  nickname: string;
  profile: string;
}

export interface ProfileAPIProps {
  email: string;
  mbti: string;
  nickname: string;
  profile: string;
  providerType: string;
  roles: string[];
  userStatus: string;
}

export interface MyLikeProps {
  createdAt: string;
  fileUrl: string;
  id: number;
  likeActionType: string;
  likeTargetType: string;
  targetId: string;
  targetAddress?: string;
  targetName?: string;
  targetScheduleEndDate?: string;
  targetScheduleStartDate?: string;
  targetSubject?: string;
  placeType?: string;
  userId: number;
  targetUserCompactResDto?: UserProps;
}

export interface MySchedules {
  dayResDtos: any;
  id: number;
  title: string;
  place: any;
  startDate: string;
  endDate: string;
  member: any;
  status: string;
  isOpen: boolean;
}

export interface MyTravelogueProps {
  createdAt: string;
  fileInfos: [
    {
      fileId: string;
      fileUrl: string;
    }
  ];
  id: number;
  isPublic: boolean;
  scheduleEndDate: string;
  scheduleStartDate: string;
  subject: string;
  userCompactResDto: UserProps;
}

export interface MyReviewProps {
  commentCnt: number;
  content: string;
  createdAt: any;
  isLiked?: boolean;
  fileInfos: [
    {
      fileId: string;
      fileUrl: string;
    }
  ];
  id: number;
  likeCnt: number;
  placeId: string;
  star: number;
  subject: string;
  userCompactResDto: UserProps;
}
