import styled from "styled-components";
import FileCheckIcon from "../../../assets/icons/FileCheckIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { CSS } from "@dnd-kit/utilities";
import { DayLocationProps, DayProps } from "../../../types/schedule";
import { useUserStore } from "../../../store/user.store";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import {
  deletePlaceFromSchedule,
  moveScheduleDate,
} from "../../../service/axios";

interface Props {
  item: DayLocationProps;
  isEdit: boolean;
  currentDayId: number;
  reloadSchedule: () => Promise<void>;
  setIsOpenMemo: React.Dispatch<
    React.SetStateAction<{
      itemId: number | undefined;
      memo: boolean;
      cost: boolean;
    }>
  >;
  setIsPlanPlace: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlanItem({
  item,
  isEdit,
  currentDayId,
  reloadSchedule,
  setIsOpenMemo,
  setIsPlanPlace,
}: Props) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({
    delete: false,
    deleteSuccess: false,
  });
  const [isMove, setIsMove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserType } = useUserStore();
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

  const handleItemClick = async () => {
    if (isEdit) {
      setIsMove(true);
      setOpenModal((p) => ({ ...p, selectDay: true }));
    } else {
      setIsLoading(true);
      setIsPlanPlace(true);
    }
  };

  const handleMovePlanClick = async () => {
    setOpenModal((p) => ({ ...p, selectTime: false }));
    if (isMove) {
      setIsMove(false);
      await moveScheduleDate(
        item.id,
        {
          newDayId: selectDay,
          time: selectTime,
        },
        getUserType()
      ).then(() => {
        reloadSchedule();
      });
    } else {
      await moveScheduleDate(
        item.id,
        {
          newDayId: currentDayId,
          time: selectTime,
        },
        getUserType()
      ).then((res) => {
        reloadSchedule();
      });
    }
  };

  const handleEditTimeClick = async () => {
    setOpenModal((p) => ({ ...p, selectTime: true }));
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
          transition,
          zIndex: isDragging ? 100 : "auto",
        }}
      >
        <TimeBox
          $isEdit={isEdit}
          onClick={handleEditTimeClick}
        >{`${item.time}`}</TimeBox>
        <PlaceBox onClick={handleItemClick}>
          <PlaceIdx $isEdit={isEdit}>{item.index}</PlaceIdx>
          <PlaceTitleCol>
            <p>{item.name}</p>
            <span>명소</span>
          </PlaceTitleCol>
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
            onClick={() =>
              setIsOpenMemo((p) => ({ ...p, itemId: item.id, memo: true }))
            }
          >
            <FileCheckIcon />
          </MemoButton>
        )}
      </PlanItemContainer>
    </>
  );
}

const PlanItemContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  z-index: 99;
  margin-bottom: 24px;
  touch-action: none;
`;

const PlaceBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  gap: 16px;
`;

const TimeBox = styled.div<{ $isEdit: boolean }>`
  width: 48px;
  padding: 8px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.$isEdit
      ? props.theme.color.gray100
      : props.theme.color.secondaryLight};
  font-size: 14px;
`;

const PlaceIdx = styled.div<{ $isEdit: boolean }>`
  width: 22px;
  height: 24px;
  padding: 5px 8px;
  border-radius: 50px;
  background-color: ${(props) =>
    props.$isEdit ? props.theme.color.gray100 : props.theme.color.pointCoral};
  color: ${(props) =>
    props.$isEdit ? props.theme.color.gray300 : props.theme.color.white};
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
`;

const PlaceTitleCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 700;

  & > span {
    color: ${(props) => props.theme.color.gray400};
    font-size: 12px;
    font-weight: normal;
  }
`;

const DragHandler = styled.div<{ $isDragging: boolean }>`
  margin: auto;
  color: ${(props) =>
    props.$isDragging
      ? props.theme.color.secondary
      : props.theme.color.gray300};
  font-size: 12px;
  white-space: nowrap;
`;

const PlaceDetailsButton = styled.div<{ $fill?: boolean }>`
  display: grid;
  place-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.$fill ? props.theme.color.secondary : props.theme.color.gray300};
`;

const MemoButton = styled.button`
  display: grid;
  place-items: center;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.secondary};
`;
