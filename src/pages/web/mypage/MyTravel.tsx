import styled from "styled-components";
import { MyPageTitle } from "./MyReviews";
import MyTravelCard from "../../../components/web/mypage/MyTravelCard";
import { useEffect, useState } from "react";
import { getMySchedules } from "../../../service/axios";
import NotHasCard from "../../../components/web/mypage/NotHasCard";
import { useNavigate } from "react-router-dom";

export default function MyTravel() {
  const navigate = useNavigate();
  const [mySchedules, setMySchedules] = useState([] as any);

  const groupingYear = (data: any) => {
    const groups = data?.reduce((acc: any, schedule: any) => {
      const year = new Date(schedule?.startDate).getFullYear();

      if (!acc[year]) acc[year] = [];
      acc[year].push(schedule);

      return acc;
    }, {});

    setMySchedules(groups);
  };

  useEffect(() => {
    getMySchedules().then((res) => {
      if (res) {
        const schedules = res?.data?.data;
        groupingYear(schedules);
      }
    });
  }, []);

  return (
    <div>
      <MypageTitleWithButton>목록</MypageTitleWithButton>

      {mySchedules?.length === 0 ? (
        <NotHasCard
          text="내 일정이 없어요. 새로운 여행 일정을 만들어 주세요!"
          btnText="일정 생성"
          onClick={() => navigate(`/home/createSchedule`)}
        />
      ) : (
        <>
          {Object.keys(mySchedules)
            ?.reverse()
            .map((year: any) => (
              <TitleWithTravelBox key={year}>
                <p>{year}년</p>
                <div>
                  {mySchedules[year]?.reverse().map((t: any) => (
                    <MyTravelCard
                      width="350px"
                      height="95px"
                      key={t.id}
                      title={t.title}
                      startDate={t.startDate}
                      endDate={t.endDate}
                      isOpen={t.isOpen}
                    />
                  ))}
                </div>
              </TitleWithTravelBox>
            ))}
        </>
      )}
    </div>
  );
}

export const MypageTitleWithButton = styled(MyPageTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 42px;

  & > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;

    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;

    & > div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 2px solid ${(props) => props.theme.color.gray900};
    }
  }
`;

const TitleWithTravelBox = styled.div`
  margin-top: 30px;
  width: 650px;

  & > div {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }
`;
