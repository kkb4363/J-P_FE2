import { useState } from "react";
import styled from "styled-components";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import Review from "./Review";
import Travelogue from "./Travelogue";
import BottomSheet from "../../../components/mobile/BottomSheet";
import { useReviewStore } from "../../../store/travelReview.store";
import { Filter, filter } from "../../../utils/staticDatas";

export default function TravelReview() {
  const reviewStore = useReviewStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filter[0]);

  const handleFilterChange = (filter: Filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  return (
    <TravelReviewContainer>
      <ToggleLabelBox>
        <ToggleLabel onClick={() => reviewStore.setIsReview(true)}>
          리뷰
        </ToggleLabel>
        <ToggleLabel onClick={() => reviewStore.setIsReview(false)}>
          여행기
        </ToggleLabel>
        <ToggleButton isReview={reviewStore.getIsReview()}>
          {reviewStore.getIsReview() ? "리뷰" : "여행기"}
        </ToggleButton>
      </ToggleLabelBox>
      <FilterBox onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <span>{selectedFilter.name}</span>
        <ArrowDownIcon />
      </FilterBox>
      <>
        {reviewStore.getIsReview() ? (
          <Review sort={selectedFilter.state} />
        ) : (
          <Travelogue sort={selectedFilter.state} />
        )}
      </>
      {isFilterOpen && (
        <BottomSheet
          isBlocking={true}
          maxH={0.4}
          isOpen={isFilterOpen}
          isDismiss={true}
          handleClose={() => setIsFilterOpen(false)}
        >
          <SelectFilterBox>
            <p>필터</p>
            <RowLine />
            <FilterContainer>
              {filter.map((option, idx) => (
                <FilterLabel key={idx}>
                  <FilterInput
                    type="radio"
                    name="filter"
                    checked={selectedFilter === option}
                    onChange={() => handleFilterChange(option)}
                  />
                  <FilterText>{option.name}</FilterText>
                </FilterLabel>
              ))}
            </FilterContainer>
          </SelectFilterBox>
        </BottomSheet>
      )}
    </TravelReviewContainer>
  );
}

const TravelReviewContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const ToggleLabelBox = styled.div`
  width: 180px;
  height: 45px;
  min-height: 45px;
  margin: 14px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 30px;
  cursor: pointer;
`;

const ToggleLabel = styled.label`
  color: ${(props) => props.theme.color.gray300};
  font-weight: 700;
  font-size: 16px;
`;

const ToggleButton = styled.button<{ isReview: boolean }>`
  width: ${(props) => (props.isReview ? "75px" : "87px")};
  height: 33px;
  z-index: 1;
  position: absolute;
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 700;
  background-color: ${(props) => props.theme.color.main};
  border-radius: 30px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.06);
  left: ${(props) =>
    props.isReview
      ? "calc(100% / 2 - 180px / 2 + 7px)"
      : "calc(100% / 2 - 3px)"};
  transition: left 0.2s ease-out;
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-right: 28px;
  padding: 7px 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};
  cursor: pointer;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }
`;

// const BottomSheetContainer = styled.div`
//   width: 100%;
//   z-index: 2;
// `;

const SelectFilterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
  gap: 22px;
  & > p {
    font-weight: 700;
    color: ${(props) => props.theme.color.gray900};
  }
`;

const RowLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray200};
`;

const FilterContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
  padding: 0 20px;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FilterInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 2px solid ${(props) => props.theme.color.gray200};
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  // 기본 스타일 제거
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:checked {
    background-color: ${(props) => props.theme.color.secondary};
    border: 3px solid ${(props) => props.theme.color.white};
    box-shadow: 0 0 0 1.6px ${(props) => props.theme.color.secondary};
  }
`;

const FilterText = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.color.gray900};
`;
