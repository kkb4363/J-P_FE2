import styled from "styled-components";
import ImageView from "../ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import LikeCommentBox from "../../LikeCommentBox";
import {
  ReviewInfo,
  ReviewTitle,
} from "../../../assets/styles/homeDetail.style";
import { useNavigate } from "react-router-dom";

interface Props {
  item: any;
}

export default function ReviewCard({ item }: Props) {
  const navigate = useNavigate();
  return (
    <ReviewCardContainer
      key={item?.id}
      onClick={() => navigate(`/home/review/${item?.id}`)}
    >
      <ImageView
        width="110px"
        height="100px"
        src={item?.fileInfos?.[0]?.fileUrl}
        alt="review-img"
      />

      <ReviewInfoCol>
        <ReviewTitle>
          <div>
            <img src={item?.userCompactResDto.profile} alt="user-img" />
            <span>{item?.userCompactResDto.nickname}</span>
            <span>{item?.createdAt}</span>
          </div>
          <div>
            <StarIcon />
            <span>{item?.star}</span>
          </div>
        </ReviewTitle>
        <ReviewInfo>
          <span>{item?.content}</span>
        </ReviewInfo>
        <LikeCommentBox likeCnt={item?.likeCnt} commentCnt={item?.commentCnt} />
      </ReviewInfoCol>
    </ReviewCardContainer>
  );
}

const ReviewCardContainer = styled.aside`
  padding: 17px;
  width: 390px;
  height: 134px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const ReviewInfoCol = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
