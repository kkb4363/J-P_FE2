import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TravelogueCard from "../../../components/mobile/travelReview/TravelogueCard";
import { getAllDiaries } from "../../../service/axios";
import { TravelogProps } from "../../../types/travelreview";

interface Props {
  sort: string;
}

export default function Travelogue({ sort }: Props) {
  const [data, setData] = useState<TravelogProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const requestApi = useCallback(() => {
    if (data?.length === 0) setIsLoading(true);

    getAllDiaries(page, sort)
      .then((res) => {
        setData((prevData) => [...prevData, ...res?.data.data]);
        setHasMore(res?.data.data.length > 0);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [page, sort]);

  // 마지막 요소 감지 후 페이지 증가
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
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
    [hasMore, isLoading]
  );

  useEffect(() => {
    requestApi();
  }, [requestApi]);

  return (
    <TravelogueContainer>
      {data.length === 0 && !isLoading && (
        <NoResultsText>여행기를 작성해주세요!</NoResultsText>
      )}
      {isLoading && <NoResultsText>로딩중...</NoResultsText>}
      {!isLoading &&
        data?.map((item: TravelogProps, index: number) => {
          if (data.length === index + 1) {
            return (
              <TravelogueCard
                key={item.id}
                item={item}
                divRef={lastElementRef}
              />
            );
          } else {
            return <TravelogueCard key={item.id} item={item} />;
          }
        })}
    </TravelogueContainer>
  );
}

const TravelogueContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  padding: 0 16px;
  margin: 16px 0 6px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  white-space: nowrap;
`;

const NoResultsText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  color: ${(props) => props.theme.color.gray300};
`;
