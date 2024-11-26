import Carousel from "react-multi-carousel";
import { CustomLeftArrow, CustomRightArrow } from "../home/CardSlide";
import MyTravelCard from "../../MyTravelCard";
import { useNavigate } from "react-router-dom";
import { ScheduleApiProps } from "../../../types/schedule";
import { useEffect, useState } from "react";

interface Props {
  schedules: ScheduleApiProps[];
  isDelete: boolean;
  setDeleteId: (id: number) => void;
}

export default function ScheduleSlider({
  schedules,
  isDelete,
  setDeleteId,
}: Props) {
  const navigate = useNavigate();
  const [selectId, setSelectId] = useState<number>();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  const handleClick = (id: number) => {
    if (isDelete) {
      setSelectId(id);
      setDeleteId(id);
    } else {
      navigate(`/home/schedule/details/${id}`);
    }
  };

  useEffect(() => {
    if (isDelete) {
      setSelectId(schedules[0]?.id);
      setDeleteId(schedules[0]?.id);
    }
  }, [isDelete]);

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
      {schedules?.map((s: any) => (
        <MyTravelCard
          key={s.id}
          width="392px"
          height="110px"
          title={s.title}
          startDate={s.startDate}
          endDate={s.endDate}
          isOpen={s.isOpen}
          isSelect={selectId === s.id}
          handleClick={() => handleClick(s.id)}
        />
      ))}
    </Carousel>
  );
}
