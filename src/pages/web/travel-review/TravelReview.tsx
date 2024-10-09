import styled from "styled-components";
import { useReviewStore } from "../../../store/travelReview.store";
import { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import { filter } from "../../../utils/staticDatas";
import Review from "./Review";
import Travelogue from "./Travelogue";


export default function TravelReview() {
  const [isDropdownView, setIsDropdownView] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reviewStore = useReviewStore();

  const handleFilterClick = () => {
    if (isDropdownView) {
      setIsDropdownView(false);
    } else {
      setIsDropdownView(true);
    }
  };
  console.log(selectedFilter);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownView(false);
    }
  };

  const handleDropdownClick = (item: { name: string; state: string }) => {
    setSelectedFilter(item);
    setIsDropdownView(false);
  };

  useEffect(() => {
    if (isDropdownView) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownView]);

  return (
    <TravelReviewContainer>
      <>
        <ToggleBox>
          <ToggleButton
            $isSelect={reviewStore.isReview}
            onClick={() => reviewStore.setIsReview(true)}
          >
            리뷰
          </ToggleButton>
          <ToggleButton
            $isSelect={!reviewStore.isReview}
            onClick={() => reviewStore.setIsReview(false)}
          >
            여행기
          </ToggleButton>
        </ToggleBox>
        <FilterBox ref={dropdownRef}>
          <FilterButton onClick={handleFilterClick}>
            <span>{selectedFilter.name}</span>
            <ArrowDownIcon />
          </FilterButton>
          {isDropdownView && (
            <Dropdown>
              {filter.map((option, idx) => (
                <FilterLabel key={idx}>
                  <FilterInput
                    type="radio"
                    name="filter"
                    checked={selectedFilter === option}
                    onChange={() => handleDropdownClick(option)}
                  />
                  <FilterText>{option.name}</FilterText>
                </FilterLabel>
              ))}
            </Dropdown>
          )}
        </FilterBox>
      </>
      {reviewStore.isReview ? <Review sort={selectedFilter.state} /> : <Travelogue />}
    </TravelReviewContainer>
  );
}
const TravelReviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 15%;
  gap: 10px;
`;

const ToggleBox = styled.div`
  display: flex;
  align-self: center;
  gap: 16px;
`;

const ToggleButton = styled.div<{ $isSelect: boolean }>`
  padding: 12px 24px;
  font-weight: 700;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.$isSelect ? props.theme.color.main : props.theme.color.gray200};
  background-color: ${(props) =>
    props.$isSelect ? props.theme.color.mainLight : props.theme.color.white};
  color: ${(props) =>
    props.$isSelect ? props.theme.color.main : props.theme.color.gray400};
`;

const FilterBox = styled.div`
  position: relative;
  align-self: flex-end;
`;

const FilterButton = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 18px;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};

  & > span {
    color: ${(props) => props.theme.color.gray700};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: -5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  margin-top: 5px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08),
    0px 6px 8px 0px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
  z-index: 1;
  background-color: ${(props) => props.theme.color.white};
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${(props) => props.theme.color.white};
  white-space: nowrap;
  cursor: pointer;
`;

const FilterInput = styled.input`
  width: 16px;
  height: 16px;
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

