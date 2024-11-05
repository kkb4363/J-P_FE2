import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import InviteIcon from "../../../assets/icons/InviteIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import { ParticipantsRow } from "../../../assets/styles/scheduleDetail.style";
import DatesBox from "../../../components/DatesBox";
import DaySlider from "../../../components/DaySlider";
import JPToggle from "../../../components/JPToggle";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import Container from "../../../components/web/Container";
import PlanItem from "../../../components/web/schedule/PlanItem";
import { planItemProps } from "../../../types/schedule";
import {
  testDayList,
  testImg1,
  testPlanItems,
} from "../../../utils/staticDatas";

export default function ScheduleDetails() {
  const [currentDay, setCurrentDay] = useState(0);
  const [planItems, setPlanItems] = useState<planItemProps[]>(testPlanItems);
  const [isEdit, setIsEdit] = useState(false);

  const { state: dates } = useLocation();
  const placeId = useParams();
  console.log(placeId);
  console.log(dates);

  const handleDayClick = (day: number) => {
    setCurrentDay(day);
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over) return;
    if (active.id !== over.id) {
      const activeIndex = planItems.findIndex(
        (item) => item.id === active.id.toString()
      );
      const overIndex = planItems.findIndex(
        (item) => item.id === over.id.toString()
      );

      setPlanItems(arrayMove(planItems, activeIndex, overIndex));
    }
  };

  return (
    <Container>
      <DetailsTitleBox>
        <h1>일정</h1>
        <JPToggle />
      </DetailsTitleBox>
      <DetailsInfoBox>
        <InfoBox>
          <TitleBox>
            <p>남해 여행</p>
            <PenIcon stroke="#4D4D4D" />
          </TitleBox>
          <DatesBox dates={dates} />
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
        <EditButton $isEdit={isEdit} onClick={() => setIsEdit((prev) => !prev)}>
          {isEdit ? (
            <p>완료</p>
          ) : (
            <>
              <PenIcon stroke="#808080" />
              <p>편집</p>
            </>
          )}
        </EditButton>
        <DaySlider
          web
          dayList={testDayList}
          currentDay={currentDay}
          onDayClick={handleDayClick}
        />
        <PlanList>
          <DndContext
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={planItems}>
              {planItems.map((item) => {
                return <PlanItem key={item.id} item={item} isEdit={isEdit} />;
              })}
            </SortableContext>
          </DndContext>
        </PlanList>
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

const EditButton = styled.div<{ $isEdit: boolean }>`
  height: 16px;
  display: flex;
  align-self: flex-end;
  gap: 2px;
  margin-bottom: 12px;
  cursor: pointer;

  & > p {
    color: ${(props) =>
      props.$isEdit ? props.theme.color.secondary : props.theme.color.gray500};
    font-size: 14px;
    font-weight: ${({ $isEdit }) => $isEdit && "700"};
  }
`;

const PlanList = styled.div`
  padding: 40px;
`;
