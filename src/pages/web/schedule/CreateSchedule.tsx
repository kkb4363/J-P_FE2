import styled from "styled-components";
import Container from "../../../components/web/Container";
import { useCallback, useEffect, useRef, useState } from "react";
import { DayProps } from "../../mobile/schedule/Calendar";
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import PrimaryButton from "../../../components/PrimaryButton";
import CustomInput from "../../../components/CustomInput";
import CitySlider from "../../../components/web/schedule/CitySlider";
import { useNavigate } from "react-router-dom";
import { createSchedule, getPlaceList } from "../../../service/axios";
import { CityProps } from "../../../types/schedule";
import { useDisplayStore } from "../../../store/display.store";
import CustomSkeleton from "../../../components/CustomSkeleton";
import { formatDateToString } from "./../../../utils/dateUtils";
import { toast } from "react-toastify";

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

  const [isLoading, setIsLoading] = useState(false);
  const [pageToken, setPageToken] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleSubmit = () => {
    if (!selectDate.startDate) {
      setSelectDate({
        startDate: date[0].startDate + "",
        endDate: date[0].endDate + "",
      });
    } else {
      const schedule = {
        startDate: formatDateToString(selectDate.startDate, true),
        endDate: formatDateToString(selectDate.endDate, true),
        placeId: selectCity,
      };
      createSchedule(schedule).then((res) => {
        if (res && res.status === 200) {
          toast(<span>일정이 생성되었습니다!</span>);
          navigate(`/home/schedule/details/${res.data}`);
        }
      });
    }
  };

  const requestApi = () => {
    const cityType = getCurrentCity() !== "" ? getCurrentCity() : null;
    const cityCount = getCurrentCity() === "" ? 30 : 10;
    setCityLoading(true);

    getPlaceList({
      type: "CITY",
      elementCnt: cityCount,
      cityType: cityType,
    }).then((res: any) => {
      if (res) {
        setCity(res?.data?.data);
        setCityLoading(false);
        console.log(res);
        // 백엔드 분들한테 얘기해서 totalPage 맞게 수정해달라고 하기
        if (res?.data?.pageInfo.totalPages !== 15) {
          setTotalPage(res?.data?.pageInfo.totalPages);
        }
      }
    });
  };

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || !pageToken) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && pageToken) {
            setPageToken((p) => p + 1);
          }
        },
        { threshold: 1.0 }
      );

      if (node) observer.current.observe(node);
    },
    [pageToken, isLoading]
  );

  const [totalPage, setTotalPage] = useState(0);

  const scrollApi = (page?: number) => {
    const cityType = getCurrentCity() !== "" ? getCurrentCity() : null;
    const cityCount = getCurrentCity() === "" ? 30 : 10;

    if (pageToken <= totalPage) {
      setIsLoading(true);

      getPlaceList({
        type: "CITY",
        elementCnt: cityCount,
        cityType: cityType,
        page: page,
      }).then((res: any) => {
        if (res) {
          setCity((prev) => {
            const newCity = res?.data?.data?.filter(
              (n: any) => !prev.some((e) => e.placeId === n.placeId)
            );
            return [...prev, ...newCity];
          });
          setIsLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    if (selectDate.startDate) {
      requestApi();
    }
  }, [getCurrentCity(), selectDate.startDate]);

  useEffect(() => {
    setPageToken(1);
  }, [getCurrentCity()]);

  useEffect(() => {
    if (totalPage !== 0) {
      scrollApi(pageToken);
    }
  }, [pageToken]);

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
          <h2>어디로 떠나고 싶으신가요?</h2>

          <InputBox>
            <CustomInput
              width="500px"
              height="60px"
              text="도시를 선택해주세요."
              value=""
              onChange={() => {}}
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
                    onClick={() => {
                      setSelectCity(city.placeId);
                    }}
                  >
                    <span>{city.name}</span>
                  </City>
                ))}
            <div ref={lastElementRef} />
            {isLoading &&
              Array.from({ length: 7 }).map((_, idx) => (
                <CustomSkeleton
                  width="106px"
                  height="78px"
                  key={idx}
                  borderRadius="16px"
                />
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
