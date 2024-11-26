import styled from "styled-components";
import { AddCostDataTypes } from "../types/schedule";
import { costCategories } from "../utils/staticDatas";

interface Props {
  isWeb?: boolean;
  selectedType: string;
  setAddCostData: React.Dispatch<React.SetStateAction<AddCostDataTypes>>;
}

export default function AddCostBox({
  isWeb = false,
  selectedType,
  setAddCostData,
}: Props) {
  return (
    <>
      <div>
        <Subtitle $isWeb={isWeb}>항목을 선택해주세요.</Subtitle>
        <SelectCostBox $isWeb={isWeb}>
          {costCategories.map((category, idx) => (
            <SelectCostItem
              key={idx}
              $isWeb={isWeb}
              $isSelected={selectedType === category.id}
              onClick={() =>
                setAddCostData((prev) => ({
                  ...prev,
                  category: category.id,
                }))
              }
            >
              <CategoryIconBox $isSelected={selectedType === category.id}>
                <category.icon
                  stroke={selectedType === category.id ? "#6979F8" : "#B8B8B8"}
                />
              </CategoryIconBox>
              <span>{category.label}</span>
            </SelectCostItem>
          ))}
        </SelectCostBox>
      </div>
      <div>
        <Subtitle $isWeb={isWeb}>항목명을 입력해주세요.</Subtitle>
        <CostInput>
          <input
            name="name"
            placeholder="항목명 입력"
            onChange={(e) =>
              setAddCostData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </CostInput>
      </div>
      <div>
        <Subtitle $isWeb={isWeb}>금액을 입력해주세요.</Subtitle>
        <CostInput>
          <input
            name="cost"
            type="number"
            placeholder="금액 입력"
            onChange={(e) =>
              setAddCostData((prev) => ({
                ...prev,
                expense: e.target.value ? parseFloat(e.target.value) : null,
              }))
            }
          />
        </CostInput>
      </div>
    </>
  );
}
const SelectCostBox = styled.div<{ $isWeb: boolean }>`
  display: flex;
  gap: ${({ $isWeb }) => ($isWeb ? "32px" : "20px")};
`;

const SelectCostItem = styled.div<{ $isWeb: boolean; $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isWeb }) => ($isWeb ? "12px" : "5px")};

  & > span {
    font-size: ${({ $isWeb }) => !$isWeb && "12px"};
    color: ${(props) =>
      props.$isSelected
        ? props.theme.color.secondary
        : props.theme.color.gray400};
  }
`;

const RoundIconBox = styled.div`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 30px;
`;

const CategoryIconBox = styled(RoundIconBox)<{ $isSelected: boolean }>`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.color.secondary
        : props.theme.color.gray200};
`;

const CostInput = styled.div`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  height: 52px;
  padding: 15.5px 24px;

  & > input {
    outline: none;
    width: 100%;
    font-size: 14px;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const Subtitle = styled.p<{ $isWeb: boolean }>`
  color: ${(props) => props.theme.color.gray900};
  font-size: ${({ $isWeb }) => ($isWeb ? "20px" : "14px")};
  margin-bottom: ${({ $isWeb }) => ($isWeb ? "20px" : "8px")};
`;
