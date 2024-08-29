import styled from "styled-components";
import EditIcon from "../../../assets/icons/EditIcon";
import CustomHeader from "../../../components/mobile/CustomHeader";
import { useEffect, useRef, useState } from "react";
import { reviewApiProps } from "../../../types/home";
import { axiosInstance } from "../../../utils/axios";
import ReviewCard from "../../../components/mobile/ReviewCard";
import { scrollHidden } from "../../../assets/styles/home.style";

export default function Reviews() {
  const [data, setData] = useState<reviewApiProps[]>([]);

  const requestApi = async () => {
    try {
      const res = await axiosInstance.get(`/reviews?page=1&sort=HOT`);

      if (res.status === 200) {
        const newData = res.data.data;
        setData(newData);
      }
    } catch (error) {
      console.error("api error=", error);
    } finally {
    }
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
  height: calc(100% - 50px - 10px);
  padding: 0 16px;
  overflow: scroll;
  ${scrollHidden};
`;
