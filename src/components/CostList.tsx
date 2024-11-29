import styled from "styled-components";
import TrashIcon from "../assets/icons/TrashIcon";
import { RoundIconBox } from "../assets/styles/scheduleDetail.style";
import { costCategories } from "../utils/staticDatas";
import { AddCostDataTypes } from "../types/schedule";

interface Props {
  isWeb?: boolean;
  costList: AddCostDataTypes[];
  onDeleteCost: (index: number) => Promise<void>;
}

export default function CostList({
  isWeb = false,
  costList,
  onDeleteCost,
}: Props) {
  return (
    <CostItemList $isWeb={isWeb}>
      {costList.length > 0 ? (
        costList.map((item, idx) => {
          const matchedCategory = costCategories.find(
            (category) => category.id == item.type
          );

          return (
            <CostItem key={idx} $isWeb={isWeb}>
              <CostBox $isWeb={isWeb}>
                <CostCategory>
                  <CostCategoryIcon>
                    {matchedCategory && (
                      <matchedCategory.icon stroke="#6979F8" />
                    )}
                  </CostCategoryIcon>
                  <p>{item.name}</p>
                </CostCategory>
                <p>{item.expense}원</p>
              </CostBox>
              <div onClick={() => onDeleteCost(idx)}>
                <TrashIcon />
              </div>
            </CostItem>
          );
        })
      ) : (
        <p>비용을 추가해주세요.</p>
      )}
    </CostItemList>
  );
}

const CostItemList = styled.div<{ $isWeb: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    margin: 5px 0;
    font-size: ${({ $isWeb }) => !$isWeb && "14px"};
  }
`;

const CostItem = styled.div<{ $isWeb: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $isWeb }) => ($isWeb ? "17px" : "8px")};
`;

const CostBox = styled.div<{ $isWeb: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isWeb }) => ($isWeb ? "16px 24px" : "17px 18px")};
  border-radius: 16px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
  background-color: ${(props) => props.theme.color.white};
  font-size: ${({ $isWeb }) => !$isWeb && "14px"};
  color: ${(props) => props.theme.color.gray700};
`;

const CostCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CostCategoryIcon = styled(RoundIconBox)`
  background-color: ${(props) => props.theme.color.secondaryLight};
`;
