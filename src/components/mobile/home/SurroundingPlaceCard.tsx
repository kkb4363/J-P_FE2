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
  handleClick: () => void;
}

export default function SurroundingPlaceCard({
  photoUrl,
  name,
  rating,
  height = "83px",
  handleDetails,
  handleClick,
}: Props) {
  const { loading } = useImgLoading({ imgSrc: photoUrl });

  return (
    <SurroundingPlaceCardContainer $height={height}>
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

      <InfoCol>
        <p>{name}</p>

        <article>
          <StarIcon />
          {rating} | <span onClick={handleDetails}>위치보기</span>
        </article>
      </InfoCol>

      <ActionButton onClick={handleClick}>
        <PlusIcon />
        <span>추가</span>
      </ActionButton>
    </SurroundingPlaceCardContainer>
  );
}

export const SurroundingPlaceCardContainer = styled.aside<{ $height: string }>`
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

const SkeletonBox = styled.section`
  position: absolute;
  left: 10px;
`;

export const InfoCol = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0.8;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    width: 142px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & > article {
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
