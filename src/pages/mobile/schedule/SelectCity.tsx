import styled from "styled-components";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/CustomInput";
import { NextButtonBox } from "./ScheduleLayout";
import { useDisplayStore } from "../../../store/display.store";
import { useCallback, useEffect, useRef, useState } from "react";
import { createSchedule, getPlaceList } from "../../../service/axios";
import { CityProps } from "../../../types/schedule";
import CustomSkeleton from "../../../components/CustomSkeleton";
import { cities } from "../../../utils/staticDatas";
import { formatDateToString } from "../../../utils/dateUtils";

export default function SelectCity() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCurrentCity, setCurrentCity } = useDisplayStore();
  const [city, setCity] = useState<CityProps[]>([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageToken, setPageToken] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const [search, setSearch] = useState("");

  const filteredCities = () => {
    const filteredCities = city.filter((c) => c.name.includes(search));
    return filteredCities;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || !hasNextPage || getCurrentCity() !== "") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading) {
            setPageToken((prev) => prev + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  const getCityApi = (page?: number) => {
    const cityType = getCurrentCity() !== "" ? getCurrentCity() : null;
    const cityCount = getCurrentCity() === "" ? 30 : 10;

    setIsLoading(true);
    if (page === 1) setCity([]);

    getPlaceList({
      type: "CITY",
      elementCnt: cityCount,
      cityType: cityType,
      page: page,
    }).then((res: any) => {
      if (res) {
        setCity((prev) => {
          if (page === 1) {
            return res?.data?.data;
          }
          const newCity = res?.data?.data?.filter(
            (n: any) => !prev.some((e) => e.placeId === n.placeId)
          );
          return [...prev, ...newCity];
        });
        setIsLoading(false);
        setHasNextPage(res?.data?.pageInfo.hasNext);
      }
    });
  };

  const handleSubmit = () => {
    const schedule = {
      startDate: formatDateToString(location?.state?.date[0].startDate, true),
      endDate: formatDateToString(location?.state?.date[0].endDate, true),
      placeId: selectedCityId,
    };

    if (!!selectedCityId) {
      createSchedule(schedule).then((res) => {
        if (res && res.status === 200) {
          navigate(`/Schedule/details`);
        }
      });
    }
  };

  useEffect(() => {
    if (!search) {
      getCityApi(1);
      setPageToken(1);
    }
  }, [getCurrentCity()]);

  useEffect(() => {
    if (pageToken > 1 && getCurrentCity() === "" && !search) {
      getCityApi(pageToken);
    }
  }, [pageToken, getCurrentCity()]);

  return (
    <>
      <CustomInput
        text="어디로 떠나고 싶나요?"
        value={search}
        onChange={handleSearch}
      />

      <SelectCityText>도시 선택</SelectCityText>

      <CityRow>
        <City
          $isSelect={getCurrentCity() === ""}
          onClick={() => setCurrentCity("")}
        >
          <span>전체</span>
        </City>
        {cities.map((city) => (
          <City
            $isSelect={getCurrentCity() === city.id}
            key={city.id}
            onClick={() => setCurrentCity(city.id)}
          >
            <span>{city.title}</span>
          </City>
        ))}
      </CityRow>

      <CityGridBox>
        {filteredCities()?.map((city) => (
          <CityGrid
            key={city.id}
            $isActive={selectedCityId === city.placeId}
            onClick={() => setSelectedCityId(city.placeId)}
          >
            {city.name}
          </CityGrid>
        ))}
        {isLoading && (
          <CustomSkeleton width="100px" height="64px" borderRadius="16px" />
        )}
        {city?.length !== 0 && <div ref={lastElementRef} />}
      </CityGridBox>

      <NextButtonBox>
        <button onClick={handleSubmit}>다음</button>
      </NextButtonBox>
    </>
  );
}

const SelectCityText = styled.p`
  color: ${(props) => props.theme.color.gray900};
  font-size: 16px;
  font-weight: 700;
  margin: 14px 0;
`;

const CityRow = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  ${scrollHidden};
  margin-bottom: 20px;
`;

const City = styled.div<{ $isSelect: boolean }>`
  padding: 6px 12px;
  background-color: ${(props) =>
    props.$isSelect
      ? props.theme.color.secondary
      : props.theme.color.background};
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 16px;

  & > span {
    color: ${(props) =>
      props.$isSelect ? props.theme.color.white : props.theme.color.secondary};
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
`;

const CityGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 9px;
  gap: 9px;
  height: calc(100% - 45px - 44px - 52px);
  overflow-y: auto;
  ${scrollHidden};
  align-content: flex-start;
  flex: 1;
`;

const CityGrid = styled.div<{ $isActive: boolean }>`
  padding: 24px 30px;
  max-height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) =>
    props.$isActive ? props.theme.color.secondary : props.theme.color.gray400};
  font-size: 14px;
  font-weight: 400;
  border-radius: 16px;
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray200};
`;
