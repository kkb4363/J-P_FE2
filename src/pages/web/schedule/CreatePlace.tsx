import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { scrollHidden } from "../../../assets/styles/home.style";
import CustomInput from "../../../components/CustomInput";
import DatesBox from "../../../components/DatesBox";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import MoveDaySlider from "../../../components/MoveDaySlider";
import OneButtonModal from "../../../components/OneButtonModal";
import PrimaryButton from "../../../components/PrimaryButton";
import TimeSwiper from "../../../components/TimeSwiper";
import AddPlaceCard from "../../../components/web/schedule/AddPlaceCard";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import { GooglePlaceProps } from "../../../types/place";
import {
  addPlaceToSchedule,
  getGoogleSearchPlaceList,
} from "../../../service/axios";
import { useUserStore } from "../../../store/user.store";
import { useMapStore } from "../../../store/map.store";
import { useJPStore } from "../../../store/JPType.store";

export default function CreatePlace() {
  const [isLoading, setIsLoading] = useState(false);
  const [placeList, setPlaceList] = useState<GooglePlaceProps[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [searchString, setSearchString] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const { jpState } = useJPStore();
  const navigate = useNavigate();

  const {
    list,
    selectDay,
    setSelectDay,
    selectTime,
    setSelectTime,
    handleAdd,
    handleRemove,
    openModal,
    setOpenModal,
    handleDaySelect,
  } = useAddPlaceHook();

  const {
    state: { scheduleId, city, dates, dayResDtos, location },
  } = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    setPlaceList([]);
    setIsSubmitted(false);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchString.trim() !== "") {
      setIsSubmitted(true);
      requestApi(searchString);
    }
  };

  const { getUserType } = useUserStore();
  const handleAddPlaceClick = async () => {
    setOpenModal((p) => ({ ...p, selectTime: false }));
    if (!selectDay || !selectTime) {
      return;
    }

    const places = list.map((place) => ({
      time: selectTime,
      location: place.geometry.location,
      placeId: place.placeId,
      name: place.name,
    }));

    await addPlaceToSchedule(selectDay, places, jpState).then((res) => {
      if (res?.data) {
        navigate(`/home/schedule/details/${scheduleId}`);
      }
    });
  };

  const requestApi = async (search: string = "", token?: string) => {
    if (!city) return;
    const query = search.trim() ? `${city} ${search}` : `${city} 인기 여행지`;
    setIsLoading(true);

    try {
      const res = await getGoogleSearchPlaceList(query, token);
      setPlaceList((prev) => {
        const newPlaces = res.results.filter(
          (newPlace: { placeId: string }) =>
            !prev.some(
              (existingPlace) => existingPlace.placeId === newPlace.placeId
            )
        );
        return [...prev, ...newPlaces];
      });
      setNextPageToken(res.nextPageToken);
    } finally {
      setIsLoading(false);
    }
  };

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || !nextPageToken) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && nextPageToken) {
            if (!isSubmitted) {
              requestApi(searchString, nextPageToken);
            }
          }
        },
        { threshold: 1.0 }
      );

      if (node) observer.current.observe(node);
    },
    [nextPageToken, isLoading, searchString]
  );

  useEffect(() => {
    requestApi();
  }, [city]);

  useEffect(() => {
    if (!isSubmitted && searchString.trim() === "") {
      requestApi();
    }
  }, [searchString, isSubmitted]);

  // 장소 추가
  const mapStore = useMapStore();
  useEffect(() => {
    mapStore.setNearPlace(placeList);
  }, [placeList]);

  const [focusPlaceId, setFocusPlaceId] = useState("");

  const handleMarkerFocus = (placeId: string) => {
    setFocusPlaceId(placeId);
  };

  return (
    <>
      <CreatePlaceContainer>
        <SideBar>
          <SideHeader>
            <h1>{`${city} 여행`}</h1>
            <DatesBox dates={dates} />

            <SideInputBox>
              <CustomInput
                text="어디로 떠나고 싶나요?"
                value={searchString}
                onChange={handleInputChange}
                onSubmit={handleInputSubmit}
              />
            </SideInputBox>
          </SideHeader>

          <SideCardCol>
            {placeList.map((item, idx) => (
              <AddPlaceCard
                key={idx}
                isSelect={list.some((place) => place.placeId === item.placeId)}
                handleAdd={() => handleAdd(item)}
                handleRemove={() => handleRemove(item.placeId)}
                handleClick={handleMarkerFocus}
                item={item}
              />
            ))}
            <div ref={lastElementRef} />
          </SideCardCol>

          <SideBtnBox>
            <PrimaryButton
              width="190px"
              height="44px"
              blue={true}
              text="완료"
              isDisabled={list.length === 0}
              onClick={() => setOpenModal((p) => ({ ...p, selectDay: true }))}
            />
          </SideBtnBox>
        </SideBar>

        <GoogleMapBox>
          {!!location?.lat && (
            <CustomGoogleMap
              width="100%"
              height="98%"
              lat={location.lat}
              lng={location.lng}
              handleMarkerClick={() => {}}
              focusCenterId={focusPlaceId}
            />
          )}
        </GoogleMapBox>
      </CreatePlaceContainer>

      {openModal.selectDay && (
        <OneButtonModal
          isMobile={false}
          width="470px"
          height="390px"
          title="날짜 선택"
          buttonText="다음"
          onClick={handleDaySelect}
          onClose={() => setOpenModal((p) => ({ ...p, selectDay: false }))}
        >
          <MoveDaySlider
            isMobile={false}
            dayResDtos={dayResDtos}
            selectDay={selectDay}
            setSelectDay={setSelectDay}
          />
        </OneButtonModal>
      )}

      {openModal.selectTime && (
        <OneButtonModal
          isMobile={false}
          key={"시간 설정 모달"}
          title="시간 설정"
          buttonText="완료"
          onClick={handleAddPlaceClick}
          onClose={() => setOpenModal((p) => ({ ...p, selectTime: false }))}
          width="440px"
          height="320px"
        >
          <TimeSwiper isMobile={false} setSelectTime={setSelectTime} />
        </OneButtonModal>
      )}
    </>
  );
}

const CreatePlaceContainer = styled.div`
  width: calc(100% + 240px);
  height: calc(100% + 80px);
  margin-left: -120px;
  margin-bottom: -80px;
  min-height: 756px;
  display: flex;
  overflow-y: scroll;
`;

const SideBar = styled.nav`
  width: 509px;
  height: 100%;
  padding: 37px 35px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.white};
  overflow-y: scroll;
  overflow-x: hidden;
  ${scrollHidden};
`;

const SideHeader = styled.section`
  display: flex;
  flex-direction: column;
  height: 175px;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

const SideInputBox = styled.div`
  width: 439px;
  margin: 32px auto 24px;
  height: 60px;
`;

const SideCardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 3;
  height: calc(100% - 175px - 60px - 40px);
  ${scrollHidden};
  overflow: scroll;
`;

const SideBtnBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const GoogleMapBox = styled.div`
  width: calc(100% - 509px);
  height: 100%;
`;
