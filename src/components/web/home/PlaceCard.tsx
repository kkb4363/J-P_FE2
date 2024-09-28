import ImageView from "../ImageView";
import testImg from "../../../assets/images/testImg2.png";
import styled from "styled-components";

interface Props {
  bottomText?: string;
  topText?: string;
  title?: string;
  subTitle?: string;
  handleClick?: () => void;
}

export default function PlaceCard({
  bottomText,
  topText,
  title,
  subTitle,
  handleClick,
}: Props) {
  return (
    <PlaceCardContainer>
      <ImageView
        src={testImg}
        alt="image"
        width="100%"
        height="100%"
        minHeight="240px"
        bottomText={bottomText}
        topText={topText}
        pointer={true}
        handleClick={handleClick}
      />
      {title && <p>{title}</p>}
      {subTitle && <span>{subTitle}</span>}
    </PlaceCardContainer>
  );
}

const PlaceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: center;
  justify-content: center;
  gap: 8px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  & > span {
    color: ${(props) => props.theme.color.gray600};
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
`;
