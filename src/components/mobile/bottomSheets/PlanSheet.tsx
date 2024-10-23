import { arrayMoveImmutable } from "array-move";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import PlanCalendarIcon from "../../../assets/icons/PlanCalendarIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";
import { useJPStore } from "../../../store/JPType.store";
import { planItemProps } from "../../../types/schedule";
import {
  costCategories,
  testCostList,
  testDayList,
  testPlanItems,
  testTransportList,
} from "../../../utils/staticDatas";
import DaySlider from "../../DaySlider";
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
  const [planItems, setPlanItems] = useState<planItemProps[]>(testPlanItems);
  const [transport, setTransport] = useState<string[]>([]);
  const [costCategory, setCostCategory] = useState("Car");
  const [planDetails, setPlanDetails] = useState({
    content: "",
    cost: "",
    transport: "",
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { jpState } = useJPStore();
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

  const handleTransportClick = (item: string) => {
    if (isPlanDetailEdit) {
      if (transport.includes(item)) {
        setTransport((prev) =>
          prev.filter((transportItem) => transportItem !== item)
        );
      } else {
        setTransport((prev) => [...prev, item]);
      }
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
                  jpState={jpState}
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
                  <D.CostTitleBox>
                    <D.SubTitleBox>
                      <CardIcon />
                      <p>비용</p>
                    </D.SubTitleBox>
                    <div onClick={() => setIsAddCostMode(true)}>
                      <AddSquareIcon />
                    </div>
                  </D.CostTitleBox>
                  <D.CostItemList>
                    {testCostList.length > 0 ? (
                      testCostList.map((item, idx) => (
                        <D.CostItem>
                          <D.CostBox key={idx}>
                            <D.CostCategory>
                              <D.CostCategoryIcon>
                                <item.type.icon stroke="#6979F8" />
                              </D.CostCategoryIcon>
                              <p>{item.name}</p>
                            </D.CostCategory>
                            <p>{item.cost}원</p>
                          </D.CostBox>
                          <div>
                            <TrashIcon />
                          </div>
                        </D.CostItem>
                      ))
                    ) : (
                      <p>비용을 추가해주세요.</p>
                    )}
                  </D.CostItemList>
                </div>
                <div>
                  <D.CostTitleBox>
                    <D.SubTitleBox>
                      <TrainIcon />
                      <p>이동 수단</p>
                    </D.SubTitleBox>
                    <div onClick={() => setIsPlanDetailEdit(true)}>
                      <AddSquareIcon />
                    </div>
                  </D.CostTitleBox>
                  <D.TransportBox>
                    {isPlanDetailEdit &&
                      testTransportList.map((item, i) => (
                        <D.TransPortItem
                          key={i}
                          onClick={() => handleTransportClick(item)}
                          $select={transport.includes(item)}
                        >
                          {item}
                        </D.TransPortItem>
                      ))}
                    {!isPlanDetailEdit &&
                      (transport.length > 0 ? (
                        transport.map((item, idx) => (
                          <D.TransPortItem key={idx} $select={true}>
                            {item}
                          </D.TransPortItem>
                        ))
                      ) : (
                        <p>선택된 아이템이 없습니다</p>
                      ))}
                  </D.TransportBox>
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
              <div>
                <p>항목을 선택해주세요.</p>
                <D.SelectCostBox>
                  {costCategories.map((category, idx) => (
                    <D.SelectCostItem
                      key={idx}
                      $isSelected={costCategory === category.id}
                      onClick={() => setCostCategory(category.id)}
                    >
                      <D.CategoryIconBox
                        $isSelected={costCategory === category.id}
                      >
                        <category.icon
                          stroke={
                            costCategory === category.id ? "#6979F8" : "#B8B8B8"
                          }
                        />
                      </D.CategoryIconBox>
                      <span>{category.label}</span>
                    </D.SelectCostItem>
                  ))}
                </D.SelectCostBox>
              </div>
              <div>
                <p>항목명을 입력해주세요.</p>
                <D.CostInput>
                  <input name="name" placeholder="항목명 입력" />
                </D.CostInput>
              </div>
              <div>
                <p>금액을 입력해주세요.</p>
                <D.CostInput>
                  <input name="cost" type="number" placeholder="금액 입력" />
                </D.CostInput>
              </div>
            </D.AddCostBox>
          </div>
        </BottomSheet>
      )}
      {openModal.deleteSchedule && (
        <TwoButtonsModal
          text="일정을 삭제할까요?"
          onClick={handleDeleteModalClick}
          onClose={() => setOpenModal((p) => ({ ...p, deleteSchedule: false }))}
        />
      )}
    </>
  );
}
