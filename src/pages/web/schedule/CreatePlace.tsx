import styled from "styled-components";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import CustomInput from "../../../components/CustomInput";
import AddPlaceCard from "../../../components/web/schedule/AddPlaceCard";
import PrimaryButton from "../../../components/mobile/PrimaryButton";

export default function CreatePlace() {
  return (
    <CreatePlaceContainer>
      <SideBar>
        <h1>남해 여행</h1>
        <h2>
          <CalendarCheckIcon />
          4.17~4.19(2박 3일)
        </h2>

        <InputBox>
          <CustomInput text="어디로 떠나고 싶나요?" value="" />
        </InputBox>

        <AddPlaceCardCol>
          <AddPlaceCard />
        </AddPlaceCardCol>

        <ButtonBox>
          <PrimaryButton
            width="190px"
            height="44px"
            blue={true}
            text="완료"
            isDisabled={true}
          />
        </ButtonBox>
      </SideBar>

      <GoogleMapBox>
        <CustomGoogleMap
          width="100%"
          height="98%"
          lat={12.424}
          lng={14.242}
          handleMarkerClick={() => {}}
        />
      </GoogleMapBox>
    </CreatePlaceContainer>
  );
}

const CreatePlaceContainer = styled.div`
  width: calc(100% + 240px);
  height: calc(100% + 80px);
  margin-left: -120px;
  margin-bottom: -80px;
  min-height: 756px;
  display: flex;
  overflow-y: scroll;
`;

const SideBar = styled.div`
  width: 509px;
  height: 100%;
  padding: 37px 35px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.white};

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  & > h2 {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    margin-bottom: 32px;
  }
`;

const InputBox = styled.div`
  width: 439px;
  margin: 0 auto;
  height: 60px;
  margin-bottom: 24px;
`;

const AddPlaceCardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleMapBox = styled.div`
  width: calc(100% - 509px);
  height: 100%;
`;
