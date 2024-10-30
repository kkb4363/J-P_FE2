import { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import NextArrow from "./mobile/schedule/NextArrow";
import PrevArrow from "./mobile/schedule/PrevArrow";

interface Props {
  isMobile: boolean;
  dayList: number[];
  currentDay: number;
}

export default function MoveDaySlider({
  isMobile,
  dayList,
  currentDay,
}: Props) {
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
    <StyledSlider {...slideSettings} $isMobile={isMobile}>
      {dayList.map((day, i) => (
        <div>
          <DayBox
            key={i}
            onClick={() => setSelectDay(day)}
            $select={selectDay === day}
            $isMobile={isMobile}
          >
            <p>{`Day ${day + 1}`}</p>
            <span>4.17 (목)</span>
          </DayBox>
        </div>
      ))}
    </StyledSlider>
  );
}

const StyledSlider = styled(Slider)<{ $isMobile: boolean }>`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? "0 6px" : "32px 15px")};
  text-align: center;
  display: flex;

  .slick-list {
    width: 100%;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const DayBox = styled.div<{ $select: boolean; $isMobile: boolean }>`
  height: ${({ $isMobile }) => ($isMobile ? "61px" : "78px")};
  padding: ${({ $isMobile }) => ($isMobile ? "12px 15px" : "16px 20px")};
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
  font-size: ${({ $isMobile }) => $isMobile && "14px"};

  & > p {
    font-weight: 700;
    color: ${(props) =>
      props.$select ? props.theme.color.secondary : props.theme.color.gray700};
  }
  & > span {
    color: ${(props) =>
      props.$select ? props.theme.color.secondary : props.theme.color.gray400};
  }
`;
