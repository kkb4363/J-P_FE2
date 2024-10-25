import { useState } from "react";
import styled from "styled-components";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import InviteIcon from "../../../assets/icons/InviteIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import {
	ParticipantsRow
} from "../../../assets/styles/scheduleDetail.style";
import DaySlider from "../../../components/DaySlider";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import Container from "../../../components/web/Container";
import { testDayList, testImg1 } from "../../../utils/staticDatas";

export default function ScheduleDetails() {
  const [currentDay, setCurrentDay] = useState(0);

  const handleDayClick = (day: number) => {
    setCurrentDay(day);
  };
  return (
    <Container>
      <DetailsTitleBox>
        <h1>일정</h1>
        <div>J P</div>
      </DetailsTitleBox>
      <DetailsInfoBox>
        <InfoBox>
          <TitleBox>
            <p>남해 여행</p>
            <PenIcon stroke="#4D4D4D" />
          </TitleBox>
          <DaysBox>
            <CalendarCheckIcon stroke="#4D4D4D" />
            <p>4.17 ~ 4.19 (2박 3일)</p>
          </DaysBox>
          <MemberBox>
            <InviteIcon />
            <ParticipantsRow>
              <img src={testImg1} alt="참가자" />
              <img src={testImg1} alt="참가자" />
              <img src={testImg1} alt="참가자" />
            </ParticipantsRow>
          </MemberBox>
        </InfoBox>
        <AddPlaceButton>
          <span>+</span>
          <span>장소 추가</span>
        </AddPlaceButton>
      </DetailsInfoBox>

      <CustomGoogleMap
        width="100%"
        height="342px"
        lat={37.579617}
        lng={126.977041}
      />

      <PlansBox>
        <EditButton>
          <PenIcon stroke="#808080" />
          <p>편집</p>
        </EditButton>
        <DaySlider
          web
          dayList={testDayList}
          currentDay={currentDay}
          onDayClick={handleDayClick}
        />
        <PlanList>plans</PlanList>
      </PlansBox> 
    </Container>
  );
}

const DetailsTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const DetailsInfoBox = styled(DetailsTitleBox)`
  margin-bottom: 16px;
`;

const AddPlaceButton = styled.button`
  width: 143px;
  height: 50px;
  align-self: flex-start;
  margin-top: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px 30px;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 30px;

  & > span {
    color: ${(props) => props.theme.color.white};
    font-weight: 700;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }
`;

const DaysBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  & > p {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
  }
`;

const MemberBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlansBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const EditButton = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 2px;
  margin-bottom: 12px;

  & > p {
    color: ${(props) => props.theme.color.gray500};
    font-size: 14px;
  }
`;

const PlanList = styled.div`
  padding: 40px;
`;
