import { useState } from "react";
import styled from "styled-components";
import CancelIcon from "../../assets/icons/CancelIcon";
import Slider from "react-slick";

interface Props {
  imageList: string[];
  onClose: () => void;
}

export default function ImageModal({ imageList, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  console.log(currentIndex);

  return (
    <ImageModalContainer>
      <ImageModalHeader>
        <CancelIcon size="26" onClick={onClose} />
        <span>{`사진 ${currentIndex + 1} / ${imageList.length}`}</span>
        <EmptyBox />
      </ImageModalHeader>
      <ImageModalBody>
        <StyledSlider {...settings}>
          {imageList.map((url, i) => (
            <img key={i} src={url} alt={`slide-${i}`} width="100%" />
          ))}
        </StyledSlider>
      </ImageModalBody>
    </ImageModalContainer>
  );
}
const ImageModalContainer = styled.div`
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

const ImageModalHeader = styled.div`
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

const ImageModalBody = styled.div`
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
