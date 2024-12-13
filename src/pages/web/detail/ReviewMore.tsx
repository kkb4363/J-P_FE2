import styled from "styled-components";
import EditIcon from "../../../assets/icons/EditIcon";
import { useEffect, useState } from "react";
import { getReviews } from "../../../service/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewProps } from "../../../types/travelreview";
import ReviewCard from "../../../components/web/travel-review/ReviewCard";

export default function ReviewMore() {
  const param = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  const requestReviews = () => {
    getReviews({ page: 1, sort: "NEW", placeId: param?.placeId }).then(
      (res) => {
        if (res) {
          setReviews(res?.data.data);
        }
      }
    );
  };

  useEffect(() => {
    if (param?.placeId) {
      requestReviews();
    }
  }, [param?.placeId]);

  return (
    <ReviewMoreContainer>
      <h1>
        리뷰 14
        <div onClick={() => navigate("/home/writeReview")}>
          <EditIcon stroke="black" width="24" height="24" />
        </div>
      </h1>

      {reviews.map((item, i) => {
        return <ReviewCard key={i} item={item} />;
      })}
    </ReviewMoreContainer>
  );
}

const ReviewMoreContainer = styled.section`
  padding-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${(props) => props.theme.color.black};
    font-size: 32px;
    font-weight: 700;

    margin-bottom: 40px;

    & > div > svg {
      cursor: pointer;
    }
  }
`;
