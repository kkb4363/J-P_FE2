import styled from "styled-components";
import LikeCommentBox from "../../LikeCommentBox";
import CustomProfile from "../../CustomProfile";
import { MyReviewProps } from "../../../types/mypage";
import { useNavigate } from "react-router-dom";

interface Props {
  data: MyReviewProps;
  handleClick: () => void;
}

export default function ReviewCard({ data, handleClick }: Props) {
  const navigate = useNavigate();

  return (
    <ReviewCardContainer onClick={handleClick}>
      <ReviewCardTitleRow>
        <CustomProfile
          src={data?.userCompactResDto?.profile}
          nickname={data?.userCompactResDto?.nickname}
          content={data?.createdAt}
        />
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/home/writeReview`, {
              state: {
                reviewId: data?.id,
              },
            });
          }}
        >
          수정
        </span>
      </ReviewCardTitleRow>

      <ReviewCardDetailCol>
        <span>{data?.content}</span>
      </ReviewCardDetailCol>
      <LikeCommentBox
        commentCnt={data?.commentCnt}
        likeCnt={data?.likeCnt}
        fillLike={data?.isLiked}
      />
    </ReviewCardContainer>
  );
}

const ReviewCardContainer = styled.div`
  width: 320px;
  height: 140px;
  border-radius: 16px;
  padding: 16px 14px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const ReviewCardTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    cursor: pointer;
  }
`;

const ReviewCardDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
