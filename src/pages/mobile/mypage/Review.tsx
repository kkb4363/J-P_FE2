import styled from "styled-components";
import { TravelHeader } from "./Travel";
import CustomProfile from "../../../components/CustomProfile";
import { useEffect, useState } from "react";
import LikeCommentBox from "../../../components/LikeCommentBox";
import { getMyReviews } from "../../../service/axios";
import { useNavigate } from "react-router-dom";
import { MyReviewProps } from "../../../types/mypage";

export default function Review() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<MyReviewProps[]>([]);

  useEffect(() => {
    getMyReviews().then((res) => {
      if (res) {
        setReviews(res?.data.data);
      }
    });
  }, []);

  return (
    <>
      <TravelHeader>
        <span>내 작성 리뷰 {reviews?.length}</span>
      </TravelHeader>

      <ReviewCardCol>
        {reviews?.map((r: MyReviewProps) => (
          <ReviewCard
            key={r.id}
            onClick={() => navigate(`/home/review/${r.id}`)}
          >
            <ProfileBox>
              <CustomProfile
                src={r?.userCompactResDto?.profile}
                fontSize="12px"
                nickname={r?.userCompactResDto?.nickname}
                content={r?.createdAt}
              />
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/writeReview`, {
                    state: {
                      reviewId: r?.id,
                    },
                  });
                }}
              >
                수정
              </span>
            </ProfileBox>

            <TextBox>{r?.content}</TextBox>

            <LikeCommentBox likeCnt={r?.likeCnt} commentCnt={r?.commentCnt} />
          </ReviewCard>
        ))}
      </ReviewCardCol>
    </>
  );
}

const ReviewCardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
`;

const ReviewCard = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;

  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  overflow: hidden;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.gray500};
    font-size: 12px;
    font-weight: 400;
  }
`;

const TextBox = styled.div`
  height: 28px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: ${(props) => props.theme.color.gray900};
  font-size: 14px;
  font-weight: 400;
`;
