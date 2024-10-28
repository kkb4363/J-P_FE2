import styled from "styled-components";
import testImg from "../../../assets/images/testImg2.png";
import IconBox from "../../IconBox";
import StarIcon from "../../../assets/icons/StarIcon";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";

export default function AddPlaceCard() {
  return (
    <AddPlaceCardContainer>
      <img src={testImg} alt="addPlace" />

      <TextCol>
        <h1>명소</h1>
        <p>순천만 국가정원</p>
        <IconBox>
          <StarIcon />
          <span>4.9</span>
        </IconBox>
      </TextCol>

      <CheckBox>
        <CheckOnlyIcon stroke="#b8b8b8" />
      </CheckBox>
    </AddPlaceCardContainer>
  );
}

const AddPlaceCardContainer = styled.div`
  width: 430px;
  height: 118px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  align-items: center;
  padding: 12px 18px;

  & > img {
    width: 99px;
    height: 95px;
    border-radius: 16px;
    object-fit: cover;
  }
`;

const TextCol = styled.div`
  margin-left: 32px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & > h1 {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }
`;

const CheckBox = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.color.gray300};

  display: flex;
  justify-content: center;
  align-items: center;
`;
