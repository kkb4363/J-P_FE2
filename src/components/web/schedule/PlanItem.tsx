import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import FileCheckIcon from "../../../assets/icons/FileCheckIcon";
import { planItemProps } from "../../../types/schedule";
import TrashIcon from "../../../assets/icons/TrashIcon";

interface Props {
  item: planItemProps;
  isEdit: boolean;
  setMoveDayOpen: (flag: boolean) => void;
  setDeleteOpen: (flag: boolean) => void;
}

export default function PlanItem({
  item,
  isEdit,
  setMoveDayOpen,
  setDeleteOpen,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const handleItemClick = () => {
    if (isEdit) {
      setMoveDayOpen(true);
    }
  };

  return (
    <PlanItemContainer
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
        zIndex: isDragging ? "100" : "auto",
      }}
    >
      <TimeBox $isEdit={isEdit}>{item.time}</TimeBox>
      <PlaceBox $isDragging={isDragging} onClick={handleItemClick}>
        <PlaceNum $isEdit={isEdit}>1</PlaceNum>
        <PlaceTitleBox>
          <p>{item.title}</p>
          <span>{item.subtitle}</span>
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
        <button onClick={() => setDeleteOpen(true)}>
          <TrashIcon />
        </button>
      ) : (
        <DetailsButton>
          <FileCheckIcon />
        </DetailsButton>
      )}
    </PlanItemContainer>
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

const DetailsButton = styled.div`
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.secondary};
`;
