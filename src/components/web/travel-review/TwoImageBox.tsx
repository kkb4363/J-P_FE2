import styled from "styled-components";
import ImageView from "../ImageView";

interface Props {
  images: string[];
}

export default function TwoImageBox({ images }: Props) {
  return (
    <TwoImageBoxContainer>
      {images.slice(0, 2).map((url, i) => (
        <ImageWrapper key={i}>
          <ImageView src={url} alt="img view" width="100%" height="191px" />
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

const TwoImageBoxContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
