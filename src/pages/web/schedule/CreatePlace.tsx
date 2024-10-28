import styled from "styled-components";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import CustomInput from "../../../components/CustomInput";
import AddPlaceCard from "../../../components/web/schedule/AddPlaceCard";
import PrimaryButton from "../../../components/PrimaryButton";
import OneButtonModal from "../../../components/OneButtonModal";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import { scrollHidden } from "../../../assets/styles/home.style";
import TimeSwiper from "../../../components/TimeSwiper";
import SelectDayModal from "../../../components/web/schedule/SelectDayModal";

export default function CreatePlace() {
  const {
    list,
    handleAdd,
    handleRemove,
    openModal,
    setOpenModal,
    handleDaySelect,
  } = useAddPlaceHook();
  return (
    <>
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
            {Array.from({ length: 7 }).map((_, idx) => (
              <AddPlaceCard
                key={idx}
                isSelect={list.includes(idx)}
                handleAdd={() => handleAdd(idx)}
                handleRemove={() => handleRemove(idx)}
              />
            ))}
          </AddPlaceCardCol>

          <ButtonBox>
            <PrimaryButton
              width="190px"
              height="44px"
              blue={true}
              text="완료"
              isDisabled={list.length === 0}
              onClick={() => setOpenModal((p) => ({ ...p, selectDay: true }))}
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

      {openModal.selectDay && (
        <SelectDayModal
          onClick={handleDaySelect}
          onClose={() => setOpenModal((p) => ({ ...p, selectDay: false }))}
        />
      )}

      {openModal.selectTime && (
        <OneButtonModal
          key={"시간 설정 모달"}
          title="시간 설정"
          buttonText="완료"
          onClick={() => {}}
          onClose={() => setOpenModal((p) => ({ ...p, selectTime: false }))}
          width="440px"
          height="320px"
          fontSize="24px"
        >
          <TimeSwiper isMobile={false} />
        </OneButtonModal>
      )}
    </>
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
  overflow-y: scroll;
  overflow-x: hidden;
  ${scrollHidden};

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
