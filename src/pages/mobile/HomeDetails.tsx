import styled from "styled-components";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import HeartIcon from "../../assets/icons/HeartIcon";
import Carousel from "react-material-ui-carousel";
import MarkIcon from "../../assets/icons/MarkIcon";
import {
  ReviewTag,
  ReviewTagRow,
  scrollHidden,
} from "../../assets/styles/home.style";
import { useEffect, useRef, useState } from "react";
import StarIcon from "../../assets/icons/StarIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import CommentIcon from "../../assets/icons/CommentIcon";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import {
  NearByPlaceProps,
  PlaceDetailAPiProps,
} from "../../types/home.details";
import NearPlaceCard from "../../components/mobile/NearPlaceCard";

export default function HomeDetails() {
  const navigate = useNavigate();
  const param = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const [details, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [nearbyPlaces, setNearbyPlaces] = useState<NearByPlaceProps[]>([]);

  const isCityDetailPage = location.pathname.includes("city");

  useEffect(() => {
    const requestApi = async () => {
      try {
        const [detailsRes, reviewsRes] = await Promise.all([
          axiosInstance.get(`/place/details/${param?.placeId}`),
          axiosInstance.get(
            `/reviews?page=1&sort=HOT&placeId=${param?.placeId}`
          ),
        ]);

        if (detailsRes.status === 200) {
          setDetails(detailsRes.data);
        }
        if (reviewsRes.status === 200) {
          console.log(reviewsRes.data);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    requestApi();
  }, [param?.placeId]);

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      const existingScript = document.getElementById("google-maps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&callback=initMap`;
        script.id = "google-maps";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if ((window as any).google) {
            initMap();
          }
        };
      } else {
        if ((window as any).google) {
          initMap();
        }
      }
    };

    const getNearPlace = async () => {
      try {
        if (details?.location) {
          axiosInstance
            .get(
              `/googleplace/nearby-search/page?lat=${details?.location.lat}&lng=${details?.location.lng}&radius=10`
            )
            .then((res) => {
              if (res.status === 200) {
                setNearbyPlaces(res.data.results);
              }
            });
        }
      } catch (error) {
        console.error("nearbyPlace Api Error=", error);
      }
    };

    const initMap = () => {
      if (mapRef.current && details?.location) {
        const map = new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: details.location.lat, lng: details.location.lng },
          zoom: 16,
        });

        const marker = new (window as any).google.maps.Marker({
          position: { lat: details.location.lat, lng: details.location.lng },
          map: map,
          title: details.name,
        });

        console.log("Google Maps init");
      }
    };

    if (details) {
      loadGoogleMapsScript();
      getNearPlace();
    }
  }, [details]);

  return (
    <HomeDetailsContainer>
      <Carousel
        cycleNavigation={true}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        autoPlay={false}
        swipe={true}
      >
        {details?.photoUrls?.map((img, idx) => (
          <DetailsImageBox key={idx}>
            <img src={img} alt={img} />

            <ArrowLeftBox onClick={() => navigate(-1)}>
              <ArrowLeftIcon stroke="#fff" />
            </ArrowLeftBox>

            <LikeBox>
              <HeartIcon />
            </LikeBox>

            <ImagePageIndicatorBox>
              <span>
                {idx + 1} / {details?.photoUrls.length}
              </span>
            </ImagePageIndicatorBox>
          </DetailsImageBox>
        ))}
      </Carousel>

      <DetailsBody>
        <DetailsTitle>
          <MarkIcon />
          {details?.name}
        </DetailsTitle>

        <ReviewTagRow>
          {details?.tags?.map((tag) => (
            <ReviewTag key={tag}>
              <span>#{tag}</span>
            </ReviewTag>
          ))}
        </ReviewTagRow>

        <DetailsInfo>{details?.description}</DetailsInfo>

        {!isCityDetailPage && (
          <>
            <DetailsTitle>기본 정보</DetailsTitle>
            <DetailsSubTitle>
              <MarkIcon width="18" height="18" />
              <span>{details?.formattedAddress}</span>
            </DetailsSubTitle>

            <GoogleMapBox ref={mapRef} />
          </>
        )}

        <DetailsTitleWithMoreText>
          주변 여행지 추천
          <span>지도로 보기</span>
          <MoreTextAbsolute
            onClick={() => navigate(`/home/nearby/${param?.placeId}`)}
          >
            더보기
          </MoreTextAbsolute>
        </DetailsTitleWithMoreText>

        <NearPlaceCol>
          {nearbyPlaces?.slice(0, 3).map((place) => (
            <NearPlaceCard
              key={place.placeId}
              placeId={place.placeId}
              photoUrl={place.photoUrls[0]}
              name={place.name}
              rating={place.rating}
            />
          ))}
        </NearPlaceCol>

        <DetailsTitleWithMoreText>
          리뷰
          <MoreTextAbsolute>더보기</MoreTextAbsolute>
        </DetailsTitleWithMoreText>

        <DetailsReviewRow>
          <DetailsReviewBox>
            <ReviewTitle>
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/4de5/c6cd/4d2c94956b12da010b7b99e5d5a92224?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lZ2c4t3VMX6f294Wf7WfbN8I3w1F8kPIYESWvv8AExhb8e3~KJyk51jjkqmg4SZJhqj5fuQwcXlFyGrHgbAho7~Ayb5dB2Si3~m4ymVzHrkQZYRmaiwXOMPoCY~fgwBT3rMYUbv8EVQ56-mzMpqthcFNoUv7bOmPKDq7v~OHIWJfFonhH4R4NC9L3n53aSUs5qXuEuG-qku7vQltRVE-oTzyrYzpbVYTDkzP~E3qgo~0-UZHPTzbThN1rlaDqUUUXSma9lpze94lezKHpvrRm0DhkPvyfbSSVdWswiodrO7eWUTH33uQv2RIYJiLbxckUlwsv5Bmhgdzm5YAVJrHGw__"
                  alt="test"
                />
                <span>Jiyoo | </span>
                <span>24.4.1</span>
              </div>
              <div>
                <StarIcon />
                <span>4.8</span>
              </div>
            </ReviewTitle>
            <ReviewInfo>
              <span>
                드라이브, 산책 코스로 딱 좋았던 섬진강길 벚꽃길은 구례부터
                하동까지 쭉 이어져있는데 만개했을깨 벚꽃 터널을 드라이브 하면
                너무 좋아요. 
              </span>
            </ReviewInfo>
            <ReviewMessageRow>
              <HeartIcon />
              <span>12</span>
              <CommentIcon />
              <span>2</span>
            </ReviewMessageRow>
          </DetailsReviewBox>
          <DetailsReviewBox>
            <ReviewTitle>
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/4de5/c6cd/4d2c94956b12da010b7b99e5d5a92224?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lZ2c4t3VMX6f294Wf7WfbN8I3w1F8kPIYESWvv8AExhb8e3~KJyk51jjkqmg4SZJhqj5fuQwcXlFyGrHgbAho7~Ayb5dB2Si3~m4ymVzHrkQZYRmaiwXOMPoCY~fgwBT3rMYUbv8EVQ56-mzMpqthcFNoUv7bOmPKDq7v~OHIWJfFonhH4R4NC9L3n53aSUs5qXuEuG-qku7vQltRVE-oTzyrYzpbVYTDkzP~E3qgo~0-UZHPTzbThN1rlaDqUUUXSma9lpze94lezKHpvrRm0DhkPvyfbSSVdWswiodrO7eWUTH33uQv2RIYJiLbxckUlwsv5Bmhgdzm5YAVJrHGw__"
                  alt="test"
                />
                <span>Jiyoo | </span>
                <span>24.4.1</span>
              </div>
              <div>
                <StarIcon />
                <span>4.8</span>
              </div>
            </ReviewTitle>
            <ReviewInfo>
              <span>
                드라이브, 산책 코스로 딱 좋았던 섬진강길 벚꽃길은 구례부터
                하동까지 쭉 이어져있는데 만개했을깨 벚꽃 터널을 드라이브 하면
                너무 좋아요. 
              </span>
            </ReviewInfo>
            <ReviewMessageRow>
              <HeartIcon />
              <span>12</span>
              <CommentIcon />
              <span>2</span>
            </ReviewMessageRow>
          </DetailsReviewBox>
          <DetailsReviewBox>
            <ReviewTitle>
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/4de5/c6cd/4d2c94956b12da010b7b99e5d5a92224?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lZ2c4t3VMX6f294Wf7WfbN8I3w1F8kPIYESWvv8AExhb8e3~KJyk51jjkqmg4SZJhqj5fuQwcXlFyGrHgbAho7~Ayb5dB2Si3~m4ymVzHrkQZYRmaiwXOMPoCY~fgwBT3rMYUbv8EVQ56-mzMpqthcFNoUv7bOmPKDq7v~OHIWJfFonhH4R4NC9L3n53aSUs5qXuEuG-qku7vQltRVE-oTzyrYzpbVYTDkzP~E3qgo~0-UZHPTzbThN1rlaDqUUUXSma9lpze94lezKHpvrRm0DhkPvyfbSSVdWswiodrO7eWUTH33uQv2RIYJiLbxckUlwsv5Bmhgdzm5YAVJrHGw__"
                  alt="test"
                />
                <span>Jiyoo | </span>
                <span>24.4.1</span>
              </div>
              <div>
                <StarIcon />
                <span>4.8</span>
              </div>
            </ReviewTitle>
            <ReviewInfo>
              <span>
                드라이브, 산책 코스로 딱 좋았던 섬진강길 벚꽃길은 구례부터
                하동까지 쭉 이어져있는데 만개했을깨 벚꽃 터널을 드라이브 하면
                너무 좋아요. 
              </span>
            </ReviewInfo>
            <ReviewMessageRow>
              <HeartIcon />
              <span>12</span>
              <CommentIcon />
              <span>2</span>
            </ReviewMessageRow>
          </DetailsReviewBox>
        </DetailsReviewRow>

        <AddScheduleBox>
          <AddScheduleButton>
            <PlusIcon stroke="#fff" />
            <span>일정 추가</span>
          </AddScheduleButton>
        </AddScheduleBox>
      </DetailsBody>
    </HomeDetailsContainer>
  );
}

