import { useEffect, useState } from "react";
import styled from "styled-components";
import PencilIcon from "../../../assets/icons/PencilIcon";
import { planItemProps, ScheduleApiProps } from "../../../types/schedule";
import { testPlanItems } from "../../../utils/staticDatas";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "react-sortable-hoc";
import DaySlider from "../../DaySlider";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import PlanItem from "./PlanItem";
import CustomGoogleMap from "../../mobile/googleMap/CustomGoogleMap";
import { getDaylistFromSchedule } from "../../../service/axios";
import { dayResDto } from "../../../types/res.dto";

interface Props {
  schedules: ScheduleApiProps;
}

export default function OngoingSchedule({ schedules }: Props) {
  const [currentDay, setCurrentDay] = useState(0);
  const [planItems, setPlanItems] = useState<planItemProps[]>(testPlanItems);
  const [isEdit, setIsEdit] = useState(false);
  const [days, setDays] = useState<dayResDto[]>([]);

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

  useEffect(() => {
    getDaylistFromSchedule(schedules.id + "").then((res) => {
      if (res) {
        setDays(res?.data);
      }
    });
  }, [schedules?.id]);

  return (
    <OngoingScheduleContainer>
      <OngoingLeftBox>
        <OngoingTitle>
          <div>
            <p>{schedules?.title}</p>
            <div>
              <span>여행중</span>
            </div>
          </div>

          <span onClick={() => setIsEdit((p) => !p)}>
            {!isEdit && <PencilIcon />}
            {isEdit ? "완료" : "편집"}
          </span>
        </OngoingTitle>

        <DaySlider
          web={false}
          dayList={days}
          currentDayIndex={currentDay}
          onDayClick={handleDayClick}
        />

        <OngoingPlanList>
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
        </OngoingPlanList>
      </OngoingLeftBox>

      <OngoingRightBox>
        <CustomGoogleMap width="100%" height="400px" lat={12.3} lng={123.2} />
      </OngoingRightBox>
    </OngoingScheduleContainer>
  );
}

const OngoingScheduleContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  min-height: calc(420px + 55px);
  display: flex;
  gap: 40px;
`;

const OngoingLeftBox = styled.div`
  width: calc(50% - 20px);
`;

const OngoingTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 10px;
    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 20px;
      font-weight: 700;
    }

    & > div {
      border: 1px solid ${(props) => props.theme.color.secondary};
      background-color: ${(props) => props.theme.color.white};
      border-radius: 16px;
      padding: 4px 12px;
      & > span {
        color: ${(props) => props.theme.color.secondary};
        font-size: 12px;
      }
    }
  }

  & > span {
    display: flex;
    align-items: center;
    gap: 3px;
    cursor: pointer;

    color: ${(props) => props.theme.color.gray400};
    font-size: 14px;
  }
`;

const OngoingPlanList = styled.div`
  margin-top: 56px;
`;

const OngoingRightBox = styled.div`
  width: calc(50% - 20px);
  height: 100%;
  padding-top: 50px;
`;
