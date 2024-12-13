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
  id: number;
  userId: number;
  targetId: string;
  likeType: string;
  createdAt: string;
  targetName: string;
  targetAddress: string;
  fileUrl: string;
  placeType: string;
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
