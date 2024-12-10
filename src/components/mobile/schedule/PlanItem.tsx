import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import styled from "styled-components";
import FileCheckIcon from "../../../assets/icons/FileCheckIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { useAddPlaceStore } from "../../../store/useAddPlace.store";
import { DayLocationProps } from "../../../types/schedule";

interface Props {
  item: DayLocationProps;
  isEdit: boolean;
  reloadSchedule: () => Promise<void>;
  setIsOpenMemo: React.Dispatch<
    React.SetStateAction<{
      itemId: number | undefined;
      memo: boolean;
      cost: boolean;
    }>
  >;
  setIsPlanPlace: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenDeleteModal: React.Dispatch<
    React.SetStateAction<{
      itemId: number | undefined;
      delete: boolean;
      deleteSuccess: boolean;
    }>
  >;
  setIsMovePlan: React.Dispatch<
    React.SetStateAction<{
      itemId: number | undefined;
      isMove: boolean;
    }>
  >;
}

export default function PlanItem({
  item,
  isEdit,
  setIsOpenMemo,
  setIsPlanPlace,
  setIsOpenDeleteModal,
  setIsMovePlan,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const { setOpenModal } = useAddPlaceStore();
  const handleItemClick = async () => {
    if (isEdit) {
      setIsMovePlan({ itemId: item.id, isMove: true });
      setOpenModal({ selectDay: true });
    } else {
      setIsLoading(true);
      setIsPlanPlace(true);
    }
  };

  const handleEditTimeClick = async () => {
    if (isEdit) {
      setIsMovePlan({ itemId: item.id, isMove: false });
      setOpenModal({ selectTime: true });
    }
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
                itemId: item.id,
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

const MemoButton = styled.button`
  display: grid;
  place-items: center;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.secondary};
`;
