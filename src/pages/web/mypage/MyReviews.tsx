import styled from "styled-components";
import testImg from "../../../assets/images/testImg.png";
import CustomProfile from "../../../components/CustomProfile";
import LikeCommentBox from "../../../components/LikeCommentBox";
import { useEffect } from "react";
import { getMyReviews } from "../../../service/axios";
import ReviewCard from "../../../components/web/mypage/ReviewCard";
import NotHasCard from "../../../components/web/mypage/NotHasCard";

export default function MyReviews() {
  useEffect(() => {
    getMyReviews().then((res) => {
      if (res) {
        console.log(res);
      }
    });
  }, []);

  return (
    <>
      <MyPageTitle>내 작성 리뷰 2</MyPageTitle>
      {/* <ReviewCardRow>
        <ReviewCard />
      </ReviewCardRow> */}

      <NotHasCard
        text="내 리뷰가 없어요. 새로운 리뷰를 작성해주세요!"
        noButton={true}
      />
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
