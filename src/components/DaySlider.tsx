import Slider from "react-slick";
import styled from "styled-components";
import PrevArrow from "./mobile/schedule/PrevArrow";
import NextArrow from "./mobile/schedule/NextArrow";
import { dayResDto } from "../types/res.dto";

interface Props {
  web?: boolean;
  dayList: dayResDto[];
  currentDay: number;
  onDayClick: (day: number) => void;
}

export default function DaySlider({
  web = false,
  dayList,
  currentDay,
  onDayClick,
}: Props) {
  const slidesToShowCount = web ? 4 : 3;
  const daySlideSettings = {
    infinite: false,
    focusOnSelect: true,
    focusOnChange: true,
    slidesToShow: slidesToShowCount,
    swipeToSlide: true,
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <StyledSlider {...daySlideSettings}>
      {dayList.map((day, i) => (
        <DayBox
          key={i}
          onClick={() => onDayClick(day.dayIndex)}
          $select={currentDay === day.dayIndex}
          $web={web}
        >{`Day ${day.dayIndex}`}</DayBox>
      ))}
    </StyledSlider>
  );
}

const StyledSlider = styled(Slider)`
  text-align: center;
  display: flex;

  .slick-slider {
    position: relative;
  }
`;

const DayBox = styled.div<{ $select: boolean; $web: boolean }>`
  width: ${({ $web }) => ($web ? "105px !important" : "80px !important")};
  height: ${({ $web }) => ($web ? "43px" : "33px")};
  display: grid;
  place-content: center;
  white-space: nowrap;
  background-color: ${(props) =>
    props.$select ? props.theme.color.secondary : props.theme.color.white};
  color: ${(props) =>
    props.$select ? props.theme.color.white : props.theme.color.secondary};
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: ${({ $web }) => ($web ? "30px" : "16px")};
  font-size: ${({ $web }) => !$web && "14px"};
  font-weight: 700;
`;
