import styled from "styled-components";
import ImageView from "../../ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import CustomSkeleton from "../../CustomSkeleton";
import useImgLoading from "../../../hooks/useImgLoading";
import ActionButton from "../../ActionButton";

interface Props {
  photoUrl: string;
  name: string;
  rating: number;
  height?: string;
  handleDetails?: () => void;
}

export default function SurroundingPlaceCard({
  photoUrl,
  name,
  rating,
  height = "83px",
  handleDetails,
}: Props) {
  const { loading } = useImgLoading({ imgSrc: photoUrl });

  return (
    <NearPlaceBox $height={height}>
      <ImageView
        width="60px"
        height="60px"
        src={photoUrl}
        alt={name}
        minWidth="60px"
        minHeight="60px"
      />

      {loading && (
        <SkeletonBox>
          <CustomSkeleton width="62px" height="62px" borderRadius="8px" />
        </SkeletonBox>
      )}

      <NearPlaceDetailCol>
        <p>{name}</p>

        <div>
          <StarIcon />
          {rating} | <span onClick={handleDetails}>위치보기</span>
        </div>
      </NearPlaceDetailCol>

      <ActionButton>
        <PlusIcon />
        <span>추가</span>
      </ActionButton>
    </NearPlaceBox>
  );
}

export const NearPlaceBox = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height && $height};
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

export const NearPlaceDetailCol = styled.div`
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
