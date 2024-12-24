import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import styled from "styled-components";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import { ReviewTag, ReviewTagRow } from "../../../assets/styles/home.style";
import * as S from "../../../assets/styles/homeDetail.style";
import CustomSkeleton from "../../../components/CustomSkeleton";
import TravelPlaceAddSheet from "../../../components/mobile/bottomSheets/TravelPlaceAddSheet";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import SurroundingPlaceCard from "../../../components/mobile/home/SurroundingPlaceCard";
import TitleMoreBox from "../../../components/mobile/home/TitleMoreBox";
import useImgLoading from "../../../hooks/useImgLoading";
import {
  getAllDiaries,
  getPlaceDetail,
  getReviews,
  getSurroundingPlace,
  setLike,
} from "../../../service/axios";
import { useMapStore } from "../../../store/map.store";
import { ReviewProps, TravelogProps } from "../../../types/travelreview";
import { GooglePlaceProps, PlaceDetailAPiProps } from "../../../types/place";
import { useWriteReviewStore } from "../../../store/writeReview.store";
import { useReviewStore } from "../../../store/travelReview.store";
import ReviewCard from "../../../components/mobile/detail/ReviewCard";
import TripCard from "../../../components/mobile/detail/TripCard";
import EditIcon from "../../../assets/icons/EditIcon";

const cookies = new Cookies();

