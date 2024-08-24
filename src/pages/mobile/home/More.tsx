import styled from "styled-components";
import MoreContainer from "../../../components/mobile/MoreContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { placeApiProps } from "../../../types/home";
import ImageView from "../../../components/mobile/ImageView";
import CarouselTitleBox from "../../../components/mobile/CarouselTitleBox";
import testImg from "../../../assets/images/testImg.png";
import { useLocation } from "react-router-dom";

export default function More() {
  const location = useLocation();
  const [data, setData] = useState<placeApiProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const type = location?.state?.type;

  console.log(type);

  const getTitle = () => {
    switch (type) {
      case "TRAVEL_PLACE":
        return "인기 여행지";
      case "CITY":
        return "인기 도시";
      case "THEME":
        return "테마 여행지";
    }
  };

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

  // const requestApi = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/place/page?page=${page}&placeType=${type}`);

  //     if (res.status === 200) {
  //       const newData = res.data.data;
  //       setData((prev) => [...prev, ...newData]);
  //       setHasMore(newData.length > 0);
  //     }
  //   } catch (error) {
  //     console.error("api error=", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   requestApi();
  // }, [page]);

  return (
    <MoreContainer title={getTitle() + ""}>
      {/* {data?.map((item: placeApiProps, index: number) => {
        if (data?.length === index + 1) {
          // 마지막 요소에 ref 설정
          return (
            <PlaceCardWithText key={item.id} ref={lastElementRef}>
              <ImageView
                src={testImg}
                alt={item.name}
                width="100%"
                height="155px"
                topText={type === "THEME" ? "여행지" : undefined}
                bottomText={type === "CITY" ? item.name : undefined}
              />
              {type !== "CITY" && (
                <CarouselTitleBox
                  paddingLeft="8px"
                  name={item.name}
                  subName={item.subName}
                />
              )}
            </PlaceCardWithText>
          );
        } else {
          return (
            <PlaceCardWithText key={item.id}>
              <ImageView
                src={testImg}
                alt={item.name}
                width="100%"
                height="155px"
                topText={type === "THEME" ? "여행지" : undefined}
                bottomText={type === "CITY" ? item.name : undefined}
              />

              {type !== "CITY" && (
                <CarouselTitleBox
                  paddingLeft="8px"
                  name={item.name}
                  subName={item.subName}
                />
              )}
            </PlaceCardWithText>
          );
        }
      })} */}

      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
        <PlaceCardWithText key={idx}>
          <ImageView
            src={testImg}
            alt={item + ""}
            width="100%"
            height="156px"
            topText="여행지"
          />

          <CarouselTitleBox
            paddingLeft="8px"
            name={item + ""}
            subName={item + "test"}
          />
        </PlaceCardWithText>
      ))}
    </MoreContainer>
  );
}

const PlaceCardWithText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
