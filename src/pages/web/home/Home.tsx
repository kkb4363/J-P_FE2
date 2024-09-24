import styled from "styled-components";
import CustomInput from "../../../components/mobile/CustomInput";
import CardSlide from "../../../components/web/home/CardSlide";
import TravelogueCardSlide from "../../../components/web/home/TravelogueCardSlide";

export default function Home() {
  const bigResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 4,
      slidesToSlide: 4,
    },
  };

  const smallResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
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
      <TravelogueCardSlide responsive={smallResponsive} isReviewCard={false} />

      <CarouselTitle>
        지금 뜨는 리뷰
        <div>
          <span>인기순</span>
          <span>최신순</span>
        </div>
        <div>
          <span>더보기</span>
        </div>
      </CarouselTitle>
      <TravelogueCardSlide responsive={smallResponsive} isReviewCard={true} />
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
