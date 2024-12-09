import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import PlanCalendarIcon from "../../../assets/icons/PlanCalendarIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";
import {
  AddCostDataTypes,
  DayLocationProps,
  DayProps,
  ScheduleApiProps,
} from "../../../types/schedule";
import { testCostList } from "../../../utils/staticDatas";
import ActionButton from "../../ActionButton";
import AddCostBox from "../../AddCostBox";
import CostList from "../../CostList";
import DaySlider from "../../DaySlider";
import TransportBox from "../../TransportBox";
import TwoButtonsModal from "../../TwoButtonsModal";
import PlanItem from "../schedule/PlanItem";
import BottomSheet from "./../BottomSheet";
import PlanMemo from "../schedule/PlanMemo";

interface Props {
  setIsPlanPlace: React.Dispatch<React.SetStateAction<boolean>>;
  currentDayIdx: number;
  setCurrentDayIdx: React.Dispatch<React.SetStateAction<number>>;
  detail: ScheduleApiProps;
  scheduleId: string | undefined;
  requestApi: () => void;
}

export default function PlanSheet({
  setIsPlanPlace,
  currentDayIdx,
  setCurrentDayIdx,
  detail,
  scheduleId,
  requestApi,
}: Props) {
  const [addedPlaces, setAddedPlaces] = useState<DayProps[]>();
  const [isPlanMemo, setIsPlanMemo] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isPlanMemoEdit, setIsPlanMemoEdit] = useState(false);
  const [isAddCostMode, setIsAddCostMode] = useState(false);
  const [planDetails, setPlanDetails] = useState({
    content: "",
    cost: testCostList,
    transport: [] as string[],
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

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({
    deleteSchedule: false,
    deleteScheduleSuccess: false,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 0, // 250ms 터치 후 활성화
        tolerance: 3, // 5px 이동해야 활성화
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

  useEffect(() => {
    setAddedPlaces(detail.dayResDtos);
  }, [detail]);

  console.log(detail);
  console.log(currentDayIdx);
  console.log(addedPlaces);

  return (
    <>
      {!isAddCostMode && (
        <BottomSheet maxH={0.75} minH={3.5}>
          {/* 일정 목록 */}
          {!isOpenMemo.memo && !isOpenMemo.cost && (
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
              <div onClick={() => setIsAddCostMode(false)}>
                <ArrowLeftIcon />
              </div>
              <D.Title>
                <CardIcon />
                비용
              </D.Title>
              <p>저장</p>
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
