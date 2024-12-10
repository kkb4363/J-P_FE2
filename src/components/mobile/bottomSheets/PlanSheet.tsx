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
} from "../../../service/axios";
import {
  AddCostDataTypes,
  DayProps,
  PlanDetailsProps,
  ScheduleApiProps,
} from "../../../types/schedule";
import ActionButton from "../../ActionButton";
import AddCostBox from "../../AddCostBox";
import DaySlider from "../../DaySlider";
import OneButtonModal from "../../OneButtonModal";
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
  const navigate = useNavigate();
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

  const [isOpenMemo, setIsOpenMemo] = useState<{
    itemId: number | undefined;
    memo: boolean;
    cost: boolean;
  }>({
    itemId: undefined,
    memo: false,
    cost: false,
  });

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<{
    itemId: number | undefined;
    delete: boolean;
    deleteSuccess: boolean;
  }>({
    itemId: undefined,
    delete: false,
    deleteSuccess: false,
  });

  const handleDayClick = (day: number) => {
    setCurrentDayIdx(day);
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
                    <D.NoPlaceBox>
                      <D.NoPlaceTextBox>
                        <p>등록된 장소가 없습니다. 여행 장소를 추가해주세요.</p>
                      </D.NoPlaceTextBox>
                      <ActionButton add onClick={() => navigate("/addPlace")}>
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
                                setIsOpenDeleteModal={setIsOpenDeleteModal}
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
    </>
  );
}
