import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import Review from "./Review";
import TravelLog from "./TravelLog";
import BottomSheet from "../../../components/mobile/BottomSheet";
import { useReviewStore } from "../../../store/travelReview.store";

type SortProps = "NEW" | "HOT" | "STAR_HIGH" | "STAR_LOW";
const FilterOptions = [
  "최신순",
  "인기순",
  "별점 낮은순",
  "별점 높은순",
] as const;
type FilterType = (typeof FilterOptions)[number];

export default function TravelReview() {
  const { isReview, toggleReview } = useReviewStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("최신순");
  const [pendingFilter, setPendingFilter] = useState<FilterType>("최신순");

  const getSortByFilter = (filter: FilterType): SortProps => {
    switch (filter) {
      case "최신순":
        return "NEW";
      case "인기순":
        return "HOT";
      case "별점 낮은순":
        return "STAR_LOW";
      case "별점 높은순":
        return "STAR_HIGH";
      default:
        return "NEW";
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setPendingFilter(filter);
  };

  useEffect(() => {
    if (!isFilterOpen) {
      setSelectedFilter(pendingFilter);
    }
  }, [isFilterOpen]);

  return (
    <TravelReviewContainer>
      <ToggleLabelBox>
        <ToggleLabel onClick={() => toggleReview(true)}>리뷰</ToggleLabel>
        <ToggleLabel onClick={() => toggleReview(false)}>여행기</ToggleLabel>
        <ToggleButton isReview={isReview}>
          {isReview ? "리뷰" : "여행기"}
        </ToggleButton>
      </ToggleLabelBox>
      <FilterBox onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <span>{selectedFilter}</span>
        <ArrowDownIcon />
      </FilterBox>
      <>
        {isReview ? (
          <Review sort={getSortByFilter(selectedFilter)} />
        ) : (
          <TravelLog />
        )}
      </>
      <BottomSheetContainer>
        <BottomSheet
          isBlocking={true}
          maxH={0.4}
          isOpen={isFilterOpen}
          isDismiss={true}
          onDismiss={() => setIsFilterOpen(false)}
        >
          <SelectFilterBox>
            <p>필터</p>
            <RowLine />
            <FilterContainer>
              {FilterOptions.map((option) => (
                <FilterLabel key={option}>
                  <FilterInput
                    type="radio"
                    name="filter"
                    value={option}
                    checked={pendingFilter === option}
                    onChange={() => handleFilterChange(option)}
                  />
                  <FilterText>{option}</FilterText>
                </FilterLabel>
              ))}
            </FilterContainer>
          </SelectFilterBox>
        </BottomSheet>
      </BottomSheetContainer>
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

const BottomSheetContainer = styled.div`
  width: 100%;
  z-index: 2;
`;

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
  width: 22px;
  height: 22px;
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
