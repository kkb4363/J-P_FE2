import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import styled from "styled-components";
import FileCheckIcon from "../../../assets/icons/FileCheckIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import {
  deletePlaceFromSchedule,
  moveScheduleDate,
} from "../../../service/axios";
import { DayLocationProps, DayProps } from "../../../types/res.dto";
import MoveDaySlider from "../../MoveDaySlider";
import OneButtonModal from "../../OneButtonModal";
import TimeSwiper from "../../TimeSwiper";
import TwoButtonsModal from "../../TwoButtonsModal";
import NoButtonModal from "../NoButtonModal";
import PlanMemo from "./PlanMemo";

interface Props {
  item: DayLocationProps;
  isEdit: boolean;
  dayList: DayProps[];
  reloadSchedule: () => Promise<void>;
}

export default function PlanItem({
  item,
  isEdit,
  dayList,
  reloadSchedule,
}: Props) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({
    delete: false,
    deleteSuccess: false,
  });
  const [isOpenMemoModal, setIsOpenMemoModal] = useState({
    memo: false,
    cost: false,
  });
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const {
    selectDay,
    setSelectDay,
    selectTime,
    setSelectTime,
    handleDaySelect,
    openModal,
    setOpenModal,
  } = useAddPlaceHook();

  const handleItemClick = () => {
    if (isEdit) {
      setOpenModal((p) => ({ ...p, selectDay: true }));
    }
  };

  const handleMovePlanClick = async () => {
    setOpenModal((p) => ({ ...p, selectTime: false }));

    await moveScheduleDate(item.id, {
      newDayId: selectDay,
      time: selectTime,
    }).then(() => {
      reloadSchedule();
    });
  };

  const handleDeleteItemClick = async () => {
    await deletePlaceFromSchedule(item.id).then(() => {
      setIsOpenDeleteModal({ delete: false, deleteSuccess: true });
      reloadSchedule();
    });
  };

  return (
    <>
      <PlanItemContainer
        ref={setNodeRef}
        {...attributes}
        style={{
          transform: CSS.Transform.toString(transform),
          transition: transition,
          zIndex: isDragging ? "100" : "auto",
        }}
      >
        <TimeBox $isEdit={isEdit}>{`${item.time}`}</TimeBox>
        <PlaceBox $isDragging={isDragging} onClick={handleItemClick}>
          <PlaceNum $isEdit={isEdit}>{item.index}</PlaceNum>
          <PlaceTitleBox>
            <p>{item.name}</p>
            <span>명소</span>
          </PlaceTitleBox>
          {isEdit && (
            <DragHandler
              ref={setActivatorNodeRef}
              {...listeners}
              $isDragging={isDragging}
            >
              선택
            </DragHandler>
          )}
        </PlaceBox>
        {isEdit ? (
          <button
            onClick={() =>
              setIsOpenDeleteModal({
                delete: true,
                deleteSuccess: false,
              })
            }
          >
            <TrashIcon />
          </button>
        ) : (
          <MemoButton
            onClick={() => setIsOpenMemoModal((p) => ({ ...p, memo: true }))}
          >
            <FileCheckIcon />
          </MemoButton>
        )}
      </PlanItemContainer>

      {/* 일정 이동 Modal */}
      {openModal.selectDay && (
        <OneButtonModal
          isMobile={false}
          width="470px"
          height="390px"
          title="다른 날로 이동"
          buttonText="다음"
          onClick={handleDaySelect}
          onClose={() => setOpenModal((p) => ({ ...p, selectDay: false }))}
        >
          <MoveDaySlider
            isMobile={false}
            dayResDtos={dayList}
            selectDay={selectDay}
            setSelectDay={setSelectDay}
          />
        </OneButtonModal>
      )}
      {openModal.selectTime && (
        <OneButtonModal
          isMobile={false}
          width="470px"
          height="390px"
          title="시간 설정"
          buttonText="완료"
          onClick={handleMovePlanClick}
          onClose={() => setOpenModal((p) => ({ ...p, selectTime: false }))}
        >
          <TimeSwiper isMobile={false} setSelectTime={setSelectTime} />
        </OneButtonModal>
      )}

      {/* 일정 삭제 Modal */}
      {isOpenDeleteModal.delete && (
        <TwoButtonsModal
          isMobile={false}
          width="470px"
          height="390px"
          text="일정을 삭제할까요?"
          onClick={handleDeleteItemClick}
          onClose={() => setIsOpenDeleteModal((p) => ({ ...p, delete: false }))}
        />
      )}
      {isOpenDeleteModal.deleteSuccess && (
        <OneButtonModal
          isMobile={false}
          width="470px"
          height="390px"
          noCloseBtn
          buttonText="확인"
          onClick={() =>
            setIsOpenDeleteModal((p) => ({ ...p, deleteSuccess: false }))
          }
        >
          <ModalText>일정이 삭제되었습니다.</ModalText>
        </OneButtonModal>
      )}
      {isOpenMemoModal.memo && (
        <NoButtonModal
          width="666px"
          height="808px"
          onClose={() => setIsOpenMemoModal((p) => ({ ...p, memo: false }))}
          noCloseBtn
        >
          <PlanMemo isAddCost={false} setIsOpenMemoModal={setIsOpenMemoModal} />
        </NoButtonModal>
      )}
      {isOpenMemoModal.cost && (
        <NoButtonModal
          width="666px"
          height="695px"
          onClose={() => setIsOpenMemoModal((p) => ({ ...p, memo: false }))}
          noCloseBtn
        >
          <PlanMemo isAddCost={true} setIsOpenMemoModal={setIsOpenMemoModal} />
        </NoButtonModal>
      )}
    </>
  );
}

const PlanItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 65px;
`;

const TimeBox = styled.div<{ $isEdit: boolean }>`
  width: 48px;
  height: 33px;
  padding: 8px;
  display: grid;
  place-content: center;
  border-radius: 12px;
  background-color: ${(props) =>
    props.$isEdit
      ? props.theme.color.gray100
      : props.theme.color.secondaryLight};
  font-size: 14px;
`;

const PlaceBox = styled.div<{ $isDragging: boolean }>`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  padding: 17px 24px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid
    ${(props) =>
      props.$isDragging
        ? props.theme.color.secondary
        : props.theme.color.gray200};
  border-radius: 16px;
  gap: 16px;
`;

const PlaceNum = styled.div<{ $isEdit: boolean }>`
  width: 28px;
  height: 28px;
  padding: 5px 10px;
  display: grid;
  place-content: center;
  border-radius: 50px;
  background-color: ${(props) =>
    props.$isEdit ? props.theme.color.gray100 : props.theme.color.pointCoral};
  color: ${(props) =>
    props.$isEdit ? props.theme.color.gray400 : props.theme.color.white};
  font-weight: 700;
  font-size: 12px;
`;

const PlaceTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  gap: 6px;
  margin-right: auto;

  & > p {
    font-weight: 700;
    color: ${(props) => props.theme.color.gray900};
    margin-top: 2px;
  }

  & > span {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray400};
  }
`;

const DragHandler = styled.div<{ $isDragging: boolean }>`
  color: ${(props) =>
    props.$isDragging
      ? props.theme.color.secondary
      : props.theme.color.gray300};
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
`;

const MemoButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.secondary};
`;

const ModalText = styled.p`
  font-size: 20px;
  font-weight: 700;
`;
