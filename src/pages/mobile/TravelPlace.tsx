import styled from "styled-components";
import MoreContainer from "../../components/mobile/MoreContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { placeApiProps } from "../../types/home";
import ImageView from "../../components/mobile/ImageView";
import CarouselTitleBox from "../../components/mobile/CarouselTitleBox";

export default function TravelPlace() {
  const [travelPlace, setTravelPlace] = useState<placeApiProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const requestApi = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/place/page?page=${page}&placeType=TRAVEL_PLACE`
        );

        if (response.status === 200) {
          const newData = response.data.data;
          setTravelPlace((prev) => [...prev, ...newData]);
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
    <MoreContainer title="인기 여행지">
      {travelPlace.map((item: placeApiProps, index: number) => {
        if (travelPlace.length === index + 1) {
          // 마지막 요소에 ref 설정
          return (
            <PlaceCardWithText key={item.id} ref={lastElementRef}>
              <ImageView
                src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
                alt={item.name}
                width="164px"
                height="155px"
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
                src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
                alt={item.name}
                width="164px"
                height="155px"
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
