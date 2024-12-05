import styled from "styled-components";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useEffect, useState } from "react";
import { getPlaceList } from "../../../service/axios";
import { PlaceProps } from "../../../types/place";
import ImageView from "../../ImageView";
import testImg from "../../../assets/images/testImg.png";
import { useNavigate } from "react-router-dom";
import CarouselTitleBox from "../CarouselTitleBox";
import CustomSkeleton from "../../CustomSkeleton";

interface Props {
  placeType: string;
  bottomText?: boolean;
  topText?: boolean;
}

export default function CardSlide({ placeType, bottomText, topText }: Props) {
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
    navigate(`${placeId}`);
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <CardSlideContainer>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <CardBox key={index}>
              <CustomSkeleton
                width="120px"
                height="120px"
                borderRadius="16px"
              />
            </CardBox>
          ))
        : data?.map((item: PlaceProps) => (
            <CardBox key={item.id}>
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
            </CardBox>
          ))}
    </CardSlideContainer>
  );
}

const CardSlideContainer = styled.section`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  ${scrollHidden};
`;

const CardBox = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 140px;
  max-width: 120px;
`;
