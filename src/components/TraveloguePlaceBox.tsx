import styled from "styled-components";
import MarkIcon from "../assets/icons/MarkIcon";

interface Props {
  place: string;
}

export default function TraveloguePlaceBox({ place }: Props) {
  return (
    <PlaceBox>
      <MarkIcon fill="#806cff" stroke="#fff" />
      <span>{place}</span>
    </PlaceBox>
  );
}

const PlaceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 6px;
	
  & > span {
    font-weight: 700;
    font-size: 14px;
  }
`;
