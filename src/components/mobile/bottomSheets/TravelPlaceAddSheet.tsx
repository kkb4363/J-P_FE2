import styled from "styled-components";
import BottomSheet from "../BottomSheet";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import {
  addPlaceToSchedule,
  getPlaceDetail,
  getSchedule,
  getScheduleList,
} from "../../../service/axios";
import { ScheduleApiProps } from "../../../types/schedule";
import { PlaceDetailAPiProps } from "../../../types/home.details";
import { formatDayNights } from "../../../utils/dayNights";
import { ScheduleBox } from "../../web/surroundingPlace/TravelPlaceAddModal";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import MoveDaySlider from "../../MoveDaySlider";
import PrimaryButton from "../../PrimaryButton";
import TimeSwiper from "../../TimeSwiper";
import { useUserStore } from "../../../store/user.store";

interface Props {
  handleClose: () => void;
  placeId: string;
}

const cookies = new Cookies();

export default function TravelPlaceAddSheet({ handleClose, placeId }: Props) {
  const navigate = useNavigate();

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
  const [selectScheduleId, setSelectScheduleId] = useState("");
  const [dayResDtos, setDayResDtos] = useState([]);

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
      navigate("/Schedule");
    } else {
      toast(<span>로그인이 필요합니다.</span>);
    }
  };

  const { getUserType } = useUserStore();
  const handlePlaceAdd = () => {
    const place = [
      {
        time: selectTime,
        location: placeInfo.location,
        placeId: placeInfo.placeId,
        name: placeInfo.name,
      },
    ];

    addPlaceToSchedule(selectDay, getUserType(), place).then((res) => {
      if (res?.data) {
        toast(
          <SuccessModal>
            <span>일정에 추가 되었습니다.</span>
            <span onClick={() => navigate("/home/schedule")}>
              내 일정 보기 <ArrowRightIcon stroke="#6979F8" />
            </span>
          </SuccessModal>
        );
        handleClose();
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
  }, []);

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
    <BottomSheet
      isBlocking={true}
      maxH={0.5}
      isDismiss={true}
      handleClose={handleClose}
    >
      {myScheduleList?.length !== 0 ? (
        <TravelPlaceAddSheetContainer>
          <h1>{getTitle()}</h1>
          {!selectScheduleId && (
            <article>
              {myScheduleList?.map((s) => {
                const sInfo = formatDayNights(s.startDate, s.endDate);
                return (
                  <ScheduleBox style={{ width: "320px" }} key={s.id}>
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
                isMobile={true}
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
              <TimeSwiper isMobile={true} setSelectTime={setSelectTime} />
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
        </TravelPlaceAddSheetContainer>
      ) : (
        <TravelPlaceAddSheetContainer>
          <NoScheduleTitleBox>
            <CalendarIcon />
            <span> 일정이 없어요. 여행 일정을 등록해봐요!</span>
          </NoScheduleTitleBox>

          <AddScheduleButton onClick={handlePlaceAddBtnClick}>
            <span>일정 등록하기</span>
          </AddScheduleButton>
        </TravelPlaceAddSheetContainer>
      )}
    </BottomSheet>
  );
}

const TravelPlaceAddSheetContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 5px 0;
  margin-left: -16px;
  min-height: 330px;
  width: calc(100% + 32px);

  & > h1 {
    text-align: center;
    color: ${(props) => props.theme.color.black};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 32px;
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

const ButtonBox = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;

const NoScheduleTitleBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  padding-bottom: 50px;
  flex: 1;

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 16px;
    font-weight: 400;
  }
`;

const AddScheduleButton = styled.button`
  width: 190px;
  height: 45px;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  background-color: ${(props) => props.theme.color.white};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }
`;

const SuccessModal = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span:first-child {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 400;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.secondary};
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;
