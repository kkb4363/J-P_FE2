import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAddPlaceStore } from "../store/useAddPlace.store";

interface Props {
  isMobile: boolean;
}

export default function TimeSwiper({ isMobile }: Props) {
  const [selectPeriod, setSelectPeriod] = useState("AM");
  const [selectHour, setSelectHour] = useState(0);
  const [selectMin, setSelectMin] = useState(0);
  const { setSelectTime } = useAddPlaceStore();

  const hour = Array.from({ length: 12 }).map((v, i) => {
    const num = i + 1;
    return num < 10 ? `0${num}` : `${num}`;
  });
  const min = Array.from({ length: 6 }).map((v, i) => {
    return i === 0 ? `00` : i * 10;
  });

  useEffect(() => {
    if (setSelectTime) {
      const hour24 =
        selectPeriod === "PM" && selectHour < 12 ? selectHour + 12 : selectHour;
      const formattedHour = hour24 < 10 ? `0${hour24}` : `${hour24}`;
      const formattedTime = `${formattedHour}:${
        selectMin < 10 ? `0${selectMin}` : selectMin
      }`;
      setSelectTime(formattedTime);
    }
  }, [selectPeriod, selectHour, selectMin, setSelectTime]);

  return (
    <TimeModalContainer $isMobile={isMobile}>
      <Swiper
        direction="vertical"
        loop={true}
        slideToClickedSlide={true}
        loopAdditionalSlides={1}
        spaceBetween={40}
        slidesPerView={2}
        onSlideChange={(swiper) =>
          setSelectPeriod(swiper.realIndex === 0 ? "AM" : "PM")
        }
        centeredSlides={true}
      >
        <SwiperSlide>
          <Text $isMobile={isMobile}>오전</Text>
        </SwiperSlide>
        <SwiperSlide>
          <Text $isMobile={isMobile}>오후</Text>
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
            <Text $isMobile={isMobile}>{hour}</Text>
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
            <Text $isMobile={isMobile}>{min}</Text>
          </SwiperSlide>
        ))}
      </Swiper>
    </TimeModalContainer>
  );
}

const TimeModalContainer = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "80%" : "100%")};
  height: ${({ $isMobile }) => ($isMobile ? "110px" : "140px")};
  margin-top: ${({ $isMobile }) => ($isMobile ? "5px" : "15px")};
  align-items: center;
  display: flex;
  padding: ${({ $isMobile }) => ($isMobile ? "10px" : "0px 50px")};
`;

const Text = styled.p<{ $isMobile: boolean }>`
  cursor: default;
  user-select: none;
  font-size: ${({ $isMobile }) => !$isMobile && "20px"};
`;
