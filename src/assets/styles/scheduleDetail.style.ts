import styled from "styled-components";
import { SubInfo } from "../../pages/mobile/schedule/Calendar";
import { InfoText } from "./home.style";

export const DetailsInfoText = styled(InfoText)`
  display: flex;
  gap: 3px;

  & > div {
    display: flex;
    align-items: flex-end;
  }
`;

export const DetailsSubInfo = styled(SubInfo)`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;
`;

export const InviteRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
`;

export const ParticipantsRow = styled.div`
  position: relative;
  & > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    top: -12px;
  }
  & > img:nth-child(2) {
    left: 10px;
  }
  & > img:nth-child(3) {
    left: 20px;
  }
`;

export const MapBox = styled.div<{ $bottomSheetHeight?: number }>`
  height: calc(
    100% - 37px - 28px - 24px -
      (${({ $bottomSheetHeight }) => `${$bottomSheetHeight || 0}px`})
  );
  width: calc(100% + 20px * 2);
  margin: 10px 0 0 -20px;
`;

export const InviteBox = styled.div`
  & > h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.color.gray900};
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 3px;
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    margin: 10px 0 18px 0;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
  }

  padding: 30px 0 15px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray200};
`;

export const InviteButtonRow = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > button {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 30px;
    border: 1px solid ${(props) => props.theme.color.secondary};

    & > span {
      color: ${(props) => props.theme.color.secondary};
      font-size: 14px;
    }
  }
`;

export const FindedUsersCol = styled.div`
  padding: 20px 10px 0 10px;
  gap: 30px;
  display: flex;
  flex-direction: column;
`;

export const FindedUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  & > span:nth-child(2) {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    flex: 1;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
  }
`;

// 일정 목록

export const PlanList = styled.div`
  padding: 10px;
`;

export const PlanContainer = styled.div`
  height: calc(100dvh * 0.75);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 60px;
  overflow-y: auto;
`;

export const PlansBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PlansEditButton = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 3px;
  height: 16px;
  font-size: 14px;

  & > p {
    color: ${(props) => props.theme.color.secondary};
  }
  & > span {
    color: ${(props) => props.theme.color.gray500};
  }
`;

export const DaySelector = styled.div``;

export const AddPlaceButton = styled.div`
  align-self: flex-end;
  text-align: center;
  padding: 13px 17px;
  margin-right: 20px;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.white};
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);
`;

// 일정 장소 상세
export const CancelIconBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PlanPlaceContainer = styled.div`
  padding: 0 13px;
`;

export const PlaceTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 6px;

  & > p {
    font-weight: 700;
    font-size: 20px;
    color: ${(props) => props.theme.color.secondary};
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray200};
  margin: 12px 0 16px;
`;

// 일정 상세
export const PlanMemoHeader = styled.div<{ $editMode?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  padding: 10px 0;

  & > p {
    font-size: 14px;
    color: ${(props) => props.theme.color.secondary};
    visibility: ${({ $editMode }) => ($editMode ? "visible" : "hidden")};
  }
`;

export const PlanMemoBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 4px;
`;

export const SubTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  & > p {
    font-weight: 700;
  }
`;

export const ContentInput = styled.div<{ $isMemoEdit: boolean }>`
  background-color: ${(props) => props.theme.color.white};
  border: ${(props) =>
    props.$isMemoEdit && `1px solid ${props.theme.color.gray200}`};
  border-radius: 16px;
  padding: 20px 27px;
  box-shadow: ${(props) =>
    !props.$isMemoEdit && "0px 2px 10px 0px rgba(0, 0, 0, 0.04)"};

  & > textarea {
    padding: 0;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    resize: none;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
    }
  }
`;

export const TitlePlusBox = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    cursor: pointer;
  }
`;

export const SelectCostBox = styled.div`
  display: flex;
  gap: 20px;
`;

export const RoundIconBox = styled.div`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 30px;
`;

export const SelectCostItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  & > span {
    font-size: 12px;
    color: ${(props) =>
      props.$isSelected
        ? props.theme.color.secondary
        : props.theme.color.gray400};
  }
`;

export const CategoryIconBox = styled(RoundIconBox)<{ $isSelected: boolean }>`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.color.secondary
        : props.theme.color.gray200};
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  text-align: center;
`;

export const AddCostBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px 5px;

  & > div > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    line-height: 150%;
    margin-bottom: 8px;
  }
`;

export const CostInput = styled.div`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  height: 52px;
  padding: 15.5px 24px;

  & > input {
    outline: none;
    width: 100%;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
    }
  }
`;

export const ModalText = styled.p`
  font-size: 16px;
  font-weight: 700;
`

export const NoPlaceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 54px;
  margin-top: 15px;
`

export const NoPlaceTextBox = styled.div`
  width: 100%;
  height: 81px;
  display: grid;
  place-content: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.gray100};

  & > p {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
  }
`