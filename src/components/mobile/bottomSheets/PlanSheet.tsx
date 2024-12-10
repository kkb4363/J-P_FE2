import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
import { editPlan, getPlan } from "../../../service/axios";
import {
  AddCostDataTypes,
  DayProps,
  PlanDetailsProps,
  ScheduleApiProps,
} from "../../../types/schedule";
import ActionButton from "../../ActionButton";
import AddCostBox from "../../AddCostBox";
import DaySlider from "../../DaySlider";
import TwoButtonsModal from "../../TwoButtonsModal";
import PlanItem from "../schedule/PlanItem";
import PlanMemo from "../schedule/PlanMemo";
import BottomSheet from "./../BottomSheet";

interface Props {
  setIsPlanPlace: React.Dispatch<React.SetStateAction<boolean>>;
  currentDayIdx: number;
  setCurrentDayIdx: React.Dispatch<React.SetStateAction<number>>;
  detail: ScheduleApiProps;
  requestApi: () => void;
}

export default function PlanSheet({
  setIsPlanPlace,
  currentDayIdx,
  setCurrentDayIdx,
  detail,
  requestApi,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [addedPlaces, setAddedPlaces] = useState<DayProps[]>();
  const [planMemoData, setPlanMemoData] = useState<PlanDetailsProps>({
    memo: "",
    expense: [],
    mobility: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [addCostData, setAddCostData] = useState<AddCostDataTypes>({
    type: "Car",
    name: "",
    expense: null,
  });

  const [isOpenMemo, setIsOpenMemo] = useState<{
    itemId: number | undefined;
    memo: boolean;
    cost: boolean;
  }>({
    itemId: undefined,
    memo: false,
    cost: false,
  });

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({
    deleteSchedule: false,
    deleteScheduleSuccess: false,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 3,
      },
    })
  );

  const handleDayClick = (day: number) => {
    setCurrentDayIdx(day);
  };

  const handleDeleteModalClick = () => {
    setOpenModal({
      deleteSchedule: false,
      deleteScheduleSuccess: true,
    });
  };

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
              <D.PlansBox>
                <D.PlansEditButton onClick={() => setIsEdit((prev) => !prev)}>
                  {isEdit ? (
                    <p>완료</p>
                  ) : (
                    <>
                      <PenIcon stroke="#808080" />
                      <span>편집</span>
                    </>
                  )}
                </D.PlansEditButton>
                <DaySlider
                  dayList={detail?.dayResDtos}
                  currentDayId={currentDayIdx}
                  onDayClick={handleDayClick}
                />
                <D.PlanList>
                  {addedPlaces?.find((day) => day.dayIndex === currentDayIdx)
                    ?.dayLocationResDtoList?.length === 0 ? (
                    <div>
                      <div>
                        <p>등록된 장소가 없습니다. 여행 장소를 추가해주세요.</p>
                      </div>
                      <ActionButton add onClick={() => {}}>
                        + 여행지 추가
                      </ActionButton>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToParentElement]}
                    >
                      <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={
                          addedPlaces?.find(
                            (day) => day.dayIndex === currentDayIdx
                          )?.dayLocationResDtoList || []
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
                                reloadSchedule={async () => requestApi()}
                                setIsOpenMemo={setIsOpenMemo}
                                setIsPlanPlace={setIsPlanPlace}
                              />
                            );
                          })}
                      </SortableContext>
                    </DndContext>
                  )}
                </D.PlanList>
              </D.PlansBox>
              <D.AddPlaceButton onClick={() => navigate("/addPlace")}>
                + 장소 추가
              </D.AddPlaceButton>
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
      {openModal.deleteSchedule && (
        <TwoButtonsModal
          isMobile
          text="일정을 삭제할까요?"
          onClick={handleDeleteModalClick}
          onClose={() => setOpenModal((p) => ({ ...p, deleteSchedule: false }))}
        />
      )}
    </>
  );
}
