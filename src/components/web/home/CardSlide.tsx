import Carousel from "react-multi-carousel";
import styled, { keyframes } from "styled-components";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import { axiosInstance } from "../../../utils/axios";
import { useEffect, useState } from "react";
import { placeApiProps } from "../../../types/home";
import { useNavigate } from "react-router-dom";
import PlaceCard from "./PlaceCard";

export interface ReactMultiCarouselProps {
  [key: string]: {
    breakpoint: { max: number; min: number };
    items: number;
    slidesToSlide: number;
  };
}

export const CustomLeftArrow = ({ onClick }: { onClick: any }) => (
  <CustomArrow style={{ left: 0 }} onClick={onClick}>
    <ArrowLeftIcon />
  </CustomArrow>
);
export const CustomRightArrow = ({ onClick }: { onClick: any }) => {
  return (
    <CustomArrow style={{ right: 0 }} onClick={onClick}>
      <ArrowRightIcon stroke="black" />
    </CustomArrow>
  );
};

interface Props {
  responsive: ReactMultiCarouselProps;
  placeType: string;
  bottomText?: boolean;
  topText?: boolean;
  title?: boolean;
  subTitle?: boolean;
  isCity?: boolean;
}

export default function CardSlide({
  responsive,
  placeType,
  title,
  subTitle,
  bottomText,
  topText,
  isCity,
}: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const requestApi = async () => {
    try {
      const data = await axiosInstance.get(
        `/place/page?page=1&placeType=${placeType}`
      );
      setData(data.data.data);
      setLoading(false);
    } catch (error) {
      console.error("cardSlide api error=", error);
    }
  };

  const handleClick = (placeId: string) => {
    isCity ? navigate(`city/${placeId}`) : navigate(`${placeId}`);
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      showDots={false}
      ssr={false}
      infinite={false}
      autoPlay={false}
      customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
      customRightArrow={<CustomRightArrow onClick={() => {}} />}
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <CustomSkeleton key={index} />
          ))
        : data?.map((item: placeApiProps) => (
            <PlaceCard
              bottomText={bottomText ? item.name : ""}
              topText={topText ? "여행지" : ""}
              title={title ? item.name : ""}
              subTitle={subTitle ? item.subName : ""}
              handleClick={() => handleClick(`${item.placeId}`)}
            />
          ))}
    </Carousel>
  );
}

const CustomArrow = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;

  position: absolute;
`;

const customSkeletonAnimation = keyframes`
    0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }

`;

const CustomSkeleton = styled.div`
  width: 95%;
  height: 250px;
  border-radius: 16px;
  animation: ${customSkeletonAnimation} 1.8s ease-in-out infinite;
  background: linear-gradient(to right, #eeeeee 0%, #dddddd 50%, #eeeeee 100%);
  background-size: 400% 100%;
`;
