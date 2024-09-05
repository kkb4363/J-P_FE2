import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import CustomInput from "../../../components/mobile/CustomInput";
import {
  PlaceCard,
  PlaceCardAddButton,
  PlaceCardCol,
  PlaceCardTextCol,
  SaveButtonBox,
} from "../addPlace/ListView";
import testImg from "../../../assets/images/testImg1.png";
import StarIcon from "../../../assets/icons/StarIcon";
import { scrollHidden } from "../../../assets/styles/home.style";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";
import { useWriteReviewStore } from "../../../store/writeReview.store";
import { useNavigate } from "react-router-dom";

export default function SelectPlace() {
  const { setSelectedPlace } = useWriteReviewStore();
  const navigate = useNavigate();

  const test = () => {
    setSelectedPlace("순천만 국가정원");
    navigate(-1);
  };

  return (
    <>
      <CustomHeader title="장소 등록" />
      <SelectPlaceBody>
        <CustomInput text="장소를 입력해주세요." value="" />

        <PlaceCardCol>
          <PlaceCard>
            <img src={testImg} alt="장소 등록" />

            <PlaceCardTextCol>
              <h1>명소</h1>
              <span>월영교</span>
              <div>
                <StarIcon />
                <span>4.9</span>
              </div>
            </PlaceCardTextCol>

            <PlaceAddButtonBox>
              <PlaceAddButton>
                <CheckOnlyIcon stroke="#b8b8b8" />
              </PlaceAddButton>
            </PlaceAddButtonBox>
          </PlaceCard>
          <PlaceCard>
            <img src={testImg} alt="장소 등록" />

            <PlaceCardTextCol>
              <h1>명소</h1>
              <span>월영교</span>
              <div>
                <StarIcon />
                <span>4.9</span>
              </div>
            </PlaceCardTextCol>

            <PlaceAddButtonBox>
              <PlaceAddButton>
                <CheckOnlyIcon stroke="#b8b8b8" />
              </PlaceAddButton>
            </PlaceAddButtonBox>
          </PlaceCard>
        </PlaceCardCol>

        <SelectPlaceSaveButtonBox>
          <button onClick={test}>
            <span>완료</span>
          </button>
        </SelectPlaceSaveButtonBox>
      </SelectPlaceBody>
    </>
  );
}

const SelectPlaceBody = styled.div`
  height: calc(100dvh - 50px - 20px);
  overflow: auto;
  ${scrollHidden};
  padding: 16px;
`;

const SelectPlaceSaveButtonBox = styled(SaveButtonBox)`
  border: none;
`;

const PlaceAddButtonBox = styled.div`
  height: 100%;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceAddButton = styled(PlaceCardAddButton)`
  border: 1px solid ${(props) => props.theme.color.gray300};
`;
