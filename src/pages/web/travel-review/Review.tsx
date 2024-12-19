import { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingText from "../../../components/LoadingText";
import { getReviews } from "../../../service/axios";
import { ReviewProps } from "../../../types/travelreview";
import ReviewCard from "./../../../components/web/travel-review/ReviewCard";

interface Props {
  sort: string;
}

export default function Review({ sort }: Props) {
  const [data, setData] = useState<ReviewProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const requestApi = () => {
    setIsLoading(true);
    getReviews({ page, sort }).then((res) => {
      setData(res?.data.data);
      setHasMore(res?.data.data.length > 0);
      setIsLoading(false);
    });
  };

  const handleMoreClick = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    requestApi();
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
