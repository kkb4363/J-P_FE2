import styled from "styled-components";
import ImageView from "./ImageView";
import StarIcon from "../../assets/icons/StarIcon";
import PlusIcon from "../../assets/icons/PlusIcon";

interface Props {
  photoUrl: string;
  name: string;
  rating: number;
  handleClick?: () => void;
  height?: string;
}

export default function NearPlaceCard({
  photoUrl,
  name,
  rating,
  height = "83px",
}: Props) {
  return (
    <NearPlaceBox $height={height}>
      <ImageView width="60px" height="60px" src={photoUrl} alt={name} />

      <NearPlaceDetailCol>
        <p>{name}</p>

        <div>
          <StarIcon />
          {rating} | <span>주소보기</span>
        </div>
      </NearPlaceDetailCol>

      <NearPlaceAddBtn>
        <PlusIcon />
        <span>추가</span>
      </NearPlaceAddBtn>
    </NearPlaceBox>
  );
}

const NearPlaceBox = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height && $height};
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
  gap: 6px;
  flex: 0.8;

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
