import styled from "styled-components";
import { ReviewProps } from "../../types/travelreview";
import CustomProfile from "../CustomProfile";
import StarIcon from "../../assets/icons/StarIcon";
import { useNavigate } from "react-router-dom";
import ImageView from "../ImageView";
import * as R from "../../assets/styles/travelReview.style";
import MarkIcon from "../../assets/icons/MarkIcon";
import { useEffect, useRef, useState } from "react";
import IconBox from "../IconBox";
import LikeCommentBox from "../LikeCommentBox";

interface Props {
  item: ReviewProps;
  divRef?: (node: HTMLDivElement) => void;
}

export default function ReviewCard({ item, divRef }: Props) {
  const navigate = useNavigate();
  const reviewCardRef = useRef(null) as any;
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (reviewCardRef.current) {
      const container = reviewCardRef.current;
      const maxWidth = container?.offsetWidth - 36;
      let totalWidth = 0;
      let count = 0;

      Array.from(container?.children).forEach((child: any) => {
        const childWidth = child?.offsetWidth;
        totalWidth += childWidth;

        if (totalWidth <= maxWidth) {
          count += 1;
        }
      });

      setVisibleCount(count);
    }
  }, []);

  return (
    <ReviewCardContainer>
      <ReviewPlaceBoxRow ref={divRef}>
        <ReviewPlaceBox>
          <MarkIcon stroke="#6979F8" width="18" height="18" />
          <span>{item.subject}</span>
        </ReviewPlaceBox>
      </ReviewPlaceBoxRow>

      <R.ProfileHeader>
        <CustomProfile
          src={item.userCompactResDto.profile}
          nickname={item.userCompactResDto.nickname}
          content={item.createdAt}
        />
        <IconBox>
          <StarIcon />
          <span>{item.star}</span>
        </IconBox>
      </R.ProfileHeader>
      <ReviewContentBox>
        <p>{item.content}</p>
        <span onClick={() => navigate(`/home/review/${item.id}`)}>더보기</span>
      </ReviewContentBox>
      <ImageView
        src={item?.fileInfos?.[0].fileUrl}
        alt="review detail img"
        width="100%"
        height="191px"
        bottomText={
          item?.fileInfos?.length > 1 ? `+${item?.fileInfos.length - 1}` : ""
        }
      ></ImageView>
      <LikeCommentBox
        fillLike={item.isLiked}
        likeCnt={item.likeCnt}
        commentCnt={item.commentCnt}
      />
    </ReviewCardContainer>
  );
}

const ReviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 0 14px;
  position: relative;

  &:first-child {
    padding: 0 0 14px;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.color.gray200};
  }
`;

const ReviewPlaceBoxRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ReviewPlaceBox = styled.div`
  width: fit-content;
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 4px 10px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray700};
  border-radius: 16px;

  & > span {
    font-size: 14px;
    color: ${(props) => props.theme.color.gray700};
    white-space: nowrap;
  }
`;

const ReviewContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 23.5px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  font-size: 14px;
  line-height: 140%;
  gap: 6px;

  & > span {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray300};
    cursor: pointer;
  }
`;

const PlusIndicator = styled.div`
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.gray500};
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray500};
  min-height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
