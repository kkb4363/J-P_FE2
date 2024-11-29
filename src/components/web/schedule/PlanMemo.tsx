import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import { TitlePlusBox } from "../../../assets/styles/scheduleDetail.style";
import { editPlan, getPlan } from "../../../service/axios";
import { AddCostDataTypes, PlanDetailsProps } from "../../../types/schedule";
import AddCostBox from "../../AddCostBox";
import CostList from "../../CostList";
import TransportBox from "../../TransportBox";
import CustomSkeleton from "../../CustomSkeleton";

interface Props {
  isAddCost: boolean;
  planItemId: number;
  setIsOpenMemoModal: React.Dispatch<
    React.SetStateAction<{
      memo: boolean;
      cost: boolean;
    }>
  >;
}

export default function PlanMemo({
  isAddCost,
  planItemId,
  setIsOpenMemoModal,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanMemoEdit, setIsPlanMemoEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
    await editPlanApi(planItemId, updatedPlanMemoData);
  };

  const handleEditDoneClick = async () => {
    if (isAddCost) {
      const updatedPlanMemoData = {
        ...planMemoData,
        expense: [...planMemoData.expense, addCostData],
      };
      editPlanApi(planItemId, updatedPlanMemoData);
      setIsOpenMemoModal({ memo: true, cost: false });
    } else {
      editPlanApi(planItemId, planMemoData);
      setIsPlanMemoEdit(false);
    }
  };

  const editPlanApi = async (
    planItemId: number,
    planMemoData: PlanDetailsProps
  ) => {
    await editPlan(planItemId, planMemoData);
    await getPlanApi();
  };

  const getPlanApi = async () => {
    setIsLoading(true);
    getPlan(planItemId).then((res) =>
      setPlanMemoData({
        memo: res?.data.memo ?? "",
        expense: res?.data.expense,
        mobility: res?.data.mobility,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getPlanApi();
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [planMemoData.memo]);

  return (
    <PlanMemoContainer>
      <DoneButton
        $isEdit={isPlanMemoEdit || isAddCost}
        onClick={handleEditDoneClick}
      >
        {isAddCost ? "저장" : "완료"}
      </DoneButton>
      {isAddCost ? (
        <AddCostTitle>
          <CardIcon />
          <h1>비용</h1>
        </AddCostTitle>
      ) : (
        <Title>나의 플랜</Title>
      )}
      {!isAddCost && planMemoData && (
        <PlanMemoBody>
          <div>
            <SubtitleBox>
              <CalendarIcon />
              <p>일정</p>
            </SubtitleBox>
            <ContentInput onClick={() => setIsPlanMemoEdit(true)}>
              <textarea
                ref={textareaRef}
                placeholder="여행 상세 일정"
                readOnly={!isPlanMemoEdit}
                value={planMemoData.memo}
                onChange={(e) =>
                  setPlanMemoData((prev) => ({
                    ...prev!,
                    memo: e.target.value,
                  }))
                }
                onInput={adjustTextareaHeight}
                onClick={() => setIsPlanMemoEdit(true)}
              />
            </ContentInput>
          </div>
          <div>
            <TitlePlusBox>
              <SubtitleBox>
                <CardIcon />
                <p>비용</p>
              </SubtitleBox>
              <div
                onClick={() =>
                  setIsOpenMemoModal({
                    memo: false,
                    cost: true,
                  })
                }
              >
                <AddSquareIcon />
              </div>
            </TitlePlusBox>
            {isLoading ? (
              <CustomSkeleton width="495px" height="66px" borderRadius="16px" />
            ) : (
              <CostList
                isWeb={true}
                costList={planMemoData.expense}
                onDeleteCost={handleDeleteCostClick}
              />
            )}
          </div>
          <div>
            <TitlePlusBox>
              <SubtitleBox>
                <TrainIcon />
                <p>이동 수단</p>
              </SubtitleBox>
              <div onClick={() => setIsPlanMemoEdit(true)}>
                <AddSquareIcon />
              </div>
            </TitlePlusBox>
            <TransportBox
              isWeb={true}
              transport={planMemoData.mobility || []}
              isPlanMemoEdit={isPlanMemoEdit}
              setData={setPlanMemoData}
            />
          </div>
        </PlanMemoBody>
      )}

      {/* 비용 추가 Modal */}
      {isAddCost && (
        <AddCostBody>
          <AddCostBox
            isWeb
            selectedType={addCostData.type}
            setAddCostData={setAddCostData}
          />
        </AddCostBody>
      )}
    </PlanMemoContainer>
  );
}

const PlanMemoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const DoneButton = styled.p<{ $isEdit: boolean }>`
  margin-top: 14px;
  padding: 0;
  color: ${(props) => props.theme.color.secondary};
  font-weight: 700;
  align-self: flex-end;
  cursor: pointer;
  visibility: ${({ $isEdit }) => !$isEdit && "hidden"};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  align-self: center;
`;

const PlanMemoBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 36px;
  max-height: calc(808px - 180px);
`;

const SubtitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;

  & > p {
    font-size: 20px;
    font-weight: 700;
  }
`;

const ContentInput = styled.div`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  padding: 24px 27px;
  min-height: 148px;

  & > textarea {
    padding: 0;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 16px;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
      font-size: 16px;
    }
  }
`;

const AddCostTitle = styled.div`
  display: flex;
  gap: 8px;
  align-self: center;

  & > h1 {
    font-size: 24px;
  }
`;

const AddCostBody = styled.div`
  height: 695px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 32px;
`;
