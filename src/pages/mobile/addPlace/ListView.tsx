import styled from "styled-components";
import CustomInput from "../../../components/mobile/CustomInput";
import { scrollHidden } from "../../../assets/styles/home.style";
import testImg from "../../../assets/images/testImg.png";
import StarIcon from "../../../assets/icons/StarIcon";
import { useState } from "react";
import OneButtonModal from "../../../components/mobile/OneButtonModal";
import { useModal } from "../../../hooks/useModal";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";

export default function ListView() {
  const [list, setList] = useState<number[]>([]);
  const hour = Array.from({ length: 12 }).map((v, i) => {
    const num = i + 1;
    return num < 10 ? `0${num}` : `${num}`;
  });
  const min = Array.from({ length: 6 }).map((v, i) => {
    return i === 0 ? `00` : i * 10;
  });

  const [selectTime, setSelectTime] = useState(0); //0 오전 1 오후
  const [selectHour, setSelectHour] = useState(0);
  const [selectMin, setSelectMin] = useState(0);

  const handleAdd = (id: number) => {
    setList((prevList) => [...prevList, id]);
  };

  const handleRemove = (id: number) => {
    const newList = list.filter((prev) => prev !== id);
    setList(newList);
  };

  const { isOpen, openModal, closeModal, modalRef } = useModal();
  const {
    isOpen: isTimerModalOpen,
    openModal: openTimerModal,
    closeModal: closeTimerModal,
    modalRef: timerModalRef,
  } = useModal();

  return (
    <>
      <CustomInput text="어디로 떠나고 싶나요?" value="" />

      <PlaceCardCol>
        {Array.from({ length: 7 }).map((_, idx) => (
          <PlaceCard key={idx}>
            <img src={testImg} alt="listview_img" />

            <PlaceCardTextCol>
              <h1>명소 {idx}</h1>
              <span>한려해상국립공원</span>
              <div>
                <StarIcon />
                <span>4.9</span>
              </div>
            </PlaceCardTextCol>

            <PlaceCardAddButtonBox>
              {!list.includes(idx) ? (
                <PlaceCardAddButton onClick={() => handleAdd(idx)}>
                  +
                </PlaceCardAddButton>
              ) : (
                <CheckButton onClick={() => handleRemove(idx)}>
                  <CheckOnlyIcon />
                </CheckButton>
              )}
            </PlaceCardAddButtonBox>
          </PlaceCard>
        ))}
      </PlaceCardCol>

      <SaveButtonBox>
        <button disabled={list.length === 0} onClick={openModal}>
          <span>완료</span>
        </button>
      </SaveButtonBox>

      {isOpen && (
        <OneButtonModal
          key={"날짜 선택 모달"}
          title="날짜 선택"
          buttonText="다음"
          onClick={() => {
            closeModal();
            openTimerModal();
          }}
          onClose={closeModal}
          modalRef={modalRef}
        >
          <SelectDateRow>
            <LeftArrow>
              <ArrowLeftIcon stroke="#1a1a1a" />
            </LeftArrow>
            <Date $isActive={true}>
              <p>Day 1</p>
              <span>4.16(목)</span>
            </Date>
            <Date $isActive={false}>
              <p>Day 2</p>
              <span>4.17(금)</span>
            </Date>
            <Date $isActive={false}>
              <p>Day 3</p>
              <span>4.18(토)</span>
            </Date>
            <RightArrow>
              <ArrowRightIcon stroke="#1a1a1a" width="14" height="14" />
            </RightArrow>
          </SelectDateRow>
        </OneButtonModal>
      )}

      {isTimerModalOpen && (
        <OneButtonModal
          key={"시간 설정 모달"}
          title="시간 설정"
          buttonText="완료"
          onClick={() => {}}
          onClose={closeTimerModal}
          modalRef={timerModalRef}
        >
          <TimeModalContainer>
            <Swiper
              direction="vertical"
              loop={true}
              slideToClickedSlide={true}
              loopAdditionalSlides={1}
              spaceBetween={40}
              slidesPerView={2}
              onSlideChange={(swiper) => setSelectTime(swiper.realIndex)}
              centeredSlides={true}
            >
              <SwiperSlide>오전</SwiperSlide>
              <SwiperSlide>오후</SwiperSlide>
            </Swiper>

            <Swiper
              direction="vertical"
              loop={true}
              slideToClickedSlide={true}
              spaceBetween={10}
              slidesPerView={3}
              onSlideChange={(swiper) => setSelectHour(swiper.realIndex + 1)}
              centeredSlides={true}
            >
              {hour.map((hour) => (
                <SwiperSlide key={hour}>{hour}</SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              direction="vertical"
              loop={true}
              slideToClickedSlide={true}
              spaceBetween={10}
              slidesPerView={3}
              onSlideChange={(swiper) => setSelectMin(swiper.realIndex * 10)}
              centeredSlides={true}
            >
              {min.map((min) => (
                <SwiperSlide key={min}>{min}</SwiperSlide>
              ))}
            </Swiper>
          </TimeModalContainer>
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

const PlaceCardAddButtonBox = styled.div`
  padding-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const CheckButton = styled(PlaceCardAddButton)`
  background-color: ${(props) => props.theme.color.secondary};
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

const SelectDateRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  gap: 8px;
`;

const LeftArrow = styled.div`
  position: absolute;
  left: -30px;
`;

const RightArrow = styled.div`
  position: absolute;
  right: -25px;
`;

const Date = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray200};

  & > p {
    color: ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray400};
    font-size: 14px;
    font-weight: 500;
  }
`;

const TimeModalContainer = styled.div`
  max-height: 90px;
  width: 100%;
  align-items: center;
  display: flex;
`;
