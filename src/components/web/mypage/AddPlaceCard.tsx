import styled from "styled-components";
import testImg from "../../../assets/images/testImg2.png";
import IconBox from "../../IconBox";
import StarIcon from "../../../assets/icons/StarIcon";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";
import { useWriteReviewStore } from "../../../store/writeReview.store";

interface Props {
  photoUrl?: string;
  name: string;
  rating: number;
  id: string;
}

export default function AddPlaceCard({ photoUrl, name, rating, id }: Props) {
  const writeReviewStore = useWriteReviewStore();
  const isChecked = writeReviewStore.getSelectedPlace() === name;

  const handleSelect = () => {
    if (isChecked) {
      writeReviewStore.setSelectedPlace("");
    } else {
      writeReviewStore.setSelectedPlace(name);
    }
  };

  return (
    <AddPlaceCardContainer>
      <img src={testImg} alt="addPlace" />

      <TextCol>
        <h1>명소</h1>
        <p>{name}</p>
        <IconBox>
          <StarIcon />
          <span>{rating}</span>
        </IconBox>
      </TextCol>

      <CheckBox $isChecked={isChecked} onClick={handleSelect}>
        <CheckOnlyIcon stroke={isChecked ? "white" : "#b8b8b8"} />
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

const CheckBox = styled.div<{ $isChecked: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.$isChecked && props.theme.color.secondary};
`;
