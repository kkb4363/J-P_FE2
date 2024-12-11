import { useEffect, useRef, useState } from "react";
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

  const requestApi = async () => {
    setIsLoading(true);

    await getAllDiaries(page, sort).then((res) => {
      setData(res?.data.data);
      setHasMore(res?.data.data.length > 0);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    requestApi();
  }, [page, sort]);

  return (
    <TravelogueContainer>
      {data &&
        data.map((item, idx) => {
          return <TravelogueCard item={item} key={idx} />;
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
