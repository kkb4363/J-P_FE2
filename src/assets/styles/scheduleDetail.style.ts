import Slider from "react-slick";
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

export const PlansContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;
export const PlansEditButton = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 3px;
  color: ${(props) => props.theme.color.gray500};
`;

export const DaySelector = styled.div``;

export const StyledSlider = styled(Slider)`
  text-align: center;
  display: flex;
`;

export const ArrowBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const DayBox = styled.div<{ $select: boolean }>`
  width: 80px !important;
  padding: 8px 22px;
  white-space: nowrap;
  background-color: ${(props) =>
    props.$select ? props.theme.color.secondary : props.theme.color.white};
  color: ${(props) =>
    props.$select ? props.theme.color.white : props.theme.color.secondary};
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 16px;
  font-size: 14px;
  font-weight: 700;
`;

export const AddPlaceButton = styled.div`
  align-self: flex-end;
  text-align: center;
  padding: 13px 17px;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.white};
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);
`;

export const PlanDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlanDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > p {
    width: 100%;
    font-weight: 700;
    text-align: center;
  }
`;

export const EmptyBox = styled.div`
  width: 24px;
`;

export const PlanDetailsBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px 4px;
  font-size: 14px;

  & > div > p {
    color: ${(props) => props.theme.color.gray700};
    font-weight: 700;
    margin-bottom: 12px;
  }
`;

export const DetailsInput = styled.div`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  padding: 20px 27px;
  height: 98px;

  & > textarea {
    padding: 0;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
    }
  }
`;

export const CostInput = styled.div`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  height: 52px;
  padding: 15.5px 27px;

  & > input {
    outline: none;
    width: 100%;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
    }
  }
`;

export const TransportBox = styled.div`
  display: flex;
  gap: 10px;
`;

export const TransPortItem = styled.div<{ $select: boolean }>`
  padding: 10px 15px;
  border-radius: 30px;
  background-color: ${(props) =>
    props.$select
      ? props.theme.color.secondaryLight
      : props.theme.color.gray100};
  border: 1px solid
    ${(props) =>
      props.$select ? props.theme.color.secondary : props.theme.color.gray200};
  color: ${(props) =>
    props.$select ? props.theme.color.secondary : props.theme.color.gray700};
`;
