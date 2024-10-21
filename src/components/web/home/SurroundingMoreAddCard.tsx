import styled from "styled-components";
import ImageView from "../ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import useImgLoading from "../../../hooks/useImgLoading";
import CustomSkeleton from "../../CustomSkeleton";

interface Props {
  imgSrc: string;
  name: string;
  subName: string;
  rating: number;
}

export default function SurroundingMoreAddCard({
  imgSrc,
  name,
  subName,
  rating,
}: Props) {
  const { loading } = useImgLoading({ imgSrc: imgSrc });

  return (
    <MoreAddCardContainer>
      {loading ? (
        <CustomSkeleton width="90px" height="95px" borderRadius="16px" />
      ) : (
        <ImageView src={imgSrc} alt="이미지없음" width="90px" height="95px" />
      )}
      <MoreAddCardTextCol>
        <div>
          <span>주변 여행지</span>
        </div>
        <p>{name}</p>
        <span>{subName}</span>
      </MoreAddCardTextCol>
      <MoreAddCardAddBox>
        <div>
          <StarIcon width="14" height="14" />
          <span>{rating}</span>
        </div>
        <button>
          <span>+ 추가</span>
        </button>
      </MoreAddCardAddBox>
    </MoreAddCardContainer>
  );
}

const MoreAddCardContainer = styled.div`
  width: 342px;
  height: 118px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  padding: 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 11px;
`;

const MoreAddCardTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 12px;
  flex: 1;

  & > div {
    width: 75px;
    padding: 4px 8px;
    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.gray700};
    display: flex;
    justify-content: center;
    align-items: center;

    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 12px;
    }
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
  }
`;

const MoreAddCardAddBox = styled.div`
  height: 100%;
  padding: 0px 0 37px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 18px;

  & > div {
    display: flex;
    align-items: center;
    & > span {
      color: ${(props) => props.theme.color.gray600};
      font-size: 12px;
    }
  }

  & > button {
    width: 65px;
    height: 33px;
    padding: 8px 15px;
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
  }
`;
