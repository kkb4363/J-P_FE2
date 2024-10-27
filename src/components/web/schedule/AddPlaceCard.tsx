import StarIcon from "../../../assets/icons/StarIcon";
import testImg from "../../../assets/images/testImg1.png";
import styled from "styled-components";
import IconBox from "../../IconBox";
import PlusIcon from "../../../assets/icons/PlusIcon";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";

interface Props {
  width?: string;
  height?: string;
  imgSize?: string;
  isSelect: boolean;
  handleAdd: () => void;
  handleRemove: () => void;
}

export default function AddPlaceCard({
  width = "430px",
  height = "118px",
  imgSize = "96px",
  isSelect,
  handleAdd,
  handleRemove,
}: Props) {
  return (
    <AddPlaceCardContainer $width={width} $height={height} $imgSize={imgSize}>
      <img src={testImg} alt="이미지없음" />

      <div>
        <h1>명소</h1>
        <h2>한려해상국립공원</h2>
        <IconBox>
          <StarIcon />
          <span>4.9</span>
        </IconBox>
      </div>

      {!isSelect ? (
        <PlusButton onClick={handleAdd}>
          <PlusIcon stroke="#6979f8" />
        </PlusButton>
      ) : (
        <CheckButton onClick={handleRemove}>
          <CheckOnlyIcon />
        </CheckButton>
      )}
    </AddPlaceCardContainer>
  );
}

const AddPlaceCardContainer = styled.div<{
  $width: string;
  $height: string;
  $imgSize: string;
}>`
  width: ${(props) => props.$width && props.$width};
  height: ${(props) => props.$height && props.$height};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  padding: 12px 21px;
  display: flex;
  align-items: center;

  & > img {
    width: ${(props) => props.$imgSize && props.$imgSize};
    height: ${(props) => props.$imgSize && props.$imgSize};
    border-radius: 16px;
    object-fit: cover;
  }

  & > div:nth-child(2) {
    padding-left: 32px;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & > h1 {
      color: ${(props) => props.theme.color.gray700};
      font-size: 14px;
    }

    & > h2 {
      color: ${(props) => props.theme.color.gray900};
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const PlusButton = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CheckButton = styled(PlusButton)`
  background-color: ${(props) => props.theme.color.secondary};
`;