export default function HomeDetails() {
  const navigate = useNavigate();
  const param = useParams();
  const { clear } = useMapStore();

  const [imgIdx, setImgIdx] = useState<number>(0);
  const imgSliderSetting = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setImgIdx(next),
  };

  const [placeInfo, setPlaceInfo] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [surroundingPlaces, setSurroundingPlaces] = useState<
    GooglePlaceProps[]
  >([]);

  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectPlaceId, setSelectPlaceId] = useState("");
  const [recommendedTrips, setRecommendedTrips] = useState<TravelogProps[]>([]);
  console.log(placeInfo);
  console.log(recommendedTrips);
  const { loading: imgLoading } = useImgLoading({
    imgSrc: placeInfo?.photoUrls?.[0],
  });

  const getPlaceInfo = async () => {
    getPlaceDetail({ placeId: param.placeId + "" }).then((res) => {
      setPlaceInfo(res?.data);
      setIsLoading(false);
    });
  };

  const getReview = async () => {
    getReviews({ page: 1, sort: "HOT", placeId: param.placeId + "" }).then(
      (res) => {
        setReviews(res?.data.data);
      }
    );
  };

  const getRecommendedTrips = () => {
    getAllDiaries(1, "HOT", param?.placeId).then((res) => {
      if (res) setRecommendedTrips(res?.data?.data);
    });
  };

  const getNearPlace = async () => {
    getSurroundingPlace({
      lat: placeInfo?.location.lat + "",
      lng: placeInfo?.location.lng + "",
    }).then((res) => {
      setSurroundingPlaces(res?.data.results);
    });
  };

  const handleHeartClick = () => {
    if (!cookies.get("userToken")) {
      return toast(<span>로그인이 필요합니다.</span>);
    } else if (placeInfo?.id) {
      setLike({
        actionType: "BOOKMARK",
        targetType: "PLACE",
        id: placeInfo?.placeId,
      }).then(() => {
        getPlaceInfo();
      });
    }
  };

  const handlePlaceAddBtnClick = (placeId: string) => {
    if (!cookies.get("userToken")) {
      return toast(<span>로그인이 필요합니다.</span>);
    }

    setSelectPlaceId(placeId);
  };

  useEffect(() => {
    if (param?.placeId) {
      getPlaceInfo();
      getReview();
      getRecommendedTrips();
    }
  }, [param?.placeId]);

  useEffect(() => {
    if (placeInfo?.id) {
      getNearPlace();
    }
  }, [placeInfo?.id]);

  const writeReviewStore = useWriteReviewStore();
  const reviewStore = useReviewStore();
  const handleReviewWrite = () => {
    writeReviewStore.setSelectedPlace(placeInfo?.placeId);
    writeReviewStore.setSelectedPlace(placeInfo?.name);
    navigate("/writeReview");
  };

  const handleReviewTripMore = () => {
    if (placeInfo?.placeType === "CITY") {
      reviewStore.setIsReview(false);
      navigate("/home/travelReview");
    } else {
      navigate(`/home/reviews/${param?.placeId}`);
    }
  };

  return (
    <>
      <S.HomeDetailsContainer>
        {imgLoading ? (
          <CustomSkeleton height="250px" />
        ) : (
          <S.DetailsImageBox>
            <StyledSlider {...imgSliderSetting}>
              {placeInfo?.photoUrls?.map((img, idx) => (
                <img aria-placeholder="loading" src={img} alt={img} key={idx} />
              ))}
            </StyledSlider>

            <S.ArrowLeftBox
              onClick={() => {
                navigate(-1);
                clear();
              }}
            >
              <ArrowLeftIcon stroke="#fff" />
            </S.ArrowLeftBox>

            <S.LikeBox onClick={handleHeartClick}>
              <HeartIcon
                stroke={placeInfo?.isLiked ? "#FF5757" : "#b8b8b8"}
                fill={placeInfo?.isLiked ? "#FF5757" : "none"}
              />
            </S.LikeBox>

            <S.ImagePageIndicatorBox>
              <span>
                {imgIdx + 1} / {placeInfo?.photoUrls.length}
              </span>
            </S.ImagePageIndicatorBox>
          </S.DetailsImageBox>
        )}

        <S.DetailsBody>
          <S.DetailsTitle>
            <MarkIcon />
            {placeInfo?.name}
          </S.DetailsTitle>

          <ReviewTagRow>
            {placeInfo?.tags?.map((tag) => (
              <ReviewTag key={tag}>
                <span>#{tag}</span>
              </ReviewTag>
            ))}
          </ReviewTagRow>

          <S.DetailsInfo>{placeInfo?.description}</S.DetailsInfo>

          {placeInfo?.placeType === "TRAVEL_PLACE" && (
            <>
              <S.DetailsTitle>기본 정보</S.DetailsTitle>
              <S.DetailsSubTitle>
                <MarkIcon width="18" height="18" />
                <span>{placeInfo?.formattedAddress}</span>
              </S.DetailsSubTitle>

              {!isLoading && (
                <CustomGoogleMap
                  width="100%"
                  height="146px"
                  lat={placeInfo?.location.lat}
                  lng={placeInfo?.location.lng}
                />
              )}
            </>
          )}

          <TitleMoreBox
            title="주변 여행지 추천"
            handleClick={() => navigate(`/nearby/${param?.placeId}`)}
          />

          <S.NearPlaceCol>
            {surroundingPlaces.length === 0
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CustomSkeleton
                    key={index}
                    height="83px"
                    borderRadius="16px"
                  />
                ))
              : surroundingPlaces?.slice(0, 3).map((place) => (
                  <SurroundingPlaceCard
                    handleDetails={() =>
                      navigate(`/nearby/${place.placeId}`, {
                        state: {
                          selectedPlaceId: place.placeId,
                        },
                      })
                    }
                    key={place.placeId}
                    photoUrl={place.photoUrl}
                    name={place.name}
                    rating={place.rating}
                    handleClick={() => handlePlaceAddBtnClick(place.placeId)}
                  />
                ))}
          </S.NearPlaceCol>

          <S.DetailsTitleWithMoreText>
            {placeInfo?.placeType === "CITY" ? "여행기" : "리뷰"}
            <S.MoreTextAbsolute>
              <span onClick={handleReviewTripMore}>더보기</span>
            </S.MoreTextAbsolute>
          </S.DetailsTitleWithMoreText>

          {placeInfo?.placeType !== "CITY" && reviews.length === 0 ? (
            <S.DetailsNoReview>
              <span>첫 리뷰를 남겨주세요 😀</span>
              <div onClick={handleReviewWrite}>
                <EditIcon stroke="#b8b8b8" width="24" height="24" />
              </div>
            </S.DetailsNoReview>
          ) : (
            <S.DetailsReviewRow>
              {reviews?.map((review, idx) => (
                <ReviewCard item={review} key={idx} />
              ))}

              {placeInfo?.placeType === "CITY" &&
                recommendedTrips?.map((r, i) => <TripCard key={i} item={r} />)}
            </S.DetailsReviewRow>
          )}

          {(placeInfo?.placeType === "TRAVEL_PLACE" ||
            placeInfo?.placeType === "THEME") && (
            <S.AddScheduleBox>
              <S.AddScheduleButton
                onClick={() => handlePlaceAddBtnClick(placeInfo?.placeId)}
              >
                <PlusIcon stroke="#fff" />
                <span>여행지 추가</span>
              </S.AddScheduleButton>
            </S.AddScheduleBox>
          )}
        </S.DetailsBody>
      </S.HomeDetailsContainer>

      {!!selectPlaceId && (
        <TravelPlaceAddSheet
          handleClose={() => setSelectPlaceId("")}
          placeId={selectPlaceId}
        />
      )}
    </>
  );
}

const StyledSlider = styled(Slider)`
  .slick-list {
    height: 250px !important;
    object-fit: contain;
    display: flex;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-prev {
    left: 6px;
    z-index: 999;
  }
  .slick-next {
    right: 6px;
    z-index: 999;
  }
  .slick-slide {
    & > div > img {
      height: 250px !important;
    }
  }
`;
