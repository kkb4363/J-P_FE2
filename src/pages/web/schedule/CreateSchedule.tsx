import styled from "styled-components";
import Container from "../../../components/web/Container";
import { useState } from "react";
import { DayProps } from "../../mobile/schedule/Calendar";
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import PrimaryButton from "../../../components/PrimaryButton";
import CustomInput from "../../../components/CustomInput";
import CitySlider from "../../../components/web/schedule/CitySlider";

export default function CreateSchedule() {
  const [state, setState] = useState<DayProps[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectDate, setSelectDate] = useState({
    startDate: "",
    endDate: "",
  });

  const handleSubmit = () => {
    setSelectDate({
      startDate: state[0].startDate + "",
      endDate: state[0].endDate + "",
    });
  };

  console.log(selectDate);

  return (
    <Container>
      <h1>일정</h1>

      {!selectDate.startDate ? (
        <SelectDateBox>
          <h2>여행 날짜를 선택해주세요.</h2>

          <DateRange
            locale={ko}
            editableDateInputs={true}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            months={2}
            direction="horizontal"
            onChange={(item) => setState([item.selection] as DayProps[])}
            ranges={state as DayProps[]}
            rangeColors={["#e7e9fe"]}
          />
        </SelectDateBox>
      ) : (
        <SelectCityBox>
          <h2>도시를 선택해주세요.</h2>

          <InputBox>
            <CustomInput
              width="500px"
              height="60px"
              text="어디로 떠나고 싶나요?"
              value=""
            />
          </InputBox>

          <p>도시 선택</p>

          <CitySliderBox>
            <CitySlider />
          </CitySliderBox>

          <CityBox>
            <City $isActive={true}>
              <span>서울</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
            <City $isActive={false}>
              <span>대전</span>
            </City>
          </CityBox>
        </SelectCityBox>
      )}

      <ButtonBox>
        <PrimaryButton
          onClick={handleSubmit}
          blue={true}
          text="다음"
          width="190px"
        />
      </ButtonBox>
    </Container>
  );
}

const SelectDateBox = styled.div`
  margin-top: 40px;
  & > h2 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 106px;
  }
`;

const SelectCityBox = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  & > h2 {
    margin: 0 auto;
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 24px 0 44px 0;
`;

const CitySliderBox = styled.div`
  margin-top: 24px;
`;

const CityTag = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  background-color: ${(props) =>
    props.$isActive ? props.theme.color.secondary : props.theme.color.white};
  cursor: pointer;

  & > span {
    color: ${(props) =>
      props.$isActive ? props.theme.color.white : props.theme.color.secondary};
    font-size: 14px;
  }
`;

const CityBox = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  row-gap: 30px;
`;

const City = styled.div<{ $isActive: boolean }>`
  width: 106px;
  height: 78px;
  border-radius: 16px;
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray400};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 117px;
`;
