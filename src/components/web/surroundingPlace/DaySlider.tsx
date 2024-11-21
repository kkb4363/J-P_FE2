import Carousel from "react-multi-carousel";
import { CustomLeftArrow, CustomRightArrow } from "../home/CardSlide";
import MyTravelCard from "../../MyTravelCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMySchedules } from "../../../service/axios";

export default function DaySlider() {
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
  };

  const [mySchedules, setMySchedules] = useState([]);

  useEffect(() => {
    getMySchedules().then((res) => {
      setMySchedules(res?.data?.data);
    });
  }, []);

  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      showDots={false}
      ssr={false}
      infinite={false}
      autoPlay={false}
      customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
      customRightArrow={<CustomRightArrow onClick={() => {}} />}
    >
      {mySchedules?.reverse().map((s: any) => (
        <MyTravelCard
          handleClick={() => navigate(`/home/schedule/details/${s.id}`)}
          width="392px"
          height="110px"
          key={s.id}
          title={s.title}
          startDate={s.startDate}
          endDate={s.endDate}
          isOpen={s.isOpen}
        />
      ))}
    </Carousel>
  );
}
