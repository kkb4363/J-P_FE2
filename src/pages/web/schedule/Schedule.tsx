import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/web/Container";
import { toast } from "react-toastify";
import UpcomingSchedule from "../../../components/web/schedule/UpcomingSchedule";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import { useEffect, useState } from "react";
import { getScheduleList } from "../../../service/axios";
import { ScheduleApiProps } from "../../../types/schedule";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function Schedule() {
  const navigate = useNavigate();

  const [mySchedules, setMySchedules] = useState<ScheduleApiProps[]>([]);

  const handleScheduleCreate = () => {
    if (!cookies.get("userToken")) {
      toast(<span>로그인이 필요합니다.</span>);
    } else {
      navigate("/home/createSchedule");
    }
  };

  useEffect(() => {
    getScheduleList().then((res) => {
      if (res) {
        setMySchedules(res?.data?.data);
      }
    });
  }, []);

  return (
    <>
      <Container>
        <TitleWithButton>
          <h1>일정</h1>

          <button onClick={handleScheduleCreate}>
            <CalendarCheckIcon stroke="#6979f8" />
            <span>일정 생성</span>
          </button>
        </TitleWithButton>

        <UpcomingSchedule
          schedules={mySchedules
            .filter((p) => p.status !== "COMPLETED")
            .reverse()}
          setSchedules={setMySchedules}
        />
      </Container>
    </>
  );
}

const TitleWithButton = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 32px;
    font-weight: 700;
  }

  & > button {
    display: flex;
    align-items: center;
    gap: 6px;

    & > span {
      color: ${(props) => props.theme.color.secondary};
      font-size: 16px;
      font-weight: 700;
    }
  }
`;
