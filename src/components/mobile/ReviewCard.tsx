import styled from "styled-components";
import { reviewApiProps } from "../../types/home";
import CustomProfile from "./CustomProfile";
import StarIcon from "../../assets/icons/StarIcon";
import LikeIcon from "../../assets/icons/LikeIcon";
import CommentIcon from "../../assets/icons/CommentIcon";
import { useNavigate } from "react-router-dom";
import ImageView from "./ImageView";
import * as R from "../../assets/styles/travelReview.style";
import { testImageList } from "../../utils/staticDatas";

interface Props {
  item: reviewApiProps;
  ref?: (node: HTMLDivElement) => void;
}

export default function ReviewCard({ item, ref }: Props) {
  const navigate = useNavigate();
  return (
    <ReviewCardContainer key={item.id} ref={ref}>
      <R.ProfileHeader>
        <CustomProfile
          src="/src/assets/images/testImg.png"
          nickname={item.userCompactResDto.nickname}
          content="24.2.3"
        />
        <R.IconBox>
          <StarIcon />
          <span>{item.star}</span>
        </R.IconBox>
      </R.ProfileHeader>
      <ReviewContentBox>
        <p>{item.content}</p>
        <span onClick={() => navigate(`/home/review/${item.id}`)}>더보기</span>
      </ReviewContentBox>
      <ImageView
        src={testImageList[0]}
        alt="review detail img"
        width="100%"
        height="191px"
        bottomText={`+${testImageList.length - 1}`}
      ></ImageView>
      <R.LikeCommentBox>
        <R.IconBox>
          <LikeIcon />
          <span>8</span>
        </R.IconBox>
        <R.IconBox>
          <CommentIcon stroke="#808080" />
          <span>2</span>
        </R.IconBox>
      </R.LikeCommentBox>
    </ReviewCardContainer>
  );
}

const ReviewCardContainer = styled.div`
  width: 100%;
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
