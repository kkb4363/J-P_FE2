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
  getPlan,
  moveScheduleDate,
} from "../../../service/axios";
import { useCurrentDayIdStore } from "../../../store/currentDayId.store";
import { useAddPlaceStore } from "../../../store/useAddPlace.store";
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
import OneButtonModal from "../../OneButtonModal";
import TimeSwiper from "../../TimeSwiper";
import TwoButtonsModal from "../../TwoButtonsModal";
import PlanItem from "../schedule/PlanItem";
import PlanMemo from "../schedule/PlanMemo";
import BottomSheet from "./../BottomSheet";
import MoveDaySlider from "../../MoveDaySlider";

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
  const { currentDayId } = useCurrentDayIdStore();
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

  console.log(detail);

  const [isOpenMemo, setIsOpenMemo] = useState({
    itemId: undefined as number | undefined,
    memo: false,
    cost: false,
  });

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({
    itemId: undefined as number | undefined,
    delete: false,
    deleteSuccess: false,
  });

  const [isMovePlan, setIsMovePlan] = useState({
    itemId: undefined as number | undefined,
    isMove: false,
  });

  const {
    selectDay,
    setSelectDay,
    selectTime,
    setSelectTime,
    openModal,
    setOpenModal,
  } = useAddPlaceStore();

  const handleAddCost = () => {
    const updatedPlanMemoData = {
      ...planMemoData,
      expense: [...planMemoData.expense, addCostData],
    };
    if (isOpenMemo.itemId) {
      editPlanApi(isOpenMemo.itemId, updatedPlanMemoData);
      setIsOpenMemo((prev) => ({ ...prev, memo: true, cost: false }));
    }
  };

  const handleMovePlanClick = async () => {
    setOpenModal({ selectTime: false });
    if (isMovePlan.isMove) {
      setIsMovePlan((p) => ({ ...p, isMove: false }));
      await moveScheduleDate(
        isMovePlan.itemId!,
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
        isMovePlan.itemId!,
        {
          newDayId: currentDayId!,
          time: selectTime,
        },
        getUserType()
      ).then(() => {
        requestApi();
      });
    }
  };

  const handleDeleteItemClick = async () => {
    if (isOpenDeleteModal.itemId) {
      await deletePlaceFromSchedule(isOpenDeleteModal.itemId).then(() => {
        setIsOpenDeleteModal((prev) => ({
          ...prev,
          delete: false,
          deleteSuccess: true,
        }));
        requestApi();
      });
    }
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setAddedPlaces((prevDayListData) => {
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

      const [movedItem] = updatedLocations.splice(activeIndex, 1);
      updatedLocations.splice(overIndex, 0, movedItem);

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

  const editPlanApi = async (
    planItemId: number,
    planMemoData: PlanDetailsProps
  ) => {
    await editPlan(planItemId, planMemoData);
    await getPlanApi();
  };

  const getPlanApi = async () => {
    if (isOpenMemo.itemId) {
      setIsLoading(true);
      getPlan(isOpenMemo.itemId).then((res) =>
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
  }, [isOpenMemo.itemId]);

  useEffect(() => {
    setAddedPlaces(detail.dayResDtos);
  }, [detail]);

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
                      {addedPlaces?.find((day) => day.id === currentDayId)
                        ?.dayLocationResDtoList?.length === 0 ? (
                        <D.NoPlaceBox>
                          <D.NoPlaceTextBox>
                            <p>
                              등록된 장소가 없습니다. 여행 장소를 추가해주세요.
                            </p>
                          </D.NoPlaceTextBox>
                          <ActionButton
                            add
                            onClick={() => navigate("/addPlace")}
                          >
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
                                (day) => day.id === currentDayId
                              )?.dayLocationResDtoList || []
                            }
                          >
                            {addedPlaces
                              ?.find((day) => day.id === currentDayId)
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
                                    />
                                  );
                                }
                              )}
                          </SortableContext>
                        </DndContext>
                      )}
                    </D.PlanList>
                  </D.PlansBox>
                  <D.AddPlaceButton onClick={() => navigate("/addPlace")}>
                    + 장소 추가
                  </D.AddPlaceButton>
                </>
              )}
            </D.PlanContainer>
          )}

          {/* 일정 상세 */}
          {isOpenMemo.memo && (
            <PlanMemo
              itemId={isOpenMemo.itemId}
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
                  setIsOpenMemo((prev) => ({
                    ...prev,
                    memo: true,
                    cost: false,
                  }))
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
              itemId: undefined,
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
          onClick={() => setOpenModal({ selectDay: false, selectTime: true })}
          onClose={() => setOpenModal({ selectDay: false })}
        >
          <MoveDaySlider isMobile={true} dayResDtos={detail?.dayResDtos} />
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
          onClose={() => setOpenModal({ selectTime: false })}
        >
          <TimeSwiper isMobile={true} />
        </OneButtonModal>
      )}
    </>
  );
}
