import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import CustomInput from "../../../components/mobile/CustomInput";
import {
  PlaceCard,
  PlaceCardCol,
  PlaceCardTextCol,
  SaveButtonBox,
} from "../addPlace/ListView";
import testImg from "../../../assets/images/testImg1.png";
import StarIcon from "../../../assets/icons/StarIcon";
import { scrollHidden } from "../../../assets/styles/home.style";

export default function SelectPlace() {
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
          </PlaceCard>
        </PlaceCardCol>

        <SelectPlaceSaveButtonBox>
          <button>
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
