import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { scrollHidden } from "../../../assets/styles/home.style";
import CustomInput from "../../../components/CustomInput";
import DatesBox from "../../../components/DatesBox";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import OneButtonModal from "../../../components/OneButtonModal";
import PrimaryButton from "../../../components/PrimaryButton";
import TimeSwiper from "../../../components/TimeSwiper";
import AddPlaceCard from "../../../components/web/schedule/AddPlaceCard";
import SelectDayModal from "../../../components/web/schedule/SelectDayModal";
import useAddPlaceHook from "../../../hooks/useAddPlace";

export default function CreatePlace() {
  const {
    list,
    handleAdd,
    handleRemove,
    openModal,
    setOpenModal,
    handleDaySelect,
  } = useAddPlaceHook();
  const {
    state: { title, dates },
  } = useLocation();

  return (
    <>
      <CreatePlaceContainer>
        <SideBar>
          <h1>{title}</h1>
          <DatesBox dates={dates} />

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
          isMobile={false}
          key={"시간 설정 모달"}
          title="시간 설정"
          buttonText="완료"
          onClick={() => {}}
          onClose={() => setOpenModal((p) => ({ ...p, selectTime: false }))}
          width="440px"
          height="320px"
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
`;

const InputBox = styled.div`
  width: 439px;
  margin: 32px auto 24px;
  height: 60px;
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
