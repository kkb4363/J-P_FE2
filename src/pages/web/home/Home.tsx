import styled from "styled-components";
import CustomInput from "../../../components/mobile/CustomInput";
import Slider from "react-slick";
import testImg from "../../../assets/images/testImg.png";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { placeApiProps } from "../../../types/home";

function SampleNextArrow() {
  return <div style={{ display: "block", background: "red" }} />;
}

export default function Home() {
  const [travelPlace, setTravelPlace] = useState([]);
  // 인기 도시
  const [city, setCity] = useState([]);
  // 테마별 여행지
  const [themePlace, setThemePlace] = useState([]);
  // 지금 뜨는 리뷰
  const [review, setReview] = useState([]);

  const [loading, setLoading] = useState(true);
  // TODO : 사람들이 찜한 여행기 api = 아직 백엔드 개발 중

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    draggable: false,
    arrows: true,
  };

  useEffect(() => {
    const requestApi = async () => {
      try {
        const [travelPlaceRes, cityRes, themePlaceRes, reviewRes] =
          await Promise.all([
            axiosInstance.get("/place/page?page=1&placeType=TRAVEL_PLACE"),
            axiosInstance.get("/place/page?page=1&placeType=CITY"),
            axiosInstance.get("/place/page?page=1&placeType=THEME"),
            axiosInstance.get("/reviews?page=1&sort=NEW"),
          ]);

        if (travelPlaceRes.status === 200) {
          setTravelPlace(travelPlaceRes.data.data);
        }
        if (cityRes.status === 200) {
          setCity(cityRes.data.data);
        }
        if (themePlaceRes.status === 200) {
          setThemePlace(themePlaceRes.data.data);
        }
        if (reviewRes.status === 200) {
          setReview(reviewRes.data.data);
        }
      } catch (error) {
        console.error("api error=", error);
      } finally {
        setLoading(false);
      }
    };

    requestApi();
  }, []);

  console.log(travelPlace);
  return (
    <>
      <HomeTitle>어디로 떠날까요?</HomeTitle>

      <InputBox>
        <CustomInput text="여행지를 입력해주세요" value="" width="500px" />
      </InputBox>

      <CarouselTitle>지금 가장 인기있는 여행지</CarouselTitle>
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

const CarouselTitle = styled.p`
  color: ${(props) => props.theme.color.gray900};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const CarouselBox = styled.div`
  display: flex;
  flex-direction: column;

  & > img {
    min-width: 270px;
    min-height: 240px;
    width: 95%;
    border-radius: 16px;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.08),
      2px 2px 20px 0px rgba(0, 0, 0, 0.06);
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 20px;
    font-weight: 700;
    margin: 14px 0 4px 0;
  }

  & > span {
    color: ${(props) => props.theme.color.gray600};
    font-size: 16px;
    font-weight: 700;
  }
`;
