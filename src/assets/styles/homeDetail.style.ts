import styled from "styled-components";
import { scrollHidden } from "./home.style";

export const HomeDetailsContainer = styled.div`
  width: 100%;
  min-width: 360px;
  height: 100%;
  overflow-y: scroll;
  ${scrollHidden};
  position: relative;
`;

export const DetailsImageBox = styled.div`
  width: 100%;
  min-height: 250px;
  position: relative;

  & > img {
    width: 100%;
    height: 250px;
  }
`;

export const ArrowLeftBox = styled.div`
  position: absolute;
  left: 18px;
  top: 38px;
`;

export const LikeBox = styled.div`
  position: absolute;
  right: 18px;
  top: 38px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.06));
  opacity: 0.9;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImagePageIndicatorBox = styled.div`
  position: absolute;
  right: 25px;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  width: 32px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: #000;
    text-align: center;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;

export const DetailsBody = styled.div`
  padding: 6px 16px 16px 16px;
`;

export const DetailsTitle = styled.h1`
  display: flex;
  align-items: center;
  margin: 18px 0 8px 0;

  color: #1a1a1a;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const DetailsInfo = styled.div`
  color: #1a1a1a;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.048px;
  margin: 8px 0;
`;

export const DetailsSubTitle = styled.p`
  display: flex;
  align-items: center;
  & > span {
    color: #4d4d4d;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
  }
`;

export const GoogleMapBox = styled.div`
  width: 100%;
  height: 146px;
  margin: 8px 0;
  border-radius: 16px;
`;

export const DetailsTitleWithMoreText = styled(DetailsTitle)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    color: #4d4d4d;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const MoreText = styled.span`
  color: #b8b8b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export const MoreTextAbsolute = styled(MoreText)`
  position: absolute;
  right: 0;
`;

export const NearPlaceCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 6px 0;
`;

export const DetailsReviewRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 134px;
  overflow-x: scroll;
  ${scrollHidden};
`;

export const DetailsReviewBox = styled.div`
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  background: #fff;
  height: 134px;
  width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
`;

export const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 4px;

    & > img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    & > span:last-child {
      color: #808080;
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }

    & > span:first-child {
      color: #1a1a1a;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }
  }

  & > div:last-child {
    display: flex;
    gap: 4px;
    align-items: center;

    & > span {
      color: #808080;
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }
  }
`;

export const ReviewInfo = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 221px;
  height: 40px;
  justify-content: center;
  align-items: center;

  & > span {
    color: #1a1a1a;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const ReviewMessageRow = styled.div`
  display: flex;
  gap: 4px;
  & > span {
    color: #808080;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const AddScheduleBox = styled.div`
  padding: 29px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddScheduleButton = styled.button`
  border-radius: 30px;
  background: #ffc814;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;

  & > span {
    color: #fff;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.6px;
  }
`;

export const NearPlaceBox = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height && $height};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const NearPlaceDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0.8;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.048px;
  }

  & > div {
    color: ${(props) => props.theme.color.gray500};
    font-size: 12px;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.036px;

    display: flex;
    align-items: center;
    gap: 3px;
  }
`;
