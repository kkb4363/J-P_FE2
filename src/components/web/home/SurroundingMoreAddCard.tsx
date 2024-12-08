import styled from "styled-components";
import ImageView from "../ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import useImgLoading from "../../../hooks/useImgLoading";
import CustomSkeleton from "../../CustomSkeleton";
import { GooglePlaceProps } from "../../../types/place";

interface Props {
  data: GooglePlaceProps;
  handleAdd: () => void;
  setFocusCenterId: (id: string) => void;
}

export default function SurroundingMoreAddCard({
  data,
  handleAdd,
  setFocusCenterId,
}: Props) {
  const { loading } = useImgLoading({ imgSrc: data.photoUrl });

  return (
    <MoreAddCardContainer onClick={() => setFocusCenterId(data.placeId)}>
      {loading ? (
        <CustomSkeleton width="90px" height="95px" borderRadius="16px" />
      ) : (
        <ImageView
          src={data.photoUrl}
          alt="이미지없음"
          width="90px"
          height="95px"
        />
      )}
      <MoreAddCardTextCol>
        <div>
          <span>주변 여행지</span>
        </div>
        <p>{data.name}</p>
        <span>{data.shortAddress}</span>
      </MoreAddCardTextCol>
      <MoreAddCardAddBox>
        <div>
          <StarIcon width="14" height="14" />
          <span>{data.rating}</span>
        </div>
        <button onClick={handleAdd}>
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

  cursor: pointer;
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
  width: 135px;

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
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
