import { ReviewProps } from "../../../types/travelreview";
import {
  DetailsReviewBox,
  ReviewInfo,
  ReviewTitle,
} from "../../../assets/styles/homeDetail.style";
import StarIcon from "../../../assets/icons/StarIcon";
import LikeCommentBox from "../../LikeCommentBox";
import { useNavigate } from "react-router-dom";

interface Props {
  item: ReviewProps;
}

export default function ReviewCard({ item }: Props) {
  const navigate = useNavigate();

  return (
    <DetailsReviewBox onClick={() => navigate(`/home/review/${item.id}`)}>
      <ReviewTitle>
        <div>
          <img src={item?.userCompactResDto?.profile} alt="user-img" />
          <span>{item.userCompactResDto.nickname} | </span>
          <span>24.4.1</span>
        </div>
        <div>
          <StarIcon />
          <span>{item.star}</span>
        </div>
      </ReviewTitle>
      <ReviewInfo>
        <span>{item.content}</span>
      </ReviewInfo>
      <LikeCommentBox likeCnt={item.likeCnt} commentCnt={item.commentCnt} />
    </DetailsReviewBox>
  );
}
