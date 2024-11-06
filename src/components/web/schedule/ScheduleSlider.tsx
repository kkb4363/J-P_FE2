import Carousel from "react-multi-carousel";
import { CustomLeftArrow, CustomRightArrow } from "../home/CardSlide";
import ScheduleCard from "./ScheduleCard";

interface Props {
  schedules?: any;
}

export default function ScheduleSlider({ schedules }: Props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
  };
  console.log(schedules);
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
      {/* {schedules?.map((s: any) => (
        <ScheduleCard
          endDate={s.endDate}
          startDate={s.startDate}
          isOpen={s.isOpen}
          title={s.title}
          placeId={s.place.placeId}
        />
      ))} */}
      <div>123</div>
    </Carousel>
  );
}
