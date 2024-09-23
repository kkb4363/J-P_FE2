import Carousel from "react-multi-carousel";
import {
  CustomLeftArrow,
  CustomRightArrow,
  ReactMultiCarouselProps,
} from "./CardSlide";
import TravelogueCard from "./TravelogueCard";

interface Props {
  responsive: ReactMultiCarouselProps;
  isReviewCard: boolean;
}

export default function TravelogueCardSlide({
  responsive,
  isReviewCard,
}: Props) {
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
      <TravelogueCard isReviewCard={isReviewCard} />
      <TravelogueCard isReviewCard={isReviewCard} />
      <TravelogueCard isReviewCard={isReviewCard} />
      <TravelogueCard isReviewCard={isReviewCard} />
      <TravelogueCard isReviewCard={isReviewCard} />
      <TravelogueCard isReviewCard={isReviewCard} />
    </Carousel>
  );
}
