import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ArrowLeftIcon from "./../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";

export default function ImageViewer() {
  const location = useLocation();

  const { currentIndex, images } = location.state || {
    currentIndex: 0,
    images: [],
  };
  const [index, setIndex] = useState(currentIndex);

  const handlePrev = () => {
    setIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev: number) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <ViewerContainer>
      <ViewerContent onClick={(e) => e.stopPropagation()}>
        <ArrowButton onClick={handlePrev}>
          <ArrowLeftIcon />
        </ArrowButton>
        <ImageWrapper>
          <img src={images[index]} alt={`image-${index}`} />
        </ImageWrapper>
        <ArrowButton onClick={handleNext}>
          <ArrowRightIcon stroke="#1A1A1A" />
        </ArrowButton>
      </ViewerContent>

      <ThumbnailList>
        {images.map((imgSrc: string, imgIndex: number) => (
          <Thumbnail
            key={imgIndex}
            onClick={() => handleThumbnailClick(imgIndex)}
            $isActive={imgIndex === index}
          >
            <img src={imgSrc} alt={`thumbnail-${imgIndex}`} />
          </Thumbnail>
        ))}
      </ThumbnailList>
    </ViewerContainer>
  );
}

const ViewerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
	overflow-y: auto;
  background-color: ${(props) => props.theme.color.black};
  display: flex;
  flex-direction: column;
	justify-content: center;
  align-items: center;
`;

const ViewerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
	
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 60vw;

  & > img {
    height: 100%;
    object-fit: contain;
  }
`;

const ArrowButton = styled.button`
  width: 45px;
  height: 45px;
  display: grid;
  place-content: center;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 99px;
	z-index: 10;

  &:hover {
    background-color: ${(props) => props.theme.color.gray200};
  }
`;

const ThumbnailList = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  max-width: 80vw;
`;

const Thumbnail = styled.div<{ $isActive: boolean }>`
  width: 100px;
  height: 75px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${(props) =>
      props.$isActive ? "brightness(1)" : "brightness(0.5)"};
    transition: filter 0.2s ease-in-out;
  }

  &:hover {
    filter: brightness(1);
  }
`;
