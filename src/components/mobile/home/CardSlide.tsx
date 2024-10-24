import styled from "styled-components";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useEffect, useState } from "react";
import { getPlaceList } from "../../../utils/axios";
import { placeApiProps } from "../../../types/home";
import ImageView from "../../ImageView";
import testImg from "../../../assets/images/testImg.png";
import { useNavigate } from "react-router-dom";
import CarouselTitleBox from "../CarouselTitleBox";
import CustomSkeleton from "../../CustomSkeleton";

interface Props {
  placeType: string;
  bottomText?: boolean;
  topText?: boolean;
  isCity?: boolean;
}

export default function CardSlide({
  placeType,
  bottomText,
  topText,
  isCity,
}: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const requestApi = async () => {
    getPlaceList({ type: placeType }).then((res) => {
      setData(res?.data.data);
      setLoading(false);
    });
  };

  const handleClick = (placeId: string) => {
    isCity ? navigate(`city/${placeId}`) : navigate(`${placeId}`);
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <CarouselRow>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <CarouselWithText key={index}>
              <CustomSkeleton
                width="120px"
                height="120px"
                borderRadius="16px"
              />
            </CarouselWithText>
          ))
        : data?.map((item: placeApiProps) => (
            <CarouselWithText key={item.id}>
              <ImageView
                src={testImg}
                alt={item.name}
                handleClick={() => handleClick(item.placeId)}
                bottomText={bottomText ? item.name : ""}
                topText={topText ? "여행지" : ""}
              />
              {placeType !== "CITY" && (
                <CarouselTitleBox name={item.name} subName={item.subName} />
              )}
            </CarouselWithText>
          ))}
    </CarouselRow>
  );
}

const CarouselRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  ${scrollHidden};
`;

const CarouselWithText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 140px;
  max-width: 120px;
`;
