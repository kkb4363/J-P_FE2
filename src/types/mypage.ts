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
