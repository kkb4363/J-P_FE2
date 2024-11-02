import { useRef, useState } from "react";
import styled from "styled-components";
import AddSquareIcon from "../../../assets/icons/AddSquareIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import { TitlePlusBox } from "../../../assets/styles/scheduleDetail.style";
import { testCostList } from "../../../utils/staticDatas";
import CostList from "../../CostList";
import TransportBox from "../../TransportBox";

export default function PlanMemo() {
  const [isPlanMemoEdit, setIsPlanMemoEdit] = useState(false);
  const [isAddCost, setIsAddCost] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [planMemoData, setPlanMemoData] = useState({
    content: "",
    cost: testCostList,
    transport: [] as string[],
  });

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 맞게 조절
    }
  };

  const handleEditDoneClick = () => {
    setIsPlanMemoEdit(false);
  };

  return (
    <PlanMemoContainer>
      <DoneButton
        $isPlanMemoEdit={isPlanMemoEdit}
        onClick={handleEditDoneClick}
      >
        완료
      </DoneButton>
      <Title>나의 플랜</Title>

      <PlanMemoBody>
        <div>
          <SubTitleBox>
            <CalendarIcon />
            <p>일정</p>
          </SubTitleBox>
          <ContentInput onClick={() => setIsPlanMemoEdit(true)}>
            <textarea
              ref={textareaRef}
              placeholder="여행 상세 일정"
              readOnly={!isPlanMemoEdit}
              value={planMemoData.content}
              onChange={(e) =>
                setPlanMemoData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              onInput={adjustTextareaHeight}
              onClick={() => setIsPlanMemoEdit(true)}
            />
          </ContentInput>
        </div>
        <div>
          <TitlePlusBox>
            <SubTitleBox>
              <CardIcon />
              <p>비용</p>
            </SubTitleBox>
            <div onClick={() => setIsAddCost(true)}>
              <AddSquareIcon />
            </div>
          </TitlePlusBox>
          <CostList isWeb={true} costList={planMemoData.cost} />
        </div>
        <div>
          <TitlePlusBox>
            <SubTitleBox>
              <TrainIcon />
              <p>이동 수단</p>
            </SubTitleBox>
            <div onClick={() => setIsPlanMemoEdit(true)}>
              <AddSquareIcon />
            </div>
          </TitlePlusBox>
          <TransportBox
            isWeb={true}
            transport={planMemoData.transport}
            isPlanMemoEdit={isPlanMemoEdit}
            setData={setPlanMemoData}
          />
        </div>
      </PlanMemoBody>
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

const DoneButton = styled.button<{ $isPlanMemoEdit: boolean }>`
  margin-top: 14px;
  color: ${(props) => props.theme.color.secondary};
  font-weight: 700;
  align-self: flex-end;
  visibility: ${({ $isPlanMemoEdit }) => !$isPlanMemoEdit && "hidden"};
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

const SubTitleBox = styled.div`
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
