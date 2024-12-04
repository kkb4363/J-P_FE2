import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import InviteIcon from "../../../assets/icons/InviteIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import { ParticipantsRow } from "../../../assets/styles/scheduleDetail.style";
import ActionButton from "../../../components/ActionButton";
import DatesBox from "../../../components/DatesBox";
import DaySlider from "../../../components/DaySlider";
import JPToggle from "../../../components/JPToggle";
import LoadingText from "../../../components/LoadingText";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import Container from "../../../components/web/Container";
import PlanItem from "../../../components/web/schedule/PlanItem";
import { editSchedule, getSchedule } from "../../../service/axios";
import { DayProps } from "../../../types/res.dto";
import { ScheduleApiProps } from "../../../types/schedule";
import { testImg1 } from "../../../utils/staticDatas";

export default function ScheduleDetails() {
  const { scheduleId } = useParams();
  const [scheduleData, setScheduleData] = useState<ScheduleApiProps>();
  const [dayListData, setDayListData] = useState<DayProps[]>();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [currentDayId, setCurrentDayId] = useState<number>(-1);

  const handleDayClick = (day: number) => {
    setCurrentDayId(day);
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setDayListData((prevDayListData) => {
      console.log(prevDayListData);
      if (!prevDayListData) return;

      const currentDay = prevDayListData.find((day) => day.id === currentDayId);

      if (!currentDay) return prevDayListData;

      const updatedLocations = [...currentDay.dayLocationResDtoList];
      const originalTimes = updatedLocations.map((item) => item.time);
      const activeIndex = updatedLocations.findIndex(
        (item) => item.id.toString() === active.id.toString()
      );
      const overIndex = updatedLocations.findIndex(
        (item) => item.id.toString() === over.id.toString()
      );
      console.log(activeIndex, overIndex);

      const [movedItem] = updatedLocations.splice(activeIndex, 1);
      updatedLocations.splice(overIndex, 0, movedItem);

      console.log(originalTimes);
      const reorderedLocations = updatedLocations.map((item, index) => ({
        ...item,
        index: index + 1,
        time: originalTimes[index],
      }));

      const updatedDayListData = prevDayListData.map((day) =>
        day.id === currentDayId
          ? { ...day, dayLocationResDtoList: reorderedLocations }
          : day
      );

      return updatedDayListData;
    });
  };

  const handleAddPlaceClick = () => {
    if (scheduleData) {
      navigate(`/home/createPlace`, {
        state: {
          scheduleId: scheduleId,
          city: scheduleData.place.name,
          dates: {
            startDate: scheduleData.startDate,
            endDate: scheduleData.endDate,
          },
          dayResDtos: scheduleData.dayResDtos,
        },
      });
    }
  };

  const handleEditClick = async () => {
    if (isEdit) {
      editRequestApi();
    }
    setIsEdit((prev) => !prev);
  };

  const requestApi = async () => {
    if (scheduleId) {
      setIsLoading(true);
      getSchedule(scheduleId).then((res) => {
        if (res) {
          setScheduleData(res.data);
          setDayListData(res.data.dayResDtos);
          setCurrentDayId(res.data.dayResDtos[0].id);
        }
        setIsLoading(false);
      });
    }
  };

  const editRequestApi = async () => {
    if (!dayListData) return;

    Promise.all(
      dayListData.map((day) => editSchedule(day.id, day.dayLocationResDtoList))
    ).then(() => {
      toast(<span>일정 편집 완료!</span>);
    });
  };

  useEffect(() => {
    requestApi();
  }, []);

  if (isLoading) return <LoadingText text="로딩 중...." />;
  return (
    <Container>
      {scheduleData && dayListData && (
        <>
          <DetailsTitleBox>
            <h1>일정</h1>
            <JPToggle />
          </DetailsTitleBox>
          <DetailsInfoBox>
            <InfoBox>
              <TitleBox>
                <p>{scheduleData.title}</p>
                <PenIcon stroke="#4D4D4D" />
              </TitleBox>
              <DatesBox
                dates={{
                  startDate: scheduleData.startDate,
                  endDate: scheduleData.endDate,
                }}
              />
              <MemberBox>
                <InviteIcon />
                <ParticipantsRow>
                  {scheduleData.member.map((user, index) => (
                    <img
                      key={index}
                      src={user.profile ? user.profile : testImg1}
                      alt={user.nickname}
                    />
                  ))}
                </ParticipantsRow>
              </MemberBox>
            </InfoBox>
            <AddPlaceButton onClick={handleAddPlaceClick}>
              <span>+</span>
              <span>여행지 추가</span>
            </AddPlaceButton>
          </DetailsInfoBox>

          <CustomGoogleMap
            width="100%"
            height="342px"
            lat={37.579617}
            lng={126.977041}
          />

          <PlansBox>
            <EditButton $isEdit={isEdit} onClick={handleEditClick}>
              {isEdit ? (
                <p>완료</p>
              ) : (
                <>
                  <PenIcon stroke="#808080" />
                  <p>편집</p>
                </>
              )}
            </EditButton>
            <DaySliderBox>
              <DaySlider
                web
                dayList={scheduleData.dayResDtos}
                currentDayId={currentDayId}
                onDayClick={handleDayClick}
              />
            </DaySliderBox>
            <PlanList>
              {dayListData.find((day) => day.id === currentDayId)
                ?.dayLocationResDtoList.length === 0 ? (
                <NoPlaceBox>
                  <NoPlaceTextBox>
                    <p>등록된 장소가 없습니다. 여행 장소를 추가해주세요.</p>
                  </NoPlaceTextBox>
                  <ActionButton add onClick={handleAddPlaceClick}>
                    + 여행지 추가
                  </ActionButton>
                </NoPlaceBox>
              ) : (
                <DndContext
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={
                      dayListData.find(
                        (day) => day.id === currentDayId
                      )?.dayLocationResDtoList || []
                    }
                  >
                    {dayListData
                      .find((day) => day.id === currentDayId)
                        ?.dayLocationResDtoList.map((item) => {
                          console.log(item);
                          return (
                            <PlanItem
                              key={item.id}
                              item={item}
                              isEdit={isEdit}
                              currentDayId={currentDayId}
                              dayList={dayListData}
                              reloadSchedule={() => requestApi()}
                            />
                          )
                        })}
                  </SortableContext>
                </DndContext>
              )}
            </PlanList>
          </PlansBox>
        </>
      )}
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

const NoPlaceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const NoPlaceTextBox = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  padding: 31px 0;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.gray100};

  & > p {
    color: ${(props) => props.theme.color.gray300};
  }
`;

const DaySliderBox = styled.section`
  width: 100%;
`;
