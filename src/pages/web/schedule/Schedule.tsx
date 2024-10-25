import styled from "styled-components";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import ScheduleCard from "../../../components/web/schedule/ScheduleCard";
import RecommendCard from "../../../components/web/schedule/RecommendCard";

export default function Schedule() {
  return (
    <ScheduleContainer>
      <>
        <TitleWithButton>
          <h1>내 일정</h1>
          <button>
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
    </ScheduleContainer>
  );
}

const ScheduleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 15%;
`;

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
