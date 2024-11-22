import { useEffect, useState } from "react";
import styled from "styled-components";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useModalStore } from "../../../store/modal.store";
import {
  getScheduleList,
  getSchedule,
  addPlaceToSchedule,
  getPlaceDetail,
} from "../../../service/axios";
import { ScheduleApiProps } from "../../../types/schedule";
import { formatDayNights } from "../../../utils/dayNights";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import MoveDaySlider from "../../MoveDaySlider";
import PrimaryButton from "../../PrimaryButton";
import TimeSwiper from "../../TimeSwiper";
import { PlaceDetailAPiProps } from "../../../types/home.details";
import { Cookies } from "react-cookie";

interface Props {
  placeId: string;
}

const cookies = new Cookies();

export default function TravelPlaceAddModal({ placeId }: Props) {
  const navigate = useNavigate();
  const modalStore = useModalStore();

  const {
    selectDay,
    setSelectDay,
    selectTime,
    setSelectTime,
    openModal,
    setOpenModal,
    handleDaySelect,
  } = useAddPlaceHook();

  const [placeInfo, setPlaceInfo] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );

  const [myScheduleList, setMyScheduleList] = useState<ScheduleApiProps[]>([]);
  const [dayResDtos, setDayResDtos] = useState([]);
  const [selectScheduleId, setSelectScheduleId] = useState("");

  const getTitle = () => {
    if (openModal.selectDay) return "날짜 선택";
    else if (openModal.selectTime) return "시간 선택";
    else if (myScheduleList?.length !== 0) return "내 여행 일정";
  };

  const getMyScheduleList = () => {
    getScheduleList().then((res) => {
      if (res) {
        const filteredSchedules = res?.data.data.filter(
          (i: ScheduleApiProps) => i.status !== "COMPLETED"
        );
        setMyScheduleList(filteredSchedules);
      }
    });
  };

  const handlePlaceAddBtnClick = () => {
    if (!!cookies.get("userToken")) {
      navigate("/home/createSchedule");
    } else {
      toast(<span>로그인이 필요합니다.</span>);
    }
  };

  const handlePlaceAdd = () => {
    const place = [
      {
        time: selectTime,
        location: placeInfo.location,
        placeId: placeInfo.placeId,
        name: placeInfo.name,
      },
    ];

    addPlaceToSchedule(selectDay, place).then((res) => {
      if (res?.data) {
        modalStore.setCurrentModal("successAddPlan");
      }
    });
  };

  useEffect(() => {
    getMyScheduleList();
  }, []);

  useEffect(() => {
    getPlaceDetail({ placeId: placeId }).then((res) => {
      if (res) {
        setPlaceInfo(res?.data);
      }
    });
  }, [placeId]);

  useEffect(() => {
    if (selectScheduleId) {
      getSchedule(selectScheduleId).then((res) => {
        if (res) {
          setDayResDtos(res?.data.dayResDtos);
          setOpenModal((p) => ({ ...p, selectDay: true }));
        }
      });
    }
  }, [selectScheduleId]);

  return (
    <>
      {myScheduleList?.length !== 0 ? (
        <TravelPlaceAddModalContainer>
          <h1>{getTitle()}</h1>
          {!selectScheduleId && (
            <article>
              {myScheduleList?.map((s) => {
                const sInfo = formatDayNights(s.startDate, s.endDate);
                return (
                  <ScheduleBox key={s.id}>
                    <p>{s.title.split(" ")[0]}</p>
                    <span>
                      {sInfo.startString} ~ {sInfo.endString}({sInfo.nights}박
                      {sInfo.days}일)
                    </span>
                    <h5 onClick={() => setSelectScheduleId(s.id + "")}>선택</h5>
                  </ScheduleBox>
                );
              })}
            </article>
          )}

          {openModal.selectDay && (
            <>
              <MoveDaySlider
                isMobile={false}
                dayResDtos={dayResDtos}
                selectDay={selectDay}
                setSelectDay={setSelectDay}
              />
              <ButtonBox>
                <PrimaryButton
                  onClick={handleDaySelect}
                  width="190px"
                  height="45px"
                  text="다음"
                />
              </ButtonBox>
            </>
          )}

          {openModal.selectTime && (
            <>
              <TimeSwiper isMobile={false} setSelectTime={setSelectTime} />
              <ButtonBox>
                <PrimaryButton
                  onClick={handlePlaceAdd}
                  width="190px"
                  height="45px"
                  text="완료"
                />
              </ButtonBox>
            </>
          )}
        </TravelPlaceAddModalContainer>
      ) : (
        <NoTravelPlaceAddModalContainer>
          <h1>내 여행 일정</h1>
          <span>
            <ScheduleIcon stroke="#b8b8b8" />
            일정이 없어요. 여행 일정을 등록해봐요!
          </span>
          <button onClick={handlePlaceAddBtnClick}>내 일정 등록하기</button>
        </NoTravelPlaceAddModalContainer>
      )}
    </>
  );
}

const TravelPlaceAddModalContainer = styled.aside`
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

  & > article {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 160px;
    overflow-y: scroll;
    ${scrollHidden};
  }
`;

const NoTravelPlaceAddModalContainer = styled(TravelPlaceAddModalContainer)`
  justify-content: space-between;

  & > h1 {
    margin-bottom: 0;
  }

  & > span {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.gray300};
    font-size: 16px;
  }

  & > button {
    width: 190px;
    height: 50px;
    padding: 12px 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.gray300};
    background-color: ${(props) => props.theme.color.white};

    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }
`;

export const ScheduleBox = styled.section`
  width: 340px;
  height: 70px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: ${(props) => props.theme.color.white};

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
  }
`;

const ButtonBox = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`;
