import styled from "styled-components";
import Container from "../../../components/web/Container";
import { useEffect, useState } from "react";
import { DayProps } from "../../mobile/schedule/Calendar";
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import PrimaryButton from "../../../components/PrimaryButton";
import CustomInput from "../../../components/CustomInput";
import CitySlider from "../../../components/web/schedule/CitySlider";
import { useNavigate } from "react-router-dom";
import { getPlaceList } from "../../../utils/axios";
import { CityProps } from "../../../types/schedule";
import { useDisplayStore } from "../../../store/display.store";
import CustomSkeleton from "../../../components/CustomSkeleton";

export default function CreateSchedule() {
  const navigate = useNavigate();
  const { getCurrentCity } = useDisplayStore();
  const [city, setCity] = useState<CityProps[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [date, setDate] = useState<DayProps[]>([
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
  const [selectCity, setSelectCity] = useState("");

  const handleSubmit = () => {
    if (!selectDate.startDate) {
      setSelectDate({
        startDate: date[0].startDate + "",
        endDate: date[0].endDate + "",
      });
    } else {
      //TODO : navigate option state -> selectDate 정보 넘겨주고
      //넘겨받은 페이지에서 4.17~4.19(2박 3일) <- 요거 계산해서 표시해주기
      navigate(`/home/schedule/details/${selectCity}`);
    }
  };

  useEffect(() => {
    const cityType = getCurrentCity() !== "" ? getCurrentCity() : null;
    const cityCount = getCurrentCity() === "" ? 30 : 10;
    setCityLoading(true);

    getPlaceList({
      type: "CITY",
      elementCnt: cityCount,
      cityType: cityType,
    }).then((res) => {
      if (res) {
        setCity(res?.data.data);
        setCityLoading(false);
      }
    });
  }, [getCurrentCity()]);

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
            onChange={(item) => setDate([item.selection] as DayProps[])}
            ranges={date as DayProps[]}
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
            {cityLoading
              ? Array.from({ length: 7 }).map((_, idx) => (
                  <CustomSkeleton
                    width="106px"
                    height="78px"
                    key={idx}
                    borderRadius="16px"
                  />
                ))
              : city?.map((city) => (
                  <City
                    $isActive={selectCity === city.placeId}
                    key={city.id}
                    onClick={() => setSelectCity(city.placeId)}
                  >
                    <span>{city.name}</span>
                  </City>
                ))}
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
  cursor: pointer;

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
