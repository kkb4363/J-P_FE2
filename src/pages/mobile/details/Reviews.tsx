import { useEffect, useState } from "react";
import styled from "styled-components";
import EditIcon from "../../../assets/icons/EditIcon";
import { scrollHidden } from "../../../assets/styles/home.style";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ReviewCard from "../../../components/mobile/ReviewCard";
import { getReviews } from "../../../service/axios";
import { ReviewProps } from "../../../types/travelreview";

export default function Reviews() {
  const [data, setData] = useState<ReviewProps[]>([]);

  const requestApi = async () => {
    getReviews({ page: 1, sort: "HOT" }).then((res) => {
      setData(res?.data.data);
    });
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <>
      <CustomHeader title="리뷰 14">
        <EditIcon />
      </CustomHeader>

      <ReviewsBody>
        {data.map((item, idx) => (
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
