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
import {
  editSchedule,
  getSchedule,
  getPlaceDetail,
} from "../../../service/axios";
import { DayProps, ScheduleApiProps } from "../../../types/schedule";
import { testImg1 } from "../../../utils/staticDatas";
import CustomSkeleton from "../../../components/CustomSkeleton";
import { useMapStore } from "../../../store/map.store";

export default function ScheduleDetails() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<ScheduleApiProps>(
    {} as ScheduleApiProps
  );
  const [addedPlaces, setAddedPlaces] = useState<DayProps[]>();
  const [currentDayIdx, setCurrentDayIdx] = useState<number>(1);
  const [hashtag, setHashtag] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loc, setLoc] = useState({
    lat: 0,
    lng: 0,
  });
  const mapStore = useMapStore();

  const requestApi = async () => {
    if (scheduleId) {
      setIsLoading(true);
      getSchedule(scheduleId).then((res) => {
        if (res) {
          setAddedPlaces(res.data.dayResDtos);
          setDetail(res?.data);
        }
        setIsLoading(false);
      });
    }
  };

  const editRequestApi = async () => {
    if (
      detail?.dayResDtos?.find((d) => d.dayIndex === currentDayIdx)
        ?.dayLocationResDtoList.length === 0
    ) {
      return;
    }

    Promise.all(
      detail?.dayResDtos.map((day) =>
        editSchedule(day.id, day.dayLocationResDtoList)
      )
    ).then(() => {
      toast(<span>일정 편집 완료!</span>);
    });
  };

  const currentDayPlaces = addedPlaces?.find(
    (d) => d.dayIndex === currentDayIdx
  )?.dayLocationResDtoList;

  const getPlaceLocation = () => {
    getPlaceDetail({ placeId: detail?.place?.placeId + "" }).then((res) => {
      const location = res?.data.location;
      setLoc({
        lat: Number(location.lat),
        lng: Number(location.lng),
      });
    });
  };

  const handleEditClick = async () => {
    if (isEdit) {
      editRequestApi();
    }
    setIsEdit((prev) => !prev);
  };

  const handleDayClick = (day: number) => {
    setCurrentDayIdx(day);
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setAddedPlaces((prevDayListData) => {
      if (!prevDayListData) return;

      const currentDay = prevDayListData.find(
        (day) => day.dayIndex === currentDayIdx
      );

      if (!currentDay) return prevDayListData;

      const updatedLocations = [...currentDay.dayLocationResDtoList];
      const originalTimes = updatedLocations.map((item) => item.time);
      const activeIndex = updatedLocations.findIndex(
        (item) => item.id.toString() === active.id.toString()
      );
      const overIndex = updatedLocations.findIndex(
        (item) => item.id.toString() === over.id.toString()
      );

      const [movedItem] = updatedLocations.splice(activeIndex, 1);
      updatedLocations.splice(overIndex, 0, movedItem);

      const reorderedLocations = updatedLocations.map((item, index) => ({
        ...item,
        index: index + 1,
        time: originalTimes[index],
      }));

      const updatedDayListData = prevDayListData.map((day) =>
        day.dayIndex === currentDayIdx
          ? { ...day, dayLocationResDtoList: reorderedLocations }
          : day
      );
      return updatedDayListData;
    });
  };

  const handleAddPlaceClick = () => {
    if (detail) {
      navigate(`/home/createPlace`, {
        state: {
          scheduleId: scheduleId,
          city: detail.place.name,
          dates: {
            startDate: detail.startDate,
            endDate: detail.endDate,
          },
          location: {
            lat: loc?.lat,
            lng: loc?.lng,
          },
          dayResDtos: detail.dayResDtos,
        },
      });
    }
  };

  useEffect(() => {
    requestApi();
  }, [scheduleId]);

  useEffect(() => {
    if (detail?.id) {
      getPlaceLocation();
    }
  }, [detail?.id]);

  useEffect(() => {
    if (loc?.lat) {
      mapStore.setAddedPlace(currentDayPlaces as any[]);
    }
  }, [currentDayIdx, loc?.lat]);

  if (isLoading) return <LoadingText text="로딩 중...." />;
  return (
    <Container>
      {detail && addedPlaces && (
        <>
          <DetailsTitleBox>
            <h1>일정</h1>
            <JPToggle />
          </DetailsTitleBox>
          <DetailsInfoBox>
            <InfoBox>
              <TitleBox>
                <p>{detail.title}</p>
                <PenIcon stroke="#4D4D4D" />
              </TitleBox>
              <DatesBox
                dates={{
                  startDate: detail.startDate,
                  endDate: detail.endDate,
                }}
              />
              <MemberBox>
                <InviteIcon />
                <ParticipantsRow>
                  {detail.member.map((user, index) => (
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

          {!loc?.lat ? (
            <CustomSkeleton width="100%" height="340px" />
          ) : (
            <CustomGoogleMap
              width="100%"
              height="342px"
              lat={currentDayPlaces?.length === 0 ? loc?.lat : undefined}
              lng={currentDayPlaces?.length === 0 ? loc?.lng : undefined}
            />
          )}

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
                dayList={detail?.dayResDtos}
                currentDayId={currentDayIdx}
                onDayClick={handleDayClick}
              />
            </DaySliderBox>
            <PlanList>
              {addedPlaces?.find((day) => day.dayIndex === currentDayIdx)
                ?.dayLocationResDtoList?.length === 0 ? (
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
                      addedPlaces?.find((day) => day.dayIndex === currentDayIdx)
                        ?.dayLocationResDtoList || []
                    }
                  >
                    {addedPlaces
                      ?.find((day) => day.dayIndex === currentDayIdx)
                      ?.dayLocationResDtoList.map((item: any) => {
                        return (
                          <PlanItem
                            key={item.id}
                            item={item}
                            isEdit={isEdit}
                            currentDayId={currentDayIdx}
                            dayList={addedPlaces}
                            reloadSchedule={() => requestApi()}
                          />
                        );
                      })}
                  </SortableContext>
                </DndContext>
              )}
            </PlanList>
          </PlansBox>

          <HashtagBox>
            <HashtagInputBox>
              <input
                type="text"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="태그를 작성해주세요. (최대 5개/10자 이내)"
              />
            </HashtagInputBox>
            <HashtagList>
              <span># 산책코스</span>
              <span># 태그입력</span>
            </HashtagList>
          </HashtagBox>
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

const HashtagBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HashtagInputBox = styled.div`
  width: 100%;

  & > input {
    width: 100%;
    outline: none;
    font-size: 14px;
  }
`;

const HashtagList = styled.div`
  display: flex;
  gap: 11px;

  & > span {
    color: ${(props) => props.theme.color.gray700};
  }
`;
