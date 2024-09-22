import styled from "styled-components";
import CustomInput from "../../../components/mobile/CustomInput";
import Carousel from "react-multi-carousel";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import TravelLogCard from "../../../components/web/home/TravelLogCard";
import CardSlide from "../../../components/web/home/CardSlide";

export default function Home() {
  const bigResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1442 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1442, min: 464 },
      items: 4,
      slidesToSlide: 4,
    },
  };

  const smallResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1800 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1800, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
  };

  const CustomLeftArrow = ({ onClick }: { onClick: any }) => (
    <CustomArrow style={{ left: 0 }} onClick={onClick}>
      <ArrowLeftIcon />
    </CustomArrow>
  );
  const CustomRightArrow = ({ onClick }: { onClick: any }) => {
    return (
      <CustomArrow style={{ right: 0 }} onClick={onClick}>
        <ArrowRightIcon stroke="black" />
      </CustomArrow>
    );
  };

  return (
    <>
      <HomeTitle>어디로 떠날까요?</HomeTitle>

      <InputBox>
        <CustomInput text="여행지를 입력해주세요" value="" width="500px" />
      </InputBox>

      <CarouselTitle>지금 가장 인기있는 여행지</CarouselTitle>
      <CardSlide
        responsive={bigResponsive}
        placeType="TRAVEL_PLACE"
        title={true}
        subTitle={true}
      />

      <CarouselTitle>인기 여행 도시 추천</CarouselTitle>
      <CardSlide
        responsive={bigResponsive}
        placeType="CITY"
        bottomText={true}
      />

      <CarouselTitle>지금 가면 좋은 여행지</CarouselTitle>
      <CardSlide
        responsive={bigResponsive}
        placeType="THEME"
        topText={true}
        title={true}
        subTitle={true}
      />

      <CarouselTitle>
        사람들이 찜한 여행기
        <div>
          <span>인기순</span>
          <span>최신순</span>
        </div>
        <div>
          <span>더보기</span>
        </div>
      </CarouselTitle>

      <Carousel
        responsive={smallResponsive}
        swipeable={false}
        draggable={false}
        showDots={false}
        ssr={false}
        infinite={false}
        autoPlay={false}
        customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
        customRightArrow={<CustomRightArrow onClick={() => {}} />}
      >
        <TravelLogCard />
        <TravelLogCard />
        <TravelLogCard />
        <TravelLogCard />
      </Carousel>
    </>
  );
}

const HomeTitle = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 85px;

  color: ${(props) => props.theme.color.gray900};
  font-size: 24px;
  font-weight: 700;
`;

const InputBox = styled.div`
  margin: 31px 0 103px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselTitle = styled.div`
  color: ${(props) => props.theme.color.gray900};
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 24px 0;
  display: flex;
  align-items: center;

  & > div:first-child {
    display: flex;
    margin-left: 30px;
    align-items: center;
    gap: 14px;

    & > span {
      color: ${(props) => props.theme.color.gray300};
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
    }
  }

  & > div:last-child {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > span {
      color: ${(props) => props.theme.color.gray300};
      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
    }
  }
`;

const CustomArrow = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;

  position: absolute;
`;
