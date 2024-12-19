import styled from "styled-components";

interface Props {
  paddingLeft?: string;
  name?: string;
  subName?: string;
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
  padding-left: ${({ $paddingLeft }) => ($paddingLeft ? $paddingLeft : "6px")};
`;

export const CarouselTitle = styled.span`
  color: ${(props) => props.theme.color.gray900};
  font-size: 14px;
  font-weight: 700;
`;

export const CarouselLocationTitle = styled.span`
  color: ${(props) => props.theme.color.gray600};
  font-size: 12px;
  font-weight: 700;
`;
