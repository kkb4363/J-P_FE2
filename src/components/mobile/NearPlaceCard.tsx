import styled from "styled-components";
import ImageView from "./ImageView";
import StarIcon from "../../assets/icons/StarIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import SmallRoundButton from "./SmallRoundButton";

interface Props {
  placeId: string;
  photoUrl: string;
  name: string;
  rating: number;
  handleClick?: () => void;
}

export default function NearPlaceCard({
  placeId,
  photoUrl,
  name,
  rating,
}: Props) {
  return (
    <NearPlaceBox key={placeId}>
      <ImageView width="60px" height="60px" src={photoUrl} alt={name} />

      <NearPlaceDetailCol>
        <p>{name}</p>

        <div>
          <StarIcon />
          {rating} | <span>주소보기</span>
        </div>
      </NearPlaceDetailCol>

      <SmallRoundButton>
        <PlusIcon />
        <span>추가</span>
      </SmallRoundButton>
    </NearPlaceBox>
  );
}

const NearPlaceBox = styled.div`
  height: 83px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NearPlaceDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0.8;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.048px;
  }

  & > div {
    color: ${(props) => props.theme.color.gray500};
    font-size: 12px;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.036px;

    display: flex;
    align-items: center;
    gap: 3px;
  }
`;
