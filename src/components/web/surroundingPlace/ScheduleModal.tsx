import { useState } from "react";
import styled from "styled-components";

export default function ScheduleModal() {
  const [selectPlan, setSelectPlan] = useState(false);
  const [selectDay, setSelectDay] = useState(false);

  return (
    <ScheduleModalContainer>
      <h1>내 여행 일정</h1>
      <div>
        <ScheduleBox $isActive={selectPlan}>
          <p>경주</p>
          <span>4.25 ~ 4.27(2박3일)</span>
          <h5 onClick={() => setSelectPlan(true)}>선택</h5>
        </ScheduleBox>
      </div>

      {selectPlan && (
        <>
          <DayRow>
            <DayBox $isActive={true}>
              <p>Day1</p>
              <span>4.25(목)</span>
            </DayBox>
            <DayBox $isActive={false}>
              <p>Day1</p>
              <span>4.25(목)</span>
            </DayBox>
            <DayBox $isActive={false}>
              <p>Day1</p>
              <span>4.25(목)</span>
            </DayBox>
          </DayRow>
          <DayAddButton>
            <span>추가하기</span>
          </DayAddButton>
        </>
      )}
    </ScheduleModalContainer>
  );
}

const ScheduleModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const ScheduleBox = styled.div<{ $isActive: boolean }>`
  width: 340px;
  height: 70px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: ${(props) =>
    props.$isActive ? props.theme.color.gray100 : props.theme.color.white};

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
    margin-right: 30px;
  }

  & > span {
    flex: 1;
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
  }

  & > h5 {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    cursor: pointer;
    display: ${(props) => props.$isActive && "none"};
  }
`;

const DayRow = styled.div`
  margin-top: 32px;
  width: 275px;
  display: flex;
  align-items: center;
  flex-direction: row !important;
  gap: 19px;
`;

const DayBox = styled.div<{ $isActive: boolean }>`
  width: 80px;
  height: 61px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.$isActive ? props.theme.color.main : props.theme.color.gray200};
  gap: 3px;

  & > p {
    color: ${(props) =>
      props.$isActive ? props.theme.color.main : props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) =>
      props.$isActive ? props.theme.color.main : props.theme.color.gray400};
    font-size: 14px;
    font-weight: 500;
  }
`;

const DayAddButton = styled.button`
  margin-top: 40px;
  width: 190px;
  height: 45px;
  padding: 12px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.main};

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
  }
`;
