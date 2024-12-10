import { useEffect, useRef, useState } from "react";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import PlanCalendarIcon from "../../../assets/icons/PlanCalendarIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";
import { PlanDetailsProps } from "../../../types/schedule";
import CostList from "../../CostList";
import TransportBox from "../../TransportBox";
import LoadingText from "../../LoadingText";

interface Props {
  itemId: number | undefined;
  planMemoData: PlanDetailsProps;

  setPlanMemoData: React.Dispatch<React.SetStateAction<PlanDetailsProps>>;
  setIsOpenMemo: React.Dispatch<
    React.SetStateAction<{
      itemId: number | undefined;
      memo: boolean;
      cost: boolean;
    }>
  >;
  editPlanApi: (
    planItemId: number,
    planMemoData: PlanDetailsProps
  ) => Promise<void>;
}

export default function PlanMemo({
  itemId,
  planMemoData,
  setPlanMemoData,
  setIsOpenMemo,
  editPlanApi,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanMemoEdit, setIsPlanMemoEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 맞게 조절
    }
  };

  const handleDeleteCostClick = async (index: number) => {
    setIsLoading(true);
    const updatedPlanMemoData = {
      ...planMemoData,
      expense: planMemoData.expense.filter((_, idx) => idx !== index),
    };
    await editPlanApi(itemId!, updatedPlanMemoData);
    setIsLoading(false);
  };

  const handleEditDoneClick = async () => {
    setIsLoading(true);
    await editPlanApi(itemId!, planMemoData);
    setIsPlanMemoEdit(false);
    setIsLoading(false);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [planMemoData.memo]);

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
        {isLoading ? (
          <LoadingText text="로딩 중..." />
        ) : (
          <>
            <div>
              <D.SubTitleBox>
                <PlanCalendarIcon />
                <p>일정</p>
              </D.SubTitleBox>
              <D.ContentInput
                $isMemoEdit={isPlanMemoEdit}
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
                    setIsOpenMemo((prev) => ({
                      ...prev,
                      memo: false,
                      cost: true,
                    }))
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
          </>
        )}
      </D.PlanMemoBody>
    </div>
  );
}
