import { arrayMoveImmutable } from "array-move";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import PlanCalendarIcon from "../../../assets/icons/PlanCalendarIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";
import { useJPStore } from "../../../store/JPType.store";
import { AddCostDataTypes, PlanItemProps } from "../../../types/schedule";
import {
  testCostList,
  testDayList,
  testPlanItems,
} from "../../../utils/staticDatas";
import AddCostBox from "../../AddCostBox";
import CostList from "../../CostList";
import DaySlider from "../../DaySlider";
import TransportBox from "../../TransportBox";
import TwoButtonsModal from "../../TwoButtonsModal";
import { PlanList } from "../schedule/PlanList";
import BottomSheet from "./../BottomSheet";

interface Props {
  setIsPlanPlace: (value: React.SetStateAction<boolean>) => void;
}

export default function PlanSheet({ setIsPlanPlace }: Props) {
  const [isPlanEdit, setIsPlanEdit] = useState(false);
  const [isPlanDetail, setIsPlanDetail] = useState(false);
  const [isPlanDetailEdit, setIsPlanDetailEdit] = useState(false);
  const [isAddCostMode, setIsAddCostMode] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [planItems, setPlanItems] = useState<PlanItemProps[]>(testPlanItems);
  const [planDetails, setPlanDetails] = useState({
    content: "",
    cost: testCostList,
    transport: [] as string[],
  });
  const [addCostData, setAddCostData] = useState<AddCostDataTypes>({
    category: "Car",
    name: "",
    cost: null,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({
    deleteSchedule: false,
    deleteScheduleSuccess: false,
  });

  const handleDayClick = (day: number) => {
    setCurrentDay(day);
  };

  // 드래그 이벤트
  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setPlanItems(arrayMoveImmutable(planItems, oldIndex, newIndex));
  };

  const handleDetailsClose = () => {
    setIsPlanDetail(false);
    setIsPlanDetailEdit(false);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 맞게 조절
    }
  };

  const handleDeleteModalClick = () => {
    setOpenModal({
      deleteSchedule: false,
      deleteScheduleSuccess: true,
    });
  };

  const handleDetailEditDone = () => {
    setIsPlanDetailEdit(false);
    // [세연 TODO] : 수정사항 DB 반영해야함
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [planDetails]);

  return (
    <>
      {!isAddCostMode && (
        <BottomSheet maxH={0.75} minH={3.5}>
          {/* 일정 목록 */}
          {!isPlanDetail && (
            <D.PlanContainer>
              <D.PlansBox>
                <D.PlansEditButton
                  onClick={() => setIsPlanEdit((prev) => !prev)}
                >
                  {isPlanEdit ? (
                    <p>완료</p>
                  ) : (
                    <>
                      <PenIcon stroke="#808080" />
                      <span>편집</span>
                    </>
                  )}
                </D.PlansEditButton>
                <DaySlider
                  dayList={testDayList}
                  currentDay={currentDay}
                  onDayClick={handleDayClick}
                />
                <PlanList
                  planItems={planItems}
                  onSortEnd={handleSortEnd}
                  helperClass="dragging-helper-class"
                  isEdit={isPlanEdit}
                  setIsPlanDetail={() => setIsPlanDetail((prev) => !prev)}
                  setIsPlanPlace={() => setIsPlanPlace((prev) => !prev)}
                  handleDeleteOpen={() =>
                    setOpenModal((p) => ({ ...p, deleteSchedule: true }))
                  }
                  useWindowAsScrollContainer
                  useDragHandle
                />
              </D.PlansBox>
              <D.AddPlaceButton onClick={() => navigate("/addPlace")}>
                + 장소 추가
              </D.AddPlaceButton>
            </D.PlanContainer>
          )}

          {/* 일정 상세 */}
          {isPlanDetail && !isAddCostMode && (
            <div>
              <D.PlanDetailsHeader $editMode={isPlanDetailEdit}>
                <div onClick={handleDetailsClose}>
                  <ArrowLeftIcon />
                </div>
                <D.Title>플랜 추가</D.Title>
                <p onClick={handleDetailEditDone}>완료</p>
              </D.PlanDetailsHeader>
              <D.PlanDetailsBody>
                <div>
                  <D.SubTitleBox>
                    <PlanCalendarIcon />
                    <p>일정</p>
                  </D.SubTitleBox>
                  <D.DetailsInput
                    isDetailsEdit={isPlanDetailEdit}
                    onClick={() => setIsPlanDetailEdit(true)}
                  >
                    <textarea
                      ref={textareaRef}
                      placeholder="여행 상세 일정"
                      readOnly={!isPlanDetailEdit}
                      value={planDetails.content}
                      onChange={(e) =>
                        setPlanDetails((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      onInput={adjustTextareaHeight}
                    />
                  </D.DetailsInput>
                </div>
                <div>
                  <D.TitlePlusBox>
                    <D.SubTitleBox>
                      <CardIcon />
                      <p>비용</p>
                    </D.SubTitleBox>
                    <div onClick={() => setIsAddCostMode(true)}>
                      <AddSquareIcon />
                    </div>
                  </D.TitlePlusBox>
                  <CostList costList={testCostList} />
                </div>
                <div>
                  <D.TitlePlusBox>
                    <D.SubTitleBox>
                      <TrainIcon />
                      <p>이동 수단</p>
                    </D.SubTitleBox>
                    <div onClick={() => setIsPlanDetailEdit(true)}>
                      <AddSquareIcon />
                    </div>
                  </D.TitlePlusBox>
                  <TransportBox
                    transport={planDetails.transport}
                    isPlanMemoEdit={isPlanDetailEdit}
                    setData={setPlanDetails}
                  />
                </div>
              </D.PlanDetailsBody>
            </div>
          )}
        </BottomSheet>
      )}

      {/* 비용 추가 */}
      {isAddCostMode && (
        <BottomSheet maxH={0.65}>
          <div>
            <D.PlanDetailsHeader $editMode={true}>
              <div onClick={() => setIsAddCostMode(false)}>
                <ArrowLeftIcon />
              </div>
              <D.Title>
                <CardIcon />
                비용
              </D.Title>
              <p>저장</p>
            </D.PlanDetailsHeader>

            <D.AddCostBox>
              <AddCostBox
                selectedType={addCostData.category}
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
