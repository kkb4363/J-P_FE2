import { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import NextArrow from "./mobile/schedule/NextArrow";
import PrevArrow from "./mobile/schedule/PrevArrow";

interface Props {
  dayList: number[];
  currentDay: number;
}

export default function MoveDaySlider({ dayList, currentDay }: Props) {
  const [selectDay, setSelectDay] = useState(currentDay);
  const slideSettings = {
    infinite: false,
    focusOnSelect: true,
    focusOnChange: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <StyledSlider {...slideSettings}>
      {dayList.map((day, i) => (
        <div>
          <DayBox
            key={i}
            onClick={() => setSelectDay(day)}
            $select={selectDay === day}
          >
            <p>{`Day ${day + 1}`}</p>
            <p>4.17 (목)</p>
          </DayBox>
        </div>
      ))}
    </StyledSlider>
  );
}

const StyledSlider = styled(Slider)`
  width: 100%;
  padding: 3px 6px 0;
  text-align: center;
  display: flex;

  .slick-list {
    width: 100%;
  }
  .slick-slide {
    display: flex;
  }
`;

const DayBox = styled.div<{ $select: boolean }>`
  height: 61px;
  padding: 12px 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background-color: ${(props) => props.theme.color.white};

  border: 1px solid
    ${(props) =>
      props.$select ? props.theme.color.secondary : props.theme.color.gray200};
  border-radius: 12px;
  font-size: 14px;

  & > p:nth-child(1) {
    font-weight: 700;
    color: ${(props) =>
      props.$select ? props.theme.color.secondary : props.theme.color.gray700};
  }
  & > p:nth-child(2) {
    color: ${(props) =>
      props.$select ? props.theme.color.secondary : props.theme.color.gray400};
  }
`;
