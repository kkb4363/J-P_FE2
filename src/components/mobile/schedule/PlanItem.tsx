import styled from "styled-components";
import FileCheckIcon from "../../../assets/icons/FileCheckIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { PlanItemProps } from "../../../types/schedule";
import {
  SortableElement,
  SortableElementProps,
  SortableHandle,
} from "react-sortable-hoc";

export interface Props {
  id: number;
  isEdit: boolean;
  setIsPlanDetail: () => void;
  setIsPlanPlace: () => void;
  handleDeleteOpen: () => void;
  planItem: PlanItemProps;
  jpState: string;
}

export const PlanItem: React.ComponentClass<SortableElementProps & Props> =
  SortableElement(
    ({
      id,
      isEdit,
      setIsPlanDetail,
      setIsPlanPlace,
      handleDeleteOpen,
      planItem,
      jpState,
    }: Props) => {
      const DragHandler = SortableHandle(() => {
        return <EditSelectText>선택</EditSelectText>;
      });

      const handlePlaceClick = isEdit ? undefined : setIsPlanPlace;

      return (
        <PlanItemContainer>
          <TimeBox $isEdit={isEdit}>{planItem.time}</TimeBox>
          <PlaceBox onClick={handlePlaceClick}>
            <PlaceIdx $isEdit={isEdit}>{id + 1}</PlaceIdx>
            <PlaceTitleCol>
              <p>{planItem.title}</p>
              <span>{planItem.subtitle}</span>
            </PlaceTitleCol>
            {isEdit && <DragHandler />}
          </PlaceBox>
          {!isEdit && jpState === "J" && (
            <PlaceDetailsButton $fill={true} onClick={setIsPlanDetail}>
              <FileCheckIcon />
            </PlaceDetailsButton>
          )}
          {isEdit && (
            <div onClick={handleDeleteOpen}>
              <TrashIcon />
            </div>
          )}
        </PlanItemContainer>
      );
    }
  );

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

const EditSelectText = styled.p`
  color: ${(props) => props.theme.color.gray300};
  font-size: 12px;
  white-space: nowrap;
`;

const PlanItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  z-index: 99;

  &.dragging-helper-class {
    ${PlaceBox} {
      border-color: ${(props) => props.theme.color.secondary};
    }

    ${EditSelectText} {
      color: ${(props) => props.theme.color.secondary};
    }
  }
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
