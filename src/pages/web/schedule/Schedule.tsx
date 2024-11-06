import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/web/Container";
import { useUserStore } from "../../../store/user.store";
import { toast } from "react-toastify";
import ListIcon from "../../../assets/icons/ListIcon";
import UpcomingSchedule from "../../../components/web/schedule/UpcomingSchedule";
import OngoingSchedule from "../../../components/web/schedule/OngoingSchedule";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import { useEffect, useState } from "react";

export default function Schedule() {
  const navigate = useNavigate();
  const { getUserName } = useUserStore();

  const handleScheduleCreate = () => {
    if (!getUserName()) {
      toast(<span>로그인이 필요합니다.</span>);
    } else {
      navigate("/home/createSchedule");
    }
  };

  const [isListView, setIsListView] = useState(true);

  const handleListView = () => {
    setIsListView((p) => !p);
  };

  // useEffect(() => {
  //   if(여행중?){
  //     setIsListView(false)
  //   }
  // },[condition])

  return (
    <>
      <Container>
        <TitleWithButton>
          <h1>내 일정</h1>

          {isListView ? (
            <button onClick={handleScheduleCreate}>
              <CalendarCheckIcon stroke="#6979f8" />
              <span>일정 생성</span>
            </button>
          ) : (
            <button onClick={handleListView}>
              <ListIcon />
              <span>일정 목록</span>
            </button>
          )}
        </TitleWithButton>

        {isListView ? <UpcomingSchedule /> : <OngoingSchedule />}
      </Container>
    </>
  );
}

const TitleWithButton = styled.div`
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