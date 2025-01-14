import styled from "styled-components";
import MoreContainer from "../../../components/mobile/MoreContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPlaceList } from "../../../service/axios";
import { PlaceProps } from "../../../types/place";
import ImageView from "../../../components/ImageView";
import CarouselTitleBox from "../../../components/mobile/CarouselTitleBox";
import testImg from "../../../assets/images/testImg.png";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSkeleton from "../../../components/CustomSkeleton";

export default function More() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<PlaceProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const type = location?.state?.type;

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

  const getPlace = async () => {
    getPlaceList({ type: type, page: page }).then((res) => {
      const newData = res?.data.data;
      setData((p) => [...p, ...newData]);
      setHasMore(newData.length > 0);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPlace();
  }, [page]);

  return (
    <MoreContainer title={getTitle() + ""}>
      {data?.map((item: PlaceProps, index: number) => {
        if (data?.length === index + 1) {
          // 마지막 요소에 ref 설정
          return (
            <PlaceCardWithText key={item.id} ref={lastElementRef}>
              {item.photoUrl ? (
                <ImageView
                  handleClick={() => navigate(`/home/${item.placeId}`)}
                  src={item.photoUrl}
                  alt={item.name}
                  width="100%"
                  height="155px"
                  topText={type === "THEME" ? "여행지" : undefined}
                  bottomText={type === "CITY" ? item.name : undefined}
                />
              ) : (
                <CustomSkeleton
                  width="100%"
                  height="155px"
                  borderRadius="16px"
                />
              )}
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
              {item.photoUrl ? (
                <ImageView
                  handleClick={() => navigate(`/home/${item.placeId}`)}
                  src={item.photoUrl}
                  alt={item.name}
                  width="100%"
                  height="155px"
                  topText={type === "THEME" ? "여행지" : undefined}
                  bottomText={type === "CITY" ? item.name : undefined}
                />
              ) : (
                <CustomSkeleton
                  width="100%"
                  height="155px"
                  borderRadius="16px"
                />
              )}

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
