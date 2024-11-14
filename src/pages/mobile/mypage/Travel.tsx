import styled from "styled-components";
import { useEffect, useState } from "react";
import { getMySchedules } from "../../../service/axios";
import NotHasCard from "../../../components/web/mypage/NotHasCard";
import { useNavigate } from "react-router-dom";
import MyTravelCard from "../../../components/web/mypage/MyTravelCard";

export default function Travel() {
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
    <>
      <TravelHeader>
        <span>목록</span>
      </TravelHeader>

      {mySchedules?.length !== 0 ? (
        <NotHasCard
          isMobile={true}
          text="내 일정이 없어요. 새로운 여행 일정을 만들어 주세요!"
          btnText="일정 생성"
          onClick={() => navigate(`/Schedule`)}
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
                      width="100%"
                      height="85px"
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
    </>
  );
}

export const TravelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 20px;
    font-weight: 700;
  }
`;

const TitleWithTravelBox = styled.div`
  margin-top: 30px;
  width: 100%;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

export const TravelCard = styled.div`
  min-height: 60px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  display: flex;
  align-items: center;

  & > span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 3;

    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
