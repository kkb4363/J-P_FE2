import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReviewCard from "../../../components/mobile/ReviewCard";
import { getReviews } from "../../../service/axios";
import { ReviewProps } from "../../../types/travelreview";

interface Props {
  sort: string;
}

export default function Review({ sort }: Props) {
  const [data, setData] = useState<ReviewProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const requestApi = () => {
    setLoading(true);

    getReviews({ page, sort }).then((res) => {
      setData(res?.data.data);
      setHasMore(res?.data.data.length > 0);
      setLoading(false);
    });
  };

  // 마지막 요소 감지 후 페이지 증가
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1); // 페이지 증가
          }
        },
        {
          threshold: 0.5, // 요소의 50% 이상이 보여야 트리거
        }
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  useEffect(() => {
    requestApi();
  }, [page, sort]);

  return (
    <ReviewContainer>
      {data.length === 0 && !loading && (
        <NoResultsText>첫 리뷰를 작성해주세요!</NoResultsText>
      )}
      {loading && <NoResultsText>로딩중...</NoResultsText>}
      {!loading &&
        data?.map((item: ReviewProps, index: number) => {
          if (data.length === index + 1) {
            // 마지막 요소에 ref 설정
            return (
              <ReviewCard key={item.id} item={item} divRef={lastElementRef} />
            );
          } else {
            return <ReviewCard key={item.id} item={item} />;
          }
        })}
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  padding: 0 16px;
  margin: 16px 0 6px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const NoResultsText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  color: ${(props) => props.theme.color.gray300};
`;
