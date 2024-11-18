import { useEffect, useState } from "react";
import styled from "styled-components";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/user.store";
import { toast } from "react-toastify";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useModalStore } from "../../../store/modal.store";
import {
  getDaylistFromSchedule,
  getMySchedules,
  getSchedule,
} from "../../../service/axios";
import { ScheduleApiProps } from "../../../types/schedule";
import { formatDayNights } from "../../../utils/dayNights";
import { dayOfWeek } from "../../../utils/staticDatas";

interface Props {
  placeId: string;
}

export default function ScheduleModal({ placeId }: Props) {
  const navigate = useNavigate();
  const { getUserName } = useUserStore();
  const modalStore = useModalStore();
  const [schedules, setSchedules] = useState<ScheduleApiProps[]>([]);
  const [days, setDays] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDayId, setSelectedDayId] = useState("");

  const handlePlanCreate = () => {
    if (!!getUserName()) {
      navigate("/home/createSchedule");
    } else {
      toast(<span>로그인이 필요합니다.</span>);
    }
  };

  const handlePlanAdd = () => {
    // 기범TODO : api 추가하기

    modalStore.setCurrentModal("successAddPlan");
  };

  const filterMySchedules = () => {
    getMySchedules().then((res) => {
      if (res) {
        const filteredSchedules = res?.data.data.filter(
          (i: ScheduleApiProps) => i.status !== "COMPLETED"
        );
        setSchedules(filteredSchedules);
      }
    });
  };

  useEffect(() => {
    filterMySchedules();
  }, []);

  useEffect(() => {
    if (selectedCityId) {
      getSchedule(selectedCityId).then((res) => {
        if (res) {
          setDays(res?.data.dayResDtos);
        }
      });
    }
  }, [selectedCityId]);

  return (
    <>
      {schedules?.length !== 0 ? (
        <ScheduleModalContainer $isSelectCity={!!selectedCityId}>
          <h1>내 여행 일정</h1>
          <div>
            {schedules?.map((s) => {
              const sInfo = formatDayNights(s.startDate, s.endDate);
              return (
                <ScheduleBox
                  $isActive={selectedCityId === s.id + ""}
                  key={s.id}
                >
                  <p>{s.title.split(" ")[0]}</p>
                  <span>
                    {sInfo.startString} ~ {sInfo.endString}({sInfo.nights}박
                    {sInfo.days}일)
                  </span>
                  <h5 onClick={() => setSelectedCityId(s.id + "")}>선택</h5>
                </ScheduleBox>
              );
            })}
          </div>

          {!!selectedCityId && (
            <>
              <DayRow>
                {days?.map((day: any) => {
                  const stringDay =
                    day.date.split("-")[1] + "." + day.date.split("-").pop();
                  return (
                    <DayBox
                      $isActive={selectedDayId === day.id}
                      key={day.id}
                      onClick={() => setSelectedDayId(day.id)}
                    >
                      <p>Day{day.dayIndex}</p>
                      <span>
                        {stringDay}(
                        {dayOfWeek.find((d) => d.id === day.dayOfWeek)?.name})
                      </span>
                    </DayBox>
                  );
                })}
              </DayRow>
              <DayAddButton onClick={handlePlanAdd}>
                <span>추가하기</span>
              </DayAddButton>
            </>
          )}
        </ScheduleModalContainer>
      ) : (
        <NoScheduleModalContainer>
          <h1>내 여행 일정</h1>
          <span>
            <ScheduleIcon stroke="#b8b8b8" />
            일정이 없어요. 여행 일정을 등록해봐요!
          </span>
          <button onClick={handlePlanCreate}>내 일정 등록하기</button>
        </NoScheduleModalContainer>
      )}
    </>
  );
}

const ScheduleModalContainer = styled.div<{ $isSelectCity?: boolean }>`
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
    height: ${(props) => (props.$isSelectCity ? "85px" : "160px")};
    overflow-y: scroll;
    ${scrollHidden};
  }
`;

const NoScheduleModalContainer = styled(ScheduleModalContainer)`
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
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row !important;
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
  margin-top: 20px;
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
