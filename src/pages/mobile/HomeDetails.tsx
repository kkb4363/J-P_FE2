import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import HeartIcon from "../../assets/icons/HeartIcon";
import Carousel from "react-material-ui-carousel";
import MarkIcon from "../../assets/icons/MarkIcon";
import { ReviewTag, ReviewTagRow } from "../../assets/styles/home.style";
import { useEffect, useRef, useState } from "react";
import StarIcon from "../../assets/icons/StarIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import CommentIcon from "../../assets/icons/CommentIcon";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import {
  NearByPlaceProps,
  PlaceDetailAPiProps,
  ReviewProps,
} from "../../types/home.details";
import { useMapStore } from "../../store/map.store";
import ImageView from "../../components/mobile/ImageView";
import ActionButton from "../../components/mobile/ActionButton";
import * as S from "../../assets/styles/homeDetail.style";
import { testImg2 } from "../../utils/staticDatas";
import EditIcon from "../../assets/icons/EditIcon";

interface Props {
  photoUrl: string;
  name: string;
  rating: number;
  handleClick?: () => void;
  height?: string;
}

export default function HomeDetails() {
  const navigate = useNavigate();
  const param = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const { clear } = useMapStore();
  const [details, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [nearbyPlaces, setNearbyPlaces] = useState<NearByPlaceProps[]>([]);
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

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
          setReviews(reviewsRes.data.data);
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
        if ((window as any).google && details?.location) {
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
      if (mapRef.current) {
        const map = new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: details.location.lat, lng: details.location.lng },
          zoom: 16,
        });

        const marker = new (window as any).google.maps.Marker({
          position: { lat: details.location.lat, lng: details.location.lng },
          map: map,
          title: details.name,
        });
      }
    };

    if (details) {
      loadGoogleMapsScript();
      getNearPlace();
    }
  }, [details]);

  console.log(reviews);

  return (
    <S.HomeDetailsContainer>
      <Carousel
        cycleNavigation={true}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        autoPlay={false}
        swipe={true}
      >
        {details?.photoUrls?.map((img, idx) => (
          <S.DetailsImageBox key={idx}>
            <img src={img} alt={img} />

            <S.ArrowLeftBox
              onClick={() => {
                navigate(-1);
                clear();
              }}
            >
              <ArrowLeftIcon stroke="#fff" />
            </S.ArrowLeftBox>

            <S.LikeBox>
              <HeartIcon />
            </S.LikeBox>

            <S.ImagePageIndicatorBox>
              <span>
                {idx + 1} / {details?.photoUrls.length}
              </span>
            </S.ImagePageIndicatorBox>
          </S.DetailsImageBox>
        ))}
      </Carousel>

      <S.DetailsBody>
        <S.DetailsTitle>
          <MarkIcon />
          {details?.name}
        </S.DetailsTitle>

        <ReviewTagRow>
          {details?.tags?.map((tag) => (
            <ReviewTag key={tag}>
              <span>#{tag}</span>
            </ReviewTag>
          ))}
        </ReviewTagRow>

        <S.DetailsInfo>{details?.description}</S.DetailsInfo>

        {!isCityDetailPage && (
          <>
            <S.DetailsTitle>기본 정보</S.DetailsTitle>
            <S.DetailsSubTitle>
              <MarkIcon width="18" height="18" />
              <span>{details?.formattedAddress}</span>
            </S.DetailsSubTitle>

            <S.GoogleMapBox ref={mapRef} />
          </>
        )}

        <S.DetailsTitleWithMoreText>
          주변 여행지 추천
          <span>지도로 보기</span>
          <S.MoreTextAbsolute
            onClick={() => navigate(`/home/nearby/${param?.placeId}`)}
          >
            더보기
          </S.MoreTextAbsolute>
        </S.DetailsTitleWithMoreText>

        <S.NearPlaceCol>
          {nearbyPlaces?.slice(0, 3).map((place) => (
            <NearPlaceCard
              key={place.placeId}
              photoUrl={place.photoUrls[0]}
              name={place.name}
              rating={place.rating}
            />
          ))}
        </S.NearPlaceCol>

        <S.DetailsTitleWithMoreText>
          리뷰
          <S.MoreTextAbsolute>
            {reviews.length === 0 ? <EditIcon /> : "더보기"}
          </S.MoreTextAbsolute>
        </S.DetailsTitleWithMoreText>

        {reviews.length === 0 ? (
          <S.DetailsNoReview>
            <span>첫 리뷰를 남겨주세요!</span>
          </S.DetailsNoReview>
        ) : (
          <S.DetailsReviewRow>
            {reviews?.map((review) => (
              <S.DetailsReviewBox key={review.id}>
                <S.ReviewTitle>
                  <div>
                    <img src={testImg2} alt="user-img" />
                    <span>{review.userCompactResDto.nickname} | </span>
                    <span>24.4.1</span>
                  </div>
                  <div>
                    <StarIcon />
                    <span>{review.star}</span>
                  </div>
                </S.ReviewTitle>
                <S.ReviewInfo>
                  <span>{review.content}</span>
                </S.ReviewInfo>
                <S.ReviewMessageRow>
                  <HeartIcon />
                  <span>{review.likeCnt}</span>
                  <CommentIcon />
                  <span>{review.commentCnt}</span>
                </S.ReviewMessageRow>
              </S.DetailsReviewBox>
            ))}
          </S.DetailsReviewRow>
        )}

        <S.AddScheduleBox>
          <S.AddScheduleButton>
            <PlusIcon stroke="#fff" />
            <span>일정 추가</span>
          </S.AddScheduleButton>
        </S.AddScheduleBox>
      </S.DetailsBody>
    </S.HomeDetailsContainer>
  );
}

function NearPlaceCard({ photoUrl, name, rating, height = "83px" }: Props) {
  return (
    <S.NearPlaceBox $height={height}>
      <ImageView width="60px" height="60px" src={photoUrl} alt={name} />

      <S.NearPlaceDetailCol>
        <p>{name}</p>

        <div>
          <StarIcon />
          {rating} | <span>주소보기</span>
        </div>
      </S.NearPlaceDetailCol>

      <ActionButton>
        <PlusIcon />
        <span>추가</span>
      </ActionButton>
    </S.NearPlaceBox>
  );
}
