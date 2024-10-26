import styled from "styled-components";
import Carousel from "react-multi-carousel";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";

export const CustomLeftArrow = ({ onClick }: { onClick: any }) => (
  <CustomArrow style={{ left: 0 }} onClick={onClick}>
    <ArrowLeftIcon stroke="#6979f8" />
  </CustomArrow>
);
export const CustomRightArrow = ({ onClick }: { onClick: any }) => {
  return (
    <CustomArrow style={{ right: 0 }} onClick={onClick}>
      <ArrowRightIcon stroke="#6979f8" />
    </CustomArrow>
  );
};

export default function CitySlider() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 13,
      slidesToSlide: 13,
    },
  };

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
      <City $isActive={true}>
        <span>전체</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
      <City $isActive={false}>
        <span>서울</span>
      </City>
    </Carousel>
  );
}

const City = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  background-color: ${(props) =>
    props.$isActive ? props.theme.color.secondary : props.theme.color.white};
  cursor: pointer;

  & > span {
    color: ${(props) =>
      props.$isActive ? props.theme.color.white : props.theme.color.secondary};
    font-size: 14px;
  }
`;

const CustomArrow = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.secondary};
  cursor: pointer;
  position: absolute;
`;
