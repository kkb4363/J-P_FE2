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

  console.log(selectedFilter);

  return (
    <TravelReviewContainer>
      <>
        <Switch value={reviewStore.isReview}>
          <span />
          <ReviewBtn
            value={reviewStore.isReview}
            onClick={() => reviewStore.setIsReview(true)}
          >
            리뷰
          </ReviewBtn>
          <TravelogueBtn
            value={!reviewStore.isReview}
            onClick={() => reviewStore.setIsReview(false)}
          >
            여행기
          </TravelogueBtn>
        </Switch>
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
      {reviewStore.isReview ? (
        <Review sort={selectedFilter.state} />
      ) : (
        <Travelogue sort={selectedFilter.state} />
      )}
    </TravelReviewContainer>
  );
}
const TravelReviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 15%;
  gap: 10px;
`;

const Switch = styled.div<{ value: boolean }>`
  position: relative;
  display: flex;
  width: 180px;
  height: 45px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray100};
  border-radius: 30px;

  & > span {
    position: absolute;
    width: ${({ value }) => (value ? "75px" : "87px")};
    height: 33px;
    top: 6px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.color.main};
    transition: all 0.6s ease-in-out;
    z-index: 1;
    transform: ${({ value }) =>
      value ? "translateX(7px)" : "translateX(85px)"};
  }
`;

const Toggle = styled.button<{ value: boolean }>`
  position: relative;
  height: 45px;
  color: ${(props) => props.theme.color.gray300};
  font-weight: 700;
  z-index: 2;
  transition: color 0.5s ease;
  padding: 0;
`;

const ReviewBtn = styled(Toggle)`
  width: 90px;
  color: ${({ value }) => value && "#fff"};
`;

const TravelogueBtn = styled(Toggle)`
  width: 80px;
  margin-right: 10px;
  color: ${({ value }) => value && "#fff"};
`;

const FilterBox = styled.div`
  position: relative;
  align-self: flex-end;
`;

const FilterButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px 18px;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};
  background-color: ${(props) => props.theme.color.white};

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
  z-index: 9;
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
