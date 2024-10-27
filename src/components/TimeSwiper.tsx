import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  isMobile: boolean;
}

export default function TimeSwiper({ isMobile }: Props) {
  const [selectTime, setSelectTime] = useState(0); //0 오전 1 오후
  const [selectHour, setSelectHour] = useState(0);
  const [selectMin, setSelectMin] = useState(0);

  const hour = Array.from({ length: 12 }).map((v, i) => {
    const num = i + 1;
    return num < 10 ? `0${num}` : `${num}`;
  });
  const min = Array.from({ length: 6 }).map((v, i) => {
    return i === 0 ? `00` : i * 10;
  });

  return (
    <TimeModalContainer $isMobile={isMobile}>
      <Swiper
        direction="vertical"
        loop={true}
        slideToClickedSlide={true}
        loopAdditionalSlides={1}
        spaceBetween={40}
        slidesPerView={2}
        onSlideChange={(swiper) => setSelectTime(swiper.realIndex)}
        centeredSlides={true}
      >
        <SwiperSlide>
          <Text>오전</Text>
        </SwiperSlide>
        <SwiperSlide>
          <Text>오후</Text>
        </SwiperSlide>
      </Swiper>

      <Swiper
        direction="vertical"
        loop={true}
        slideToClickedSlide={true}
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={(swiper) => setSelectHour(swiper.realIndex + 1)}
        centeredSlides={true}
      >
        {hour.map((hour) => (
          <SwiperSlide key={hour}>
            <Text>{hour}</Text>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        direction="vertical"
        loop={true}
        slideToClickedSlide={true}
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={(swiper) => setSelectMin(swiper.realIndex * 10)}
        centeredSlides={true}
      >
        {min.map((min) => (
          <SwiperSlide key={min}>
            <Text>{min}</Text>
          </SwiperSlide>
        ))}
      </Swiper>
    </TimeModalContainer>
  );
}

const TimeModalContainer = styled.div<{ $isMobile: boolean }>`
  max-height: ${(props) => (props.$isMobile ? "90px" : "120px")};
  margin-top: ${(props) => (props.$isMobile ? 0 : "30px")};
  width: 100%;
  align-items: center;
  display: flex;
  padding: 0 50px;
`;

const Text = styled.p`
  cursor: default;
  user-select: none;
`;
