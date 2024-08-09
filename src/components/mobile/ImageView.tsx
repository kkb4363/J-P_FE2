import styled from "styled-components";

interface Props {
  src: string;
  alt: string;
  topText?: string;
  bottomText?: string;
  width?: string;
  height?: string;
}

export default function ImageView({
  src,
  alt,
  topText,
  bottomText,
  width,
  height,
}: Props) {
  return (
    <ImageViewContainer $width={width} $height={height}>
      <img src={src} alt={alt} />

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

const ImageViewContainer = styled.div<{ $width?: string; $height?: string }>`
  position: relative;

  & > img {
    width: ${({ $width }) => ($width ? $width : "120px")};
    height: ${({ $height }) => ($height ? $height : "120px")};
    border-radius: 16px;
  }
`;

const TopText = styled.div`
  position: absolute;
  top: 15px; // 필요하다면 임의
  right: 11px; // 여기도 똑같이
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  padding: 2px 8px;

  & > span {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
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
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
  }
`;
