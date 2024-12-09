import { useEffect, useRef, useState } from "react";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import PlanCalendarIcon from "../../../assets/icons/PlanCalendarIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";
import { editPlan, getPlan } from "../../../service/axios";
import { PlanDetailsProps } from "../../../types/schedule";
import CostList from "../../CostList";
import TransportBox from "../../TransportBox";

interface Props {
  itemId: number | undefined;
  setIsOpenMemo: React.Dispatch<
    React.SetStateAction<{
      itemId: number | undefined;
      memo: boolean;
      cost: boolean;
    }>
  >;
}

export default function PlanMemo({ itemId, setIsOpenMemo }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanMemoEdit, setIsPlanMemoEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [planMemoData, setPlanMemoData] = useState<PlanDetailsProps>({
    memo: "",
    expense: [],
    mobility: [],
  });

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 맞게 조절
    }
  };

  const handleDeleteCostClick = async (index: number) => {
    const updatedPlanMemoData = {
      ...planMemoData,
      expense: planMemoData.expense.filter((_, idx) => idx !== index),
    };
    await editPlanApi(itemId!, updatedPlanMemoData);
  };

  const handleEditDoneClick = async () => {
    editPlanApi(itemId!, planMemoData);
    setIsPlanMemoEdit(false);
  };

  const getPlanApi = async () => {
    setIsLoading(true);
    getPlan(itemId!).then((res) =>
      setPlanMemoData({
        memo: res?.data.memo ?? "",
        expense: res?.data.expense,
        mobility: res?.data.mobility,
      })
    );
    setIsLoading(false);
  };

  const editPlanApi = async (
    planItemId: number,
    planMemoData: PlanDetailsProps
  ) => {
    await editPlan(planItemId, planMemoData);
    await getPlanApi();
  };

  useEffect(() => {
    getPlanApi();
  }, [itemId]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [planMemoData.memo]);

  console.log(planMemoData);

  return (
    <div>
      <D.PlanMemoHeader $editMode={isPlanMemoEdit}>
        <div
          onClick={() =>
            setIsOpenMemo({ itemId: undefined, memo: false, cost: false })
          }
        >
          <ArrowLeftIcon />
        </div>
        <D.Title>플랜 추가</D.Title>
        <p onClick={handleEditDoneClick}>완료</p>
      </D.PlanMemoHeader>
      <D.PlanMemoBody>
        <div>
          <D.SubTitleBox>
            <PlanCalendarIcon />
            <p>일정</p>
          </D.SubTitleBox>
          <D.ContentInput
            isMemoEdit={isPlanMemoEdit}
            onClick={() => setIsPlanMemoEdit(true)}
          >
            <textarea
              ref={textareaRef}
              placeholder="여행 상세 일정"
              readOnly={!isPlanMemoEdit}
              value={planMemoData.memo}
              onChange={(e) =>
                setPlanMemoData((prev) => ({
                  ...prev,
                  memo: e.target.value,
                }))
              }
              onInput={adjustTextareaHeight}
            />
          </D.ContentInput>
        </div>
        <div>
          <D.TitlePlusBox>
            <D.SubTitleBox>
              <CardIcon />
              <p>비용</p>
            </D.SubTitleBox>
            <div
              onClick={() =>
                setIsOpenMemo((prev) => ({ ...prev, memo: false, cost: true }))
              }
            >
              <AddSquareIcon />
            </div>
          </D.TitlePlusBox>
          <CostList
            costList={planMemoData.expense}
            onDeleteCost={handleDeleteCostClick}
          />
        </div>
        <div>
          <D.TitlePlusBox>
            <D.SubTitleBox>
              <TrainIcon />
              <p>이동 수단</p>
            </D.SubTitleBox>
            <div onClick={() => setIsPlanMemoEdit(true)}>
              <AddSquareIcon />
            </div>
          </D.TitlePlusBox>
          <TransportBox
            transport={planMemoData.mobility || []}
            isPlanMemoEdit={isPlanMemoEdit}
            setData={setPlanMemoData}
          />
        </div>
      </D.PlanMemoBody>
    </div>
  );
}
