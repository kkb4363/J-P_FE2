import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";
import {
  deletePlaceFromSchedule,
  editPlan,
  getPlaceDetail,
  getPlan,
  moveScheduleDate,
} from "../../../service/axios";
import { useCurrentDayIdStore } from "../../../store/currentDayId.store";
import { useSelectPlanItemStore } from "../../../store/selectPlanItem.store";
import { useUserStore } from "../../../store/user.store";
import {
  AddCostDataTypes,
  DayLocationProps,
  DayProps,
  PlanDetailsProps,
  ScheduleApiProps,
} from "../../../types/schedule";
import ActionButton from "../../ActionButton";
import AddCostBox from "../../AddCostBox";
import DaySlider from "../../DaySlider";
import LoadingText from "../../LoadingText";
import MoveDaySlider from "../../MoveDaySlider";
import OneButtonModal from "../../OneButtonModal";
import TimeSwiper from "../../TimeSwiper";
import TwoButtonsModal from "../../TwoButtonsModal";
import PlanItem from "../schedule/PlanItem";
import PlanMemo from "../schedule/PlanMemo";
import BottomSheet from "./../BottomSheet";
import useAddPlaceHook from "../../../hooks/useAddPlace";
import { useMapStore } from "../../../store/map.store";

interface Props {
  setIsPlanPlace: React.Dispatch<React.SetStateAction<boolean>>;
  detail: ScheduleApiProps;
  requestApi: () => void;
}

