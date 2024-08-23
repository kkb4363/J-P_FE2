import { useState } from "react";
import styled from "styled-components";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import Review from "./Review";
import TravelLog from "./TravelLog";

export default function TravelReview() {
  const [isReview, setIsReview] = useState(true);

  const toggleHandler = (toggle: boolean) => {
    setIsReview(toggle);
  };

  return (
    <TravelReviewContainer>
      <ToggleLabelBox>
        <ToggleLabel onClick={() => toggleHandler(true)}>리뷰</ToggleLabel>
        <ToggleLabel onClick={() => toggleHandler(false)}>여행기</ToggleLabel>
        <ToggleButton isReview={isReview}>
          {isReview ? "리뷰" : "여행기"}
        </ToggleButton>
      </ToggleLabelBox>
      <FilterBox>
        <span>최신순</span>
        <ArrowDownIcon />
      </FilterBox>
      <div>{isReview ? <Review /> : <TravelLog />}</div>
    </TravelReviewContainer>
  );
}

const TravelReviewContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ToggleLabelBox = styled.div`
  width: 180px;
  height: 45px;
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
  z-index: 10;
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
  margin: 0 12px 18px 0;
  padding: 8px 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }
`;
