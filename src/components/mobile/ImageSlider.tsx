import { useState } from "react";
import styled from "styled-components";
import CancelIcon from "../../assets/icons/CancelIcon";
import Slider from "react-slick";

interface Props {
  imageList: { fileId: string; fileUrl: string }[];
  onClose: () => void;
  focusIndex?: number;
}

export default function ImageSlider({
  imageList,
  onClose,
  focusIndex = 0,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(focusIndex);
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    initialSlide: focusIndex,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  return (
    <ImageSliderContainer>
      <ImageSliderHeader>
        <CancelIcon size="26" onClick={onClose} />
        <span>{`사진 ${currentIndex + 1} / ${imageList.length}`}</span>
        <EmptyBox />
      </ImageSliderHeader>
      <ImageSliderBody>
        <StyledSlider {...settings}>
          {imageList.map((image, i) => (
            <img key={i} src={image.fileUrl} alt={`slide-${i}`} width="100%" />
          ))}
        </StyledSlider>
      </ImageSliderBody>
    </ImageSliderContainer>
  );
}
const ImageSliderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.background};
  display: flex;
  flex-direction: column;
  z-index: 9;
`;

const ImageSliderHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0px 16px;
  position: relative;

  & > span {
    font-weight: 700;
    font-size: 20px;
    white-space: nowrap;
  }
`;

const EmptyBox = styled.div`
  width: 24px;
`;

const ImageSliderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: calc(100% - 140px);
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center; // 이미지가 정방향이 아닐 경우 가운데 위치
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-prev {
    left: 6px;
    z-index: 999;
  }
  .slick-next {
    right: 6px;
    z-index: 999;
  }
`;
