import styled from "styled-components";
import CalendarCheckIcon from "../assets/icons/CalendarCheckIcon";

interface Props {
  dates: {
    startDate: string;
    endDate: string;
  };
}

export default function DatesBox({ dates }: Props) {
  const start = new Date(dates.startDate);
  const end = new Date(dates.endDate);

  const timeDiff = end.getTime() - start.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const text = `${start.getMonth() + 1}.${start.getDate()} 
    ~ ${end.getMonth() + 1}.${end.getDate()} 
  (${dayDiff}박 ${dayDiff + 1}일)`;

  return (
    <DatesBoxContainer>
      <CalendarCheckIcon stroke="#4D4D4D" />
      <p>{text}</p>
    </DatesBoxContainer>
  );
}

const DatesBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  & > p {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
  }
`;
