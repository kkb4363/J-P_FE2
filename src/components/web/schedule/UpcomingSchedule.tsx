import styled from "styled-components";
import ScheduleSlider from "./ScheduleSlider";
import RecommendCard from "./RecommendCard";
import { ScheduleApiProps } from "../../../types/schedule";

interface Props {
  schedules: ScheduleApiProps[];
}

export default function UpcomingSchedule({ schedules }: Props) {
  return (
    <>
      <SubTitleWithMore>
        <h2>내 일정</h2>
      </SubTitleWithMore>

      {schedules?.length !== 0 && (
        <ScheduleCardBox>
          <ScheduleSlider schedules={schedules} />
        </ScheduleCardBox>
      )}

      <SubTitleWithMore>
        <h2>여행 일정 추천</h2>
        <span>더보기</span>
      </SubTitleWithMore>

      <RecommendCardBox>
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
      </RecommendCardBox>
    </>
  );
}

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
  margin-bottom: 104px;
  width: 100%;
`;

const RecommendCardBox = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 70px;
`;
