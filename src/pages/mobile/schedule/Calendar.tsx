import styled from "styled-components";
import { InfoRow, InfoText } from "../../../assets/styles/home.style";
import ko from "date-fns/locale/ko";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { NextButtonBox } from "./CreateSchedule";
import { useNavigate } from "react-router-dom";

interface DayProps {
  startDate: Date;
  endDate: Date | undefined;
  key: string;
}

export default function Calendar() {
  const navigate = useNavigate();
  const [state, setState] = useState<DayProps[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      <InfoRow>
        <InfoText>여행 일정 만들기</InfoText>
      </InfoRow>
      <SubInfo>여행 날짜를 선택해주세요.</SubInfo>
      <CalendarBox>
        <DateRange
          locale={ko}
          editableDateInputs={true}
          showDateDisplay={false}
          showMonthAndYearPickers={false}
          onChange={(item) => setState([item.selection] as DayProps[])}
          ranges={state as DayProps[]}
          rangeColors={["#6979f8"]}
        />
      </CalendarBox>
      <NextButtonBox>
        <button
          onClick={() =>
            navigate("city", {
              state: {
                date: state,
              },
            })
          }
        >
          다음
        </button>
      </NextButtonBox>
    </>
  );
}

const SubInfo = styled.p`
  color: ${(props) => props.theme.color.gray700};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 30px;
`;

const CalendarBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
