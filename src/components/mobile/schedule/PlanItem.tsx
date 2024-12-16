import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import FileCheckIcon from "../../../assets/icons/FileCheckIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { DayLocationProps } from "../../../types/schedule";
import { useSelectPlanItemStore } from "../../../store/selectPlanItem.store";

interface Props {
  item: DayLocationProps;
  isEdit: boolean;
  reloadSchedule: () => Promise<void>;
  setIsOpenMemo: React.Dispatch<
    React.SetStateAction<{
      memo: boolean;
      cost: boolean;
    }>
  >;
  setIsPlanPlace: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenDeleteModal: React.Dispatch<
    React.SetStateAction<{
      delete: boolean;
      deleteSuccess: boolean;
    }>
  >;
  setIsMovePlan: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: any;
}

export default function PlanItem({
  item,
  isEdit,
  setIsOpenMemo,
  setIsPlanPlace,
  setIsOpenDeleteModal,
  setIsMovePlan,
  setOpenModal,
}: Props) {
  const { setPlanItemId, setPlanPlaceId } = useSelectPlanItemStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const handleItemClick = async () => {
    setPlanItemId(item.id);
    if (isEdit) {
      setIsMovePlan(true);
      setOpenModal((p: any) => ({ ...p, selectDay: true }));
    } else {
      setPlanPlaceId(item.placeId);
      setIsPlanPlace(true);
    }
  };

  const handleEditTimeClick = async () => {
    if (isEdit) {
      setPlanItemId(item.id);
      setIsMovePlan(false);
      setOpenModal((p: any) => ({ ...p, selectTime: true }));
    }
  };

  const handleMemoClick = () => {
    setPlanItemId(item.id);
    setIsOpenMemo((p) => ({ ...p, memo: true }));
  };

  const handleDeleteClick = () => {
    setPlanItemId(item.id);
    setIsOpenDeleteModal({
      delete: true,
      deleteSuccess: false,
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
          <button onClick={handleDeleteClick}>
            <TrashIcon />
          </button>
        ) : (
          <MemoButton onClick={handleMemoClick}>
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
