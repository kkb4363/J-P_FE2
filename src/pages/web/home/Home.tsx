import styled from "styled-components";
import CustomInput from "../../../components/CustomInput";
import CardSlide from "../../../components/web/home/CardSlide";
import TravelogueCardSlide from "../../../components/web/home/TravelogueCardSlide";
import { useNavigate } from "react-router-dom";
import { HomeTabType, useDisplayStore } from "../../../store/display.store";

const responsive4 = {
  desktop: {
    breakpoint: { max: 3000, min: 464 },
    items: 4,
    slidesToSlide: 4,
  },
};

const responsive3 = {
  desktop: {
    breakpoint: { max: 3000, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
};

export default function Home() {
  const navigate = useNavigate();
  const { setHomeTab } = useDisplayStore();

  const handleMore = (t: HomeTabType) => {
    setHomeTab(t);
    navigate("/home/more");
  };
  return (
    <>
      <HomeTitle>어디로 떠날까요?</HomeTitle>

      <InputBox>
        <CustomInput
          text="여행지를 입력해주세요"
          value={""}
          width="500px"
          onClick={() => navigate("search")}
          onChange={() => {}}
        />
      </InputBox>

      <CarouselTitle>
        지금 가장 인기있는 여행지
        <div>
          <span onClick={() => handleMore("TRAVEL_PLACE")}>더보기</span>
        </div>
      </CarouselTitle>
      <CardSlide
        responsive={responsive4}
        placeType="TRAVEL_PLACE"
        title={true}
        subTitle={true}
      />

      <CarouselTitle>
        인기 여행 도시 추천
        <div>
          <span onClick={() => handleMore("CITY")}>더보기</span>
        </div>
      </CarouselTitle>
      <CardSlide responsive={responsive4} placeType="CITY" bottomText={true} />

      <CarouselTitle>
        지금 가면 좋은 여행지
        <div>
          <span onClick={() => handleMore("THEME")}>더보기</span>
        </div>
      </CarouselTitle>
      <CardSlide
        responsive={responsive4}
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
      <TravelogueCardSlide responsive={responsive3} isReviewCard={false} />

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
      <TravelogueCardSlide responsive={responsive3} isReviewCard={true} />
    </>
  );
}

export const HomeTitle = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 85px;

  color: ${(props) => props.theme.color.gray900};
  font-size: 24px;
  font-weight: 700;
`;

export const InputBox = styled.div`
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
