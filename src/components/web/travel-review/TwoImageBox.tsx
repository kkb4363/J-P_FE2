import styled from "styled-components";
import ImageView from "../ImageView";
import { useState } from "react";
import CustomSkeleton from "../../CustomSkeleton";

interface Props {
  images: { fileId: string; fileUrl: string }[];
}

export default function TwoImageBox({ images }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TwoImageBoxContainer $isOne={images.length == 1}>
      {images.slice(0, 2).map((image, i) => (
        <ImageWrapper key={i}>
          {isLoading && (
            <CustomSkeleton width="100%" height="191px" borderRadius="16px" />
          )}
          <ImageView
            src={image.fileUrl}
            alt="img view"
            width="100%"
            height="191px"
            onLoad={() => setIsLoading(false)}
          />
          {i === 1 && (
            <ImageOverlay>
              <span>{`+ ${images.length - 1}`}</span>
            </ImageOverlay>
          )}
        </ImageWrapper>
      ))}
    </TwoImageBoxContainer>
  );
}

const TwoImageBoxContainer = styled.div<{ $isOne: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ $isOne }) => ($isOne ? "1fr" : "1fr 1fr")};
  grid-gap: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  border-radius: 16px;

  display: grid;
  place-items: center;
  & > span {
    font-weight: 700;
    font-size: 12px;
    color: ${(props) => props.theme.color.white};
  }
`;