const HomeDetailsContainer = styled.div`
  width: 360px;
  height: 100%;
  overflow-y: scroll;
  ${scrollHidden};
  position: relative;
`;

const DetailsImageBox = styled.div`
  width: 100%;
  min-height: 250px;
  position: relative;

  & > img {
    width: 100%;
    height: 250px;
  }
`;

const ArrowLeftBox = styled.div`
  position: absolute;
  left: 18px;
  top: 38px;
`;

const LikeBox = styled.div`
  position: absolute;
  right: 18px;
  top: 38px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.06));
  opacity: 0.9;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePageIndicatorBox = styled.div`
  position: absolute;
  right: 25px;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  width: 32px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: #000;
    text-align: center;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;

const DetailsBody = styled.div`
  padding: 6px 16px 16px 16px;
`;

const DetailsTitle = styled.h1`
  display: flex;
  align-items: center;
  margin: 18px 0 8px 0;

  color: #1a1a1a;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const DetailsInfo = styled.div`
  color: #1a1a1a;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.048px;
  margin: 8px 0;
`;

const DetailsSubTitle = styled.p`
  display: flex;
  align-items: center;
  & > span {
    color: #4d4d4d;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
  }
`;

const GoogleMapBox = styled.div`
  width: 100%;
  height: 146px;
  margin: 8px 0;
  border-radius: 16px;
