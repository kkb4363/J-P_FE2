import styled from "styled-components";
import { testReviewItem } from "../../../utils/staticDatas";
import ReviewCard from "./../../../components/web/travel-review/ReviewCard";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { reviewApiProps } from "../../../types/home";
import LoadingText from "../../../components/LoadingText";

interface Props {
  sort: string;
}

export default function Review({ sort }: Props) {
  const [data, setData] = useState<reviewApiProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // [세연 TODO] : DB에 리뷰 데이터 들어오면 확인 후 수정
  const requestApi = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/reviews?page=${page}&sort=${sort}`);

      if (res.status === 200) {
        const newData = res.data.data;
        setData(newData);
        setHasMore(newData.length > 0);
      }
    } catch (error) {
      console.error("api error=", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(data, hasMore);

  const handleMoreClick = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    //requestApi();
    setData([testReviewItem]);
  }, [page, sort]);

  return (
    <>
      {isLoading && <LoadingText text="로딩중..." />}
      {!isLoading && data.length === 0 && (
        <LoadingText text="첫 리뷰를 작성해주세요!" />
      )}
      {!isLoading && (
        <ReviewContainer>
          {data.map((item, i) => {
            return <ReviewCard key={i} item={item} />;
          })}
          {hasMore && <MoreButton onClick={handleMoreClick}>더보기</MoreButton>}
        </ReviewContainer>
      )}
    </>
  );
}

const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const MoreButton = styled.button`
  width: fit-content;
  font-weight: 700;
  padding: 14px 44px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  &:active {
    background-color: ${(props) => props.theme.color.gray200};
  }
`;
