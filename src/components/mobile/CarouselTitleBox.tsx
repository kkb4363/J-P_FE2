import styled from "styled-components";

interface Props {
  paddingLeft?: string;
  name: string;
  subName: string;
}
export default function CarouselTitleBox({
  paddingLeft,
  name,
  subName,
}: Props) {
  return (
    <CarouselTitleContainer $paddingLeft={paddingLeft}>
      <CarouselTitle>{name}</CarouselTitle>
      <CarouselLocationTitle>{subName}</CarouselLocationTitle>
    </CarouselTitleContainer>
  );
}

const CarouselTitleContainer = styled.div<{ $paddingLeft?: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: ${({ $paddingLeft }) =>
    $paddingLeft ? $paddingLeft : "6px"};
`;

export const CarouselTitle = styled.span`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const CarouselLocationTitle = styled.span`
  color: #666;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;
