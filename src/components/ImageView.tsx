import styled from "styled-components";

interface Props {
  src: string;
  alt: string;
  topText?: string;
  bottomText?: string;
  width?: string;
  height?: string;
  pointer?: boolean;
  handleClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  minWidth?: string;
  minHeight?: string;
}

export default function ImageView({
  src,
  alt,
  topText,
  bottomText,
  width,
  height,
  pointer,
  handleClick,
  onLoad,
  onError,
  minWidth,
  minHeight,
}: Props) {
  return (
    <ImageViewContainer
      $width={width}
      $height={height}
      $pointer={pointer}
      $minWidth={minWidth}
      $minHeight={minHeight}
      onClick={handleClick}
    >
      <img src={src} alt={alt} onLoad={onLoad} onError={onError} />

      {!!topText && (
        <TopText>
          <span>{topText}</span>
        </TopText>
      )}

      {!!bottomText && (
        <BottomText>
          <span>{bottomText}</span>
        </BottomText>
      )}
    </ImageViewContainer>
  );
}

const ImageViewContainer = styled.div<{
  $width?: string;
  $height?: string;
  $pointer?: boolean;
  $minWidth?: string;
  $minHeight?: string;
}>`
  position: relative;
  cursor: ${({ $pointer }) => ($pointer ? "pointer" : "auto")};
  & > img {
    width: ${({ $width }) => ($width ? $width : "120px")};
    height: ${({ $height }) => ($height ? $height : "120px")};
    border-radius: 16px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    object-fit: cover;
  }

  min-width: ${(props) => props.$minWidth && props.$minWidth};
  min-height: ${(props) => props.$minHeight && props.$minHeight};
`;

const TopText = styled.div`
  position: absolute;
  top: 15px; // 필요하다면 임의
  right: 11px; // 여기도 똑같이
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  padding: 2px 8px;

  & > span {
    color: ${(props) => props.theme.color.gray900};
    text-align: center;
    font-size: 10px;
    font-weight: 400;
    line-height: 20px;
  }
`;

const BottomText = styled.div`
  position: absolute;
  bottom: 13px;
  right: 11px;
  height: 25px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }
`;
