import styled from "styled-components";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import ScheduleCard from "../../../components/web/schedule/ScheduleCard";
import RecommendCard from "../../../components/web/schedule/RecommendCard";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/web/Container";
import { useEffect, useState } from "react";
import { getMySchedules, getRecommendSchedules } from "../../../utils/axios";
import { useUserStore } from "../../../store/user.store";
import { toast } from "react-toastify";

export default function Schedule() {
  const navigate = useNavigate();
  const { getUserName } = useUserStore();
  const [mySchedules, setMySchedules] = useState([]);

  const handleScheduleCreate = () => {
    if (!getUserName()) {
      toast(<span>로그인이 필요합니다.</span>);
    } else {
      navigate("/home/createSchedule");
    }
  };

  useEffect(() => {
    getRecommendSchedules().then((res) => console.log(res));
  }, []);

  useEffect(() => {
    if (!!getUserName()) {
      getMySchedules().then((res) => {
        setMySchedules(res?.data);
      });
    }
  }, []);

  console.log(mySchedules);

  return (
    <>
      <Container>
        <>
          <TitleWithButton>
            <h1>내 일정</h1>
            <button onClick={handleScheduleCreate}>
              <CalendarCheckIcon stroke="#6979f8" />
              <span>일정 생성</span>
            </button>
          </TitleWithButton>

          <SubTitleWithMore>
            <h2>다가오는 일정 1</h2>
          </SubTitleWithMore>

          <ScheduleCardBox>
            <ScheduleCard />
          </ScheduleCardBox>
        </>

        <SubTitleWithMore>
          <h2>여행 일정 추천</h2>
          <span>더보기</span>
        </SubTitleWithMore>

        <RecommendCardBox>
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
        </RecommendCardBox>
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

    & > span {
      color: ${(props) => props.theme.color.secondary};
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const SubTitleWithMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  & > h2 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
  }
`;

const ScheduleCardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 104px;
`;

const RecommendCardBox = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 70px;
`;
