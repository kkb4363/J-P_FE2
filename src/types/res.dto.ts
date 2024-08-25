export interface userCompactResDto {
  id: number;
  nickname: string;
  picture: string;
}

export interface commentResDto {
  id: number;
  content: string;
  userCompactResDto: userCompactResDto;
  createdAt: string;
  replyList: commentResDto[];
}
