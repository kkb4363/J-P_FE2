import { TravelogProps } from "../../../types/travelreview";
import {
  DetailsReviewBox,
  ReviewInfo,
  ReviewTitle,
} from "../../../assets/styles/homeDetail.style";
import LikeCommentBox from "../../LikeCommentBox";
import LikeIcon from "../../../assets/icons/LikeIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  item: TravelogProps;
}

export default function ReviewCard({ item }: Props) {
  const navigate = useNavigate();

  return (
    <DetailsReviewBox onClick={() => navigate(`/home/travelogue/${item?.id}`)}>
      <ReviewTitle>
        <div>
          <img src={item?.userCompactResDto?.profile} alt="user-img" />
          <span>{item.userCompactResDto.nickname} | </span>
          <span>24.4.1</span>
        </div>
        <div>
          <LikeIcon />
          <span>{item.likeCnt}</span>
        </div>
      </ReviewTitle>
      <ReviewInfo>
        <span>{item.subject}</span>
      </ReviewInfo>
      <LikeCommentBox likeCnt={item.likeCnt} commentCnt={item.commentCnt} />
    </DetailsReviewBox>
  );
}