export default function PlanSheet({
  setIsPlanPlace,
  detail,
  requestApi,
}: Props) {
  const navigate = useNavigate();
  const { getUserType } = useUserStore();
  const { getCurrentDayId } = useCurrentDayIdStore();
  const { getPlanItemId } = useSelectPlanItemStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addedPlaces, setAddedPlaces] = useState<DayProps[]>();
  const [planMemoData, setPlanMemoData] = useState<PlanDetailsProps>({
    memo: "",
    expense: [],
    mobility: [],
  });
  const [addCostData, setAddCostData] = useState<AddCostDataTypes>({
    type: "Car",
    name: "",
    expense: null,
  });

  const [isOpenMemo, setIsOpenMemo] = useState({
    memo: false,
    cost: false,
  });

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({
    delete: false,
    deleteSuccess: false,
  });

  const [isMovePlan, setIsMovePlan] = useState(false);

  const {
    selectDay,
    setSelectDay,
    selectTime,
    setSelectTime,
    openModal,
    setOpenModal,
  } = useAddPlaceHook();

  const handleAddCost = () => {
    const updatedPlanMemoData = {
      ...planMemoData,
      expense: [...planMemoData.expense, addCostData],
    };
    if (getPlanItemId()) {
      editPlanApi(getPlanItemId()!, updatedPlanMemoData);
      setIsOpenMemo({ memo: true, cost: false });
    }
  };

  const handleMovePlanClick = async () => {
    setOpenModal((p) => ({ ...p, selectTime: false }));
    if (isMovePlan) {
      setIsMovePlan(false);
      await moveScheduleDate(
        getPlanItemId()!,
        {
          newDayId: selectDay,
          time: selectTime,
        },
        getUserType()
      ).then(() => {
        requestApi();
      });
    } else {
      await moveScheduleDate(
        getPlanItemId()!,
        {
          newDayId: getCurrentDayId()!,
          time: selectTime,
        },
        getUserType()
      ).then(() => {
        requestApi();
      });
    }
  };

  const handleSelectDay = async () => {
    if (getUserType() === "P") {
      await moveScheduleDate(
        getPlanItemId()!,
        {
          newDayId: selectDay,
        },
        getUserType()
      ).then(() => {
        requestApi();
        setOpenModal((p) => ({ ...p, selectDay: false }));
      });
    } else {
      setOpenModal(() => ({ selectDay: false, selectTime: true }));
    }
  };

  const handleDeleteItemClick = async () => {
    if (getPlanItemId()!) {
      await deletePlaceFromSchedule(getPlanItemId()!).then(() => {
        setIsOpenDeleteModal({
          delete: false,
          deleteSuccess: true,
        });
        requestApi();
      });
    }
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setAddedPlaces((prevDayListData) => {
      if (!prevDayListData) return;

      const currentDay = prevDayListData.find(
        (day) => day.id === getCurrentDayId()
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
        day.id === getCurrentDayId()
          ? { ...day, dayLocationResDtoList: reorderedLocations }
          : day
      );
      return updatedDayListData;
    });
  };

  const editPlanApi = async (
    planItemId: number,
    planMemoData: PlanDetailsProps
  ) => {
    await editPlan(planItemId, planMemoData);
    await getPlanApi();
  };

  const getPlanApi = async () => {
    if (getPlanItemId()) {
      setIsLoading(true);
      getPlan(getPlanItemId()!).then((res) =>
        setPlanMemoData({
          memo: res?.data.memo ?? "",
          expense: res?.data.expense,
          mobility: res?.data.mobility,
        })
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlanApi();
  }, [getPlanItemId()]);

  useEffect(() => {
    setAddedPlaces(detail.dayResDtos);
  }, [detail]);

  const handleAddPlaceClick = () => {
    if (detail) {
      navigate(`/addPlace`, {
        state: {
          scheduleId: detail.id,
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

  const getPlaceLocation = () => {
    getPlaceDetail({ placeId: detail?.place?.placeId + "" }).then((res) => {
      const location = res?.data.location;
      setLoc({
        lat: Number(location.lat),
        lng: Number(location.lng),
      });
    });
  };

  const [loc, setLoc] = useState({
    lat: 0,
    lng: 0,
  });
  const mapStore = useMapStore();

  useEffect(() => {
    if (detail?.id) {
      getPlaceLocation();
    }
  }, [detail?.id]);

  const currentDayPlaces = addedPlaces?.find(
    (d) => d.id === getCurrentDayId()
  )?.dayLocationResDtoList;

  useEffect(() => {
    if (loc?.lat) {
      mapStore.setAddedPlace(currentDayPlaces as any[]);
    }
  }, [getCurrentDayId(), loc?.lat]);

  return (
    <>
      {!isOpenMemo.cost && (
        <BottomSheet maxH={0.75} minH={3.5}>
          {/* 일정 목록 */}
          {!isOpenMemo.memo && (
            <D.PlanContainer>
              {isLoading ? (
                <LoadingText text="로딩 중..." />
              ) : (
                <>
                  <D.PlansBox>
                    <D.PlansEditButton
                      onClick={() => setIsEdit((prev) => !prev)}
                    >
                      {isEdit ? (
                        <p>완료</p>
                      ) : (
                        <>
                          <PenIcon stroke="#808080" />
                          <span>편집</span>
                        </>
                      )}
                    </D.PlansEditButton>
                    <DaySlider dayList={detail?.dayResDtos} />
                    <D.PlanList>
                      {addedPlaces?.find((day) => day.id === getCurrentDayId())
                        ?.dayLocationResDtoList?.length === 0 ? (
                        <D.NoPlaceBox>
                          <D.NoPlaceTextBox>
                            <p>
                              등록된 장소가 없습니다. 여행 장소를 추가해주세요.
                            </p>
                          </D.NoPlaceTextBox>
                          <ActionButton add onClick={handleAddPlaceClick}>
                            + 여행지 추가
                          </ActionButton>
                        </D.NoPlaceBox>
                      ) : (
                        <DndContext
                          onDragEnd={handleDragEnd}
                          modifiers={[restrictToParentElement]}
                        >
                          <SortableContext
                            strategy={verticalListSortingStrategy}
                            items={
                              addedPlaces?.find(
                                (day) => day.id === getCurrentDayId()
                              )?.dayLocationResDtoList || []
                            }
                          >
                            {addedPlaces
                              ?.find((day) => day.id === getCurrentDayId())
                              ?.dayLocationResDtoList.map(
                                (item: DayLocationProps) => {
                                  return (
                                    <PlanItem
                                      key={item.id}
                                      item={item}
                                      isEdit={isEdit}
                                      reloadSchedule={async () => requestApi()}
                                      setIsOpenMemo={setIsOpenMemo}
                                      setIsPlanPlace={setIsPlanPlace}
                                      setIsOpenDeleteModal={
                                        setIsOpenDeleteModal
                                      }
                                      setIsMovePlan={setIsMovePlan}
                                      setOpenModal={setOpenModal}
                                    />
                                  );
                                }
                              )}
                          </SortableContext>
                        </DndContext>
                      )}
                    </D.PlanList>
                  </D.PlansBox>
                  <D.AddPlaceButton onClick={handleAddPlaceClick}>
                    + 여행지 추가
                  </D.AddPlaceButton>
                </>
              )}
            </D.PlanContainer>
          )}

          {/* 일정 상세 */}
          {isOpenMemo.memo && (
            <PlanMemo
              planMemoData={planMemoData}
              setPlanMemoData={setPlanMemoData}
              editPlanApi={editPlanApi}
              setIsOpenMemo={setIsOpenMemo}
            />
          )}
        </BottomSheet>
      )}

      {/* 비용 추가 */}
      {isOpenMemo.cost && (
        <BottomSheet maxH={0.65}>
          <div>
            <D.PlanMemoHeader $editMode={true}>
              <div
                onClick={() =>
                  setIsOpenMemo({
                    memo: true,
                    cost: false,
                  })
                }
              >
                <ArrowLeftIcon />
              </div>
              <D.Title>
                <CardIcon />
                비용
              </D.Title>
              <p onClick={handleAddCost}>저장</p>
            </D.PlanMemoHeader>

            <D.AddCostBox>
              <AddCostBox
                selectedType={addCostData.type}
                setAddCostData={setAddCostData}
              />
            </D.AddCostBox>
          </div>
        </BottomSheet>
      )}

      {isOpenDeleteModal.delete && (
        <TwoButtonsModal
          isMobile={true}
          width="320px"
          height="230px"
          text="일정을 삭제할까요?"
          onClick={handleDeleteItemClick}
          onClose={() => setIsOpenDeleteModal((p) => ({ ...p, delete: false }))}
        />
      )}
      {isOpenDeleteModal.deleteSuccess && (
        <OneButtonModal
          isMobile={true}
          width="320px"
          height="230px"
          noCloseBtn
          buttonText="확인"
          onClick={() =>
            setIsOpenDeleteModal((p) => ({
              ...p,
              deleteSuccess: false,
            }))
          }
        >
          <D.ModalText>일정이 삭제되었습니다.</D.ModalText>
        </OneButtonModal>
      )}

      {/* 일정 이동 Modal */}
      {openModal.selectDay && (
        <OneButtonModal
          isMobile={true}
          width="320px"
          height="240px"
          title="다른 날로 이동"
          buttonText="다음"
          onClick={handleSelectDay}
          onClose={() => setOpenModal((p) => ({ ...p, selectDay: false }))}
        >
          <MoveDaySlider
            isMobile={true}
            dayResDtos={detail?.dayResDtos}
            selectDay={selectDay}
            setSelectDay={setSelectDay}
          />
        </OneButtonModal>
      )}

      {openModal.selectTime && (
        <OneButtonModal
          isMobile={true}
          width="320px"
          height="230px"
          title="시간 설정"
          buttonText="완료"
          onClick={handleMovePlanClick}
          onClose={() => setOpenModal((p) => ({ ...p, selectTime: false }))}
        >
          <TimeSwiper isMobile={true} setSelectTime={setSelectTime} />
        </OneButtonModal>
      )}
    </>
  );
}
function getPlaceLocation() {
  throw new Error("Function not implemented.");
}
