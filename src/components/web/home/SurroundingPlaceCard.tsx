import styled from "styled-components";
import StarIcon from "../../../assets/icons/StarIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import CustomSkeleton from "../../mobile/CustomSkeleton";
import useImgLoading from "../../../hooks/useImgLoading";

interface Props {
  imgSrc: string;
  title: string;
  rating: string;
}

export default function SurroundingPlaceCard({ imgSrc, title, rating }: Props) {
  const { loading } = useImgLoading({ imgSrc: imgSrc });

  return (
    <SurroundingPlaceCardContainer>
      {loading ? (
        <CustomSkeleton width="224px" height="95px" borderRadius="16px" />
      ) : (
        <img src={imgSrc} alt="surrounding-place-img" />
      )}
      <SurroundingPlaceCardBottomBox>
        <p>{title}</p>
        <div>
          <StarIcon width="14" height="14" />
          &nbsp; {rating} | 위치보기
        </div>
        <SurrondingPlaceAddButton>
          <PlusIcon />
          <span>추가</span>
        </SurrondingPlaceAddButton>
      </SurroundingPlaceCardBottomBox>
    </SurroundingPlaceCardContainer>
  );
}

const SurroundingPlaceCardContainer = styled.div`
  width: 224px;
  height: 190px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  & > img {
    width: 100%;
    height: 100px;
    border-radius: 16px 16px 0 0;
    object-fit: cover;
  }
`;

const SurroundingPlaceCardBottomBox = styled.div`
  border-radius: 0 0 16px 16px;
  padding: 13px 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90px;
  position: relative;
  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }

  & > div {
    color: ${(props) => props.theme.color.gray500};
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
`;

const SurrondingPlaceAddButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 18px;
  padding: 6px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
    font-weight: 700;
  }
`;
