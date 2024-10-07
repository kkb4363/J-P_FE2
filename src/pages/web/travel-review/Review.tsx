import styled from "styled-components";
import { testReviewItem } from "../../../utils/staticDatas";
import ReviewCard from "./../../../components/web/travel-review/ReviewCard";

export default function Review() {
  return (
    <ReviewContainer>
      <ReviewCard item={testReviewItem} />
      <ReviewCard item={testReviewItem} />
      <ReviewCard item={testReviewItem} />
      <ReviewCard item={testReviewItem} />
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  display: flex;
	flex-direction: column;
  gap: 16px;
`;
