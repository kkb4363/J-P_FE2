import * as D from "../../../assets/styles/scheduleDetail.style";
import BottomSheet from "./../BottomSheet";
import TwoButtonsModal from "../TwoButtonsModal";
import { useState } from "react";
import { useJPStore } from "../../../store/JPType.store";
import { useNavigate } from "react-router-dom";
import { PlanList } from "../scheduleSort/PlanList";
import { planItemProps } from "../../../types/schedule";
import { arrayMoveImmutable } from "array-move";
import PrevArrow from "../SlideArrows/PrevArrow";
import NextArrow from "../SlideArrows/NextArrow";
import {
  testDayList,
  testPlanItems,
  testTransportList,
} from "../../../utils/staticDatas";
import CarIcon from "../../../assets/icons/CarIcon";
import PlanCalendarIcon from "../../../assets/icons/PlanCalendarIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import TicketIcon from "../../../assets/icons/TicketIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";

interface Props {
  setIsPlanPlace: (value: React.SetStateAction<boolean>) => void;
}

export default function PlanSheet({ setIsPlanPlace }: Props) {
  const [isPlanEdit, setIsPlanEdit] = useState(false);
  const [isPlanDetail, setIsPlanDetail] = useState(false);
  const [isPlanDetailEdit, setIsPlanDetailEdit] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [planItems, setPlanItems] = useState<planItemProps[]>(testPlanItems);
  const [transport, setTransport] = useState("");
  const [costCategory, setCostCategory] = useState("Car");
  const { jpState } = useJPStore();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({
    deleteSchedule: false,
    deleteScheduleSuccess: false,
  });

  const daySlideSettings = {
    infinite: false,
    focusOnSelect: true,
    focusOnChange: true,
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

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
  const handleTransportClick = (item: string) => {
    if (isPlanDetailEdit) {
      setTransport(item);
    }
  };

  return (
    <>
      <BottomSheet maxH={0.75} minH={3.5}>
        {/* 일정 목록 */}
        {!isPlanDetail && (
          <>
            <D.PlansBox>
              <D.PlansEditButton onClick={() => setIsPlanEdit((prev) => !prev)}>
                {isPlanEdit ? (
                  <p>완료</p>
                ) : (
                  <>
                    <PenIcon stroke="#808080" />
                    <span>편집</span>
                  </>
                )}
              </D.PlansEditButton>
              <div>
                <D.StyledSlider {...daySlideSettings}>
                  {testDayList.map((day, i) => (
                    <D.DayBox
                      key={i}
                      onClick={() => handleDayClick(day)}
                      $select={currentDay === day}
                    >{`Day ${day + 1}`}</D.DayBox>
                  ))}
                </D.StyledSlider>
              </div>
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
          </>
        )}

        {/* 일정 상세 */}
        {isPlanDetail && (
          <div>
            <D.PlanDetailsHeader>
              <div onClick={handleDetailsClose}>
                <ArrowLeftIcon />
              </div>
              <span>플랜 추가</span>
              <p onClick={() => setIsPlanDetailEdit((prev) => !prev)}>
                {isPlanDetailEdit ? "완료" : "수정"}
              </p>
            </D.PlanDetailsHeader>
            <D.PlanDetailsBody>
              <div>
                <D.SubTitleBox>
                  <PlanCalendarIcon />
                  <p>일정</p>
                </D.SubTitleBox>
                <D.DetailsInput isDetailsEdit={isPlanDetailEdit}>
                  <textarea
                    placeholder="여행 상세 일정"
                    readOnly={!isPlanDetailEdit}
                  />
                </D.DetailsInput>
              </div>
              <div>
                <D.CostTitleBox>
                  <D.SubTitleBox>
                    <CardIcon />
                    <p>비용</p>
                  </D.SubTitleBox>
                  {isPlanDetailEdit && (
                    <div>
                      <AddSquareIcon />
                    </div>
                  )}
                </D.CostTitleBox>
                {isPlanDetailEdit ? (
                  <>
                    <D.SelectCostText>항목을 선택해주세요.</D.SelectCostText>
                    <D.SelectCostBox>
                      <D.SelectCostItem
                        isCategorySelect={costCategory === "Car"}
                        onClick={() => setCostCategory("Car")}
                      >
                        <CarIcon
                          stroke={
                            costCategory === "Car" ? "#6979F8" : "#B8B8B8"
                          }
                        />
                      </D.SelectCostItem>
                      <D.SelectCostItem
                        isCategorySelect={costCategory === "Ticket"}
                        onClick={() => setCostCategory("Ticket")}
                      >
                        <TicketIcon
                          stroke={
                            costCategory === "Ticket" ? "#6979F8" : "#B8B8B8"
                          }
                        />
                      </D.SelectCostItem>
                    </D.SelectCostBox>
                    <D.CostInput>
                      <input
                        placeholder="금액 입력"
                        readOnly={!isPlanDetailEdit}
                      />
                    </D.CostInput>
                  </>
                ) : (
                  <>
                    <D.CostBox>
                      <D.CostItem>
                        <D.CostCategory>
                          <D.CostCategoryIcon>
                            <CarIcon />
                          </D.CostCategoryIcon>
                          <p>버스</p>
                        </D.CostCategory>
                        <p>7,900원</p>
                      </D.CostItem>

                      <D.CostItem>
                        <D.CostCategory>
                          <D.CostCategoryIcon>
                            <TicketIcon stroke="#6979F8" />
                          </D.CostCategoryIcon>
                          <p>입장료</p>
                        </D.CostCategory>
                        <p>10,500원</p>
                      </D.CostItem>
                    </D.CostBox>
                  </>
                )}
              </div>
              <div>
                <D.SubTitleBox>
                  <TrainIcon />
                  <p>이동 수단</p>
                </D.SubTitleBox>
                <D.TransportBox>
                  {isPlanDetailEdit &&
                    testTransportList.map((item, i) => (
                      <D.TransPortItem
                        key={i}
                        onClick={() => handleTransportClick(item)}
                        $select={transport === item}
                      >
                        {item}
                      </D.TransPortItem>
                    ))}
                  {!isPlanDetailEdit && transport && (
                    <D.TransPortItem $select={true}>
                      {transport}
                    </D.TransPortItem>
                  )}
                </D.TransportBox>
              </div>
            </D.PlanDetailsBody>
          </div>
        )}
      </BottomSheet>
      {openModal.deleteSchedule && (
        <TwoButtonsModal
          text="일정을 삭제할까요?"
          onClick={() => {}}
          onClose={() => setOpenModal((p) => ({ ...p, deleteSchedule: false }))}
        />
      )}
    </>
  );
}
