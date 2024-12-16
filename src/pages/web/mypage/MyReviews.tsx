import styled from "styled-components";
import { useEffect, useState } from "react";
import { getMyReviews } from "../../../service/axios";
import ReviewCard from "../../../components/web/mypage/ReviewCard";
import NotHasCard from "../../../components/web/mypage/NotHasCard";
import { MyReviewProps } from "../../../types/mypage";

export default function MyReviews() {
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
      <MyPageTitle>내 작성 리뷰 {reviews?.length}</MyPageTitle>
      {reviews?.length !== 0 ? (
        <ReviewCardRow>
          {reviews?.map((r: MyReviewProps) => (
            <ReviewCard key={r.id} data={r} />
          ))}
        </ReviewCardRow>
      ) : (
        <NotHasCard
          text="내 리뷰가 없어요. 새로운 리뷰를 작성해주세요!"
          noButton={true}
        />
      )}
    </>
  );
}

export const MyPageTitle = styled.h1`
  color: ${(props) => props.theme.color.gray900};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const ReviewCardRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;
