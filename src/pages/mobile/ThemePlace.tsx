import styled from "styled-components";
import MoreContainer from "../../components/mobile/MoreContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { placeApiProps } from "../../types/home";
import ImageView from "../../components/mobile/ImageView";
import CarouselTitleBox from "../../components/mobile/CarouselTitleBox";
import { testImg1 } from "../../utils/staticDatas";

export default function ThemePlace() {
  const [themePlace, setThemePlace] = useState<placeApiProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const requestApi = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/place/page?page=${page}&placeType=THEME`
        );

        if (response.status === 200) {
          const newData = response.data.data;
          setThemePlace((prev) => [...prev, ...newData]);
          setHasMore(newData.length > 0);
        }
      } catch (error) {
        console.error("api error=", error);
      } finally {
        setLoading(false);
      }
    };
    requestApi();
  }, [page]);

  // 마지막 요소 감지 후 페이지 증가
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  return (
    <MoreContainer title="테마 여행지">
      {themePlace.map((item: placeApiProps, index: number) => {
        if (themePlace.length === index + 1) {
          // 마지막 요소에 ref 설정
          return (
            <PlaceCardWithText key={item.id} ref={lastElementRef}>
              <ImageView
                src={testImg1}
                alt={item.name}
                width="164px"
                height="155px"
                topText="여행지"
              />
              <CarouselTitleBox
                paddingLeft="8px"
                name={item.name}
                subName={item.subName}
              />
            </PlaceCardWithText>
          );
        } else {
          return (
            <PlaceCardWithText key={item.id}>
              <ImageView
                src={testImg1}
                alt={item.name}
                width="164px"
                height="155px"
                topText="여행지"
              />

              <CarouselTitleBox
                paddingLeft="8px"
                name={item.name}
                subName={item.subName}
              />
            </PlaceCardWithText>
          );
        }
      })}
    </MoreContainer>
  );
}

const PlaceCardWithText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
