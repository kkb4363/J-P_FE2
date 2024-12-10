import styled from "styled-components";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import { formatDayNights } from "../../../utils/dayNights";
import { ScheduleApiProps } from "../../../types/schedule";

interface Props {
  data: ScheduleApiProps;
  handleClick?: () => void;
  checkedId: number;
}

export default function MyScheduleCard(props: Props) {
  const travelInfo = formatDayNights(
    props?.data?.startDate,
    props?.data?.endDate
  );

  return (
    <MyTravelCardContainer
      $isSelect={props?.checkedId === props?.data?.id}
      onClick={props?.handleClick}
    >
      <p>{props?.data.title.split("여행")?.[0]}</p>

      <span>
        <CalendarCheckIcon />
        {travelInfo?.startString} ~{travelInfo?.endString}
      </span>
    </MyTravelCardContainer>
  );
}

const MyTravelCardContainer = styled.article<{
  $isSelect: boolean;
}>`
  width: 390px;
  min-height: 70px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid
    ${(props) =>
      props.$isSelect
        ? props.theme.color.secondary
        : props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  gap: 16px;
  cursor: pointer;

  & > p {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }

  & > span {
    display: flex;
    align-items: center;
    gap: 3px;
    flex: 4;
  }
`;
