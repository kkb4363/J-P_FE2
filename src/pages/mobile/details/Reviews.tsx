import { useEffect, useState } from "react";
import styled from "styled-components";
import EditIcon from "../../../assets/icons/EditIcon";
import { scrollHidden } from "../../../assets/styles/home.style";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ReviewCard from "../../../components/mobile/ReviewCard";
import { getReviews } from "../../../service/axios";
import { ReviewProps } from "../../../types/travelreview";
import { useNavigate, useParams } from "react-router-dom";

export default function Reviews() {
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
    <>
      <CustomHeader title={`리뷰 ${reviews?.length}`}>
        <div onClick={() => navigate("/writeReview")}>
          <EditIcon />
        </div>
      </CustomHeader>

      <ReviewsBody>
        {reviews?.map((item, idx) => (
          <ReviewCard key={idx} item={item} />
        ))}
      </ReviewsBody>
    </>
  );
}

const ReviewsBody = styled.div`
  height: calc(100% - 60px);
  padding: 0 16px;
  overflow: scroll;
  ${scrollHidden};
`;
