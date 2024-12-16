import styled from "styled-components";
import { scrollHidden } from "../../../assets/styles/home.style";
import CustomInput from "../../../components/CustomInput";
import OneButtonModal from "../../../components/OneButtonModal";
import TimeSwiper from "../../../components/TimeSwiper";
import SelectDayModal from "../../../components/mobile/schedule/SelectDayModal";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import AddPlaceCard from "../../../components/web/schedule/AddPlaceCard";

export default function ListView() {
  const {
    list,
    handleAdd,
    handleRemove,
    openModal,
    setOpenModal,
    handleDaySelect,
  } = useAddPlaceHook();

  console.log(list);

  return (
    <>
      <CustomInput text="어디로 떠나고 싶나요?" value="" onChange={() => {}} />

      <PlaceCardCol>
        {/* {Array.from({ length: 7 }).map((_, idx) => (
          <AddPlaceCard
            key={idx}
            height="100px"
            width="350px"
            imgSize="80px"
            isSelect={list.includes(idx)}
            handleAdd={() => handleAdd(idx)}
            handleRemove={() => handleRemove(idx)}
          />
        ))} */}
      </PlaceCardCol>

      <SaveButtonBox>
        <button
          disabled={list.length === 0}
          onClick={() => setOpenModal((p) => ({ ...p, selectDay: true }))}
        >
          <span>완료</span>
        </button>
      </SaveButtonBox>

      {openModal.selectDay && (
        <SelectDayModal
          onClick={handleDaySelect}
          onClose={() => setOpenModal((p) => ({ ...p, selectDay: false }))}
        />
      )}

      {openModal.selectTime && (
        <OneButtonModal
          isMobile
          key={"시간 설정 모달"}
          title="시간 설정"
          buttonText="완료"
          onClick={() => {}}
          onClose={() => setOpenModal((p) => ({ ...p, selectTime: false }))}
        >
          <TimeSwiper isMobile={true} />
        </OneButtonModal>
      )}
    </>
  );
}

export const PlaceCardCol = styled.ul`
  height: calc(100% - 45px - 95px);
  padding: 8px 0;
  gap: 12px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  ${scrollHidden};
`;

export const PlaceCard = styled.li`
  min-height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  & > img {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    margin: 0 16px 0 13px;
  }
`;

export const PlaceCardTextCol = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;

  & > h1 {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 3px;
    & > span {
      font-size: 12px;
      color: ${(props) => props.theme.color.gray500};
    }
  }
`;

export const PlaceCardAddButton = styled.button`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  min-width: 28px;
  min-height: 28px;

  color: ${(props) => props.theme.color.secondary};
  font-weight: 700;
`;

export const SaveButtonBox = styled.div`
  height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.color.gray200};
  width: calc(100% + 20px * 2);
  margin-left: -20px;

  & > button {
    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.secondary};
    background-color: ${(props) => props.theme.color.secondary};

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 94px;

    &:disabled {
      background-color: ${(props) => props.theme.color.gray200};
      border: 1px solid ${(props) => props.theme.color.gray200};
    }

    & > span {
      color: ${(props) => props.theme.color.white};
      font-size: 14px;
      font-weight: 700;
    }
  }
`;
