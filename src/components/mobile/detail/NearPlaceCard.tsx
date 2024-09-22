import styled from "styled-components";
import PlusIcon from "../../../assets/icons/PlusIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import ImageView from "../ImageView";
import { useState } from "react";
import CustomSkeleton from "../CustomSkeleton";

interface Props {
  photoUrl: string;
  name: string;
  rating: number;
  vicinity: string;
  height?: string;
}

export default function NearPlaceCard({
  photoUrl,
  name,
  rating,
  vicinity,
  height = "83px",
}: Props) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <NearPlaceBox $height={height}>
      <ImageView
        width="80px"
        height="80px"
        src={photoUrl}
        alt={"not"}
        onLoad={() => setImgLoading(false)}
        minWidth="80px"
        minHeight="80px"
      />

      {imgLoading && (
        <SkeletonBox>
          <CustomSkeleton width="82px" height="82px" borderRadius="8px" />
        </SkeletonBox>
      )}

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
  min-height: ${({ $height }) => $height && $height};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 10px;
`;

const SkeletonBox = styled.div`
  position: absolute;
  left: 10px;
`;

const NearPlaceDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 0.8;
  overflow: hidden;

  & > div:first-child {
    display: inline-flex;
    padding: 1px 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.gray700};
    background: ${(props) => props.theme.color.white};

    width: auto;
    align-self: flex-start;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.048px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

const NearPlaceAddBtn = styled.button`
  display: flex;
  width: 66px;
  height: 34px;
  padding: 8px 12px;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};
  background: ${(props) => props.theme.color.white};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    text-align: center;
    font-size: 14px;

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
    color: ${(props) => props.theme.color.gray500};
    font-size: 12px;

    font-weight: 400;
    line-height: 140%; /* 16.8px */
  }
`;
