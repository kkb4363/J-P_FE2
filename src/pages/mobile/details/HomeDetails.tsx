import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";
import { ReviewTag, ReviewTagRow } from "../../../assets/styles/home.style";
import { useEffect, useState } from "react";
import StarIcon from "../../../assets/icons/StarIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPlaceDetail,
  getReviews,
  getSurroundingPlace,
} from "../../../utils/axios";
import {
  NearByPlaceProps,
  PlaceDetailAPiProps,
} from "../../../types/home.details";
import { reviewApiProps } from "../../../types/home";
import { useMapStore } from "../../../store/map.store";
import * as S from "../../../assets/styles/homeDetail.style";
import { testImg2 } from "../../../utils/staticDatas";
import EditIcon from "../../../assets/icons/EditIcon";
import CustomSkeleton from "../../../components/CustomSkeleton";
import CreateScheduleSheet from "../../../components/mobile/bottomSheets/CreateScheduleSheet";
import styled from "styled-components";
import Slider from "react-slick";
import SurroundingPlaceCard from "../../../components/mobile/home/SurroundingPlaceCard";
import TitleMoreBox from "../../../components/mobile/home/TitleMoreBox";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import useImgLoading from "../../../hooks/useImgLoading";
import LikeCommentBox from "../../../components/LikeCommentBox";

export default function HomeDetails() {
  const navigate = useNavigate();
  const param = useParams();
  const { clear } = useMapStore();
  const isCityDetailPage = location.pathname.includes("city");
  const [imageIndex, setImageIndex] = useState<number>(0);
  const imageSliderSetting = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setImageIndex(next),
  };
  const [details, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [nearbyPlaces, setNearbyPlaces] = useState<NearByPlaceProps[]>([]);
  const [reviews, setReviews] = useState<reviewApiProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [addScheduleState, setAddScheduleState] = useState(false);
  const { loading: imgLoading } = useImgLoading({
    imgSrc: details?.photoUrls?.[0],
  });

  const getDetail = async () => {
    getPlaceDetail({ placeId: param.placeId + "" }).then((res) => {
      setDetails(res?.data);
      setLoading(false);
    });
  };

  const getReview = async () => {
    getReviews({ placeId: param.placeId + "" }).then((res) => {
      setReviews(res?.data.data);
    });
  };

  const getNearPlace = async () => {
    getSurroundingPlace({
      lat: details?.location.lat + "",
      lng: details?.location.lng + "",
    }).then((res) => {
      setNearbyPlaces(res?.data.results);
    });
  };

  useEffect(() => {
    if (param?.placeId) {
      getDetail();
      getReview();
    }
  }, [param?.placeId]);

  useEffect(() => {
    if (details?.id) {
      getNearPlace();
    }
  }, [details?.id]);

  return (
    <>
      <S.HomeDetailsContainer>
        {imgLoading ? (
          <CustomSkeleton height="250px" />
        ) : (
          <S.DetailsImageBox>
            <StyledSlider {...imageSliderSetting}>
              {details?.photoUrls?.map((img, idx) => (
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

            <S.LikeBox>
              <HeartIcon />
            </S.LikeBox>

            <S.ImagePageIndicatorBox>
              <span>
                {imageIndex + 1} / {details?.photoUrls.length}
              </span>
            </S.ImagePageIndicatorBox>
          </S.DetailsImageBox>
        )}

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

              {!loading && (
                <CustomGoogleMap
                  width="100%"
                  height="146px"
                  lat={details?.location.lat}
                  lng={details?.location.lng}
                />
              )}
            </>
          )}

          <TitleMoreBox
            title="주변 여행지 추천"
            handleClick={() => navigate(`/nearby/${param?.placeId}`)}
          />

          <S.NearPlaceCol>
            {nearbyPlaces.length === 0
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CustomSkeleton
                    key={index}
                    height="83px"
                    borderRadius="16px"
                  />
                ))
              : nearbyPlaces?.slice(0, 3).map((place) => (
                  <SurroundingPlaceCard
                    handleDetails={() =>
                      navigate(`/nearby/${place.placeId}`, {
                        state: {
                          selectedPlaceId: place.placeId,
                        },
                      })
                    }
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
              {reviews.length === 0 ? (
                <div onClick={() => navigate("/writeReview")}>
                  <EditIcon />
                </div>
              ) : (
                <span
                  onClick={() => navigate(`/home/reviews/${param?.placeId}`)}
                >
                  더보기
                </span>
              )}
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
                  <LikeCommentBox
                    likeCnt={review.likeCnt}
                    commentCnt={review.commentCnt}
                  />
                </S.DetailsReviewBox>
              ))}
            </S.DetailsReviewRow>
          )}

          <S.AddScheduleBox>
            <S.AddScheduleButton onClick={() => setAddScheduleState(true)}>
              <PlusIcon stroke="#fff" />
              <span>일정 추가</span>
            </S.AddScheduleButton>
          </S.AddScheduleBox>
        </S.DetailsBody>
      </S.HomeDetailsContainer>

      {addScheduleState && (
        <CreateScheduleSheet handleClose={() => setAddScheduleState(false)} />
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