`;

const DetailsTitleWithMoreText = styled(DetailsTitle)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    color: #4d4d4d;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const MoreText = styled.span`
  color: #b8b8b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const MoreTextAbsolute = styled(MoreText)`
  position: absolute;
  right: 0;
`;

const NearPlaceCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 6px 0;
`;

const DetailsReviewRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 134px;
  overflow-x: scroll;
  ${scrollHidden};
`;

const DetailsReviewBox = styled.div`
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  background: #fff;
  height: 134px;
  width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
`;

const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 4px;

    & > img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    & > span:last-child {
      color: #808080;
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }

    & > span:first-child {
      color: #1a1a1a;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }
  }

  & > div:last-child {
    display: flex;
    gap: 4px;
    align-items: center;

    & > span {
      color: #808080;
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }
  }
`;

const ReviewInfo = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 221px;
  height: 40px;
  justify-content: center;
  align-items: center;

  & > span {
    color: #1a1a1a;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const ReviewMessageRow = styled.div`
  display: flex;
  gap: 4px;
  & > span {
    color: #808080;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const AddScheduleBox = styled.div`
  padding: 29px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddScheduleButton = styled.button`
  border-radius: 30px;
  background: #ffc814;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;

  & > span {
    color: #fff;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.6px;
  }
`;
