import styled from "styled-components";
import ImageView from "./ImageView";
import StarIcon from "../../assets/icons/StarIcon";
import PlusIcon from "../../assets/icons/PlusIcon";

interface Props {
  placeId: string;
  photoUrl: string;
  name: string;
  rating: number;
  handleClick?: () => void;
  vicinity: string;
  height?: string;
}

export default function NearPlaceCard2({
  placeId,
  photoUrl,
  name,
  rating,
  vicinity,
  height = "83px",
}: Props) {
  return (
    // key 여기선 필요없음 나중에 삭제하기
    <NearPlaceBox key={placeId} $height={height}>
      <ImageView width="80px" height="80px" src={photoUrl} alt={"이미지없음"} />

      <NearPlaceDetailCol>
        <div>주변 여행지</div>

        <p>{name}</p>

        <div>
          <span>{vicinity}</span>
        </div>
      </NearPlaceDetailCol>

      <ButtonCol>
        <RatingBox>
          <StarIcon />
          <span>{rating}</span>
        </RatingBox>

        <NearPlaceAddBtn>
          <PlusIcon />
          <span>추가</span>
        </NearPlaceAddBtn>
      </ButtonCol>
    </NearPlaceBox>
  );
}

const NearPlaceBox = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height && $height};
  max-height: ${({ $height }) => $height && $height};
  min-height: ${({ $height }) => $height && $height};
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NearPlaceDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 0.8;

  & > div:first-child {
    display: inline-flex;
    padding: 1px 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    border-radius: 16px;
    border: 1px solid #4d4d4d;
    background: #fff;

    width: auto;
    align-self: flex-start;
  }

  & > p {
    color: #1a1a1a;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.048px;
  }

  & > div {
    color: #808080;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.036px;

    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

const NearPlaceAddBtn = styled.button`
  display: flex;
  width: 66px;
  height: 34px;
  padding: 8px 12px;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 30px;
  border: 1px solid #4d4d4d;
  background: #fff;

  & > span {
    color: #4d4d4d;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.6px;
    white-space: nowrap;
  }
`;

const ButtonCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  & > span {
    color: #808080;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 16.8px */
  }
`;
