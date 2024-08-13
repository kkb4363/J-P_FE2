import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: 0 18px 18px 18px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 10px 0;
`;

export const HomeBody = styled.div`
  flex: 1;
  height: calc(100% - 50px - 45px);
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 12px 0;
`;

export const InfoText = styled.span`
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const MoreText = styled.span`
  color: #b8b8b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export const CarouselRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const CarouselWithText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 182px;
`;

export const CarouselTitle = styled.span`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const CarouselLocationTitle = styled.span`
  color: #666;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const ReviewCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

export const ReviewRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReviewTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;

  & > span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & > p {
    color: #1a1a1a;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
  }
`;

export const ReviewTagRow = styled.div`
  display: flex;
  gap: 3px;
`;

export const ReviewTag = styled.div`
  border-radius: 16px;
  border: 1px solid #4d4d4d;
  background: #fff;
  display: flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  & > span {
    color: #4d4d4d;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const ReviewProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  & > span {
    color: #1a1a1a;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const ReviewLikeCommentRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const LikeCommentBox = styled.div`
  gap: 3px;
  display: flex;

  & > span {
    color: #b8b8b8;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const ReviewDetailText = styled.span`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
