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
  setLike,
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
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

const cookies = new Cookies();

export default function HomeDetails() {
  const navigate = useNavigate();
  const param = useParams();
  const { clear } = useMapStore();

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
  const [detail, setDetail] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [nearbyPlaces, setNearbyPlaces] = useState<NearByPlaceProps[]>([]);
  const [reviews, setReviews] = useState<reviewApiProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [addPlaceId, setAddPlaceId] = useState("");

  const { loading: imgLoading } = useImgLoading({
    imgSrc: detail?.photoUrls?.[0],
  });

  const getDetail = async () => {
    getPlaceDetail({ placeId: param.placeId + "" }).then((res) => {
      setDetail(res?.data);
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
      lat: detail?.location.lat + "",
      lng: detail?.location.lng + "",
    }).then((res) => {
      setNearbyPlaces(res?.data.results);
    });
  };

  const handleLike = () => {
    if (!cookies.get("userToken")) {
      return toast(<span>로그인이 필요합니다.</span>);
    } else if (detail?.id) {
      setLike({ type: "PLACE", id: detail?.placeId }).then(() => {
        getDetail();
      });
    }
  };

  useEffect(() => {
    if (param?.placeId) {
      getDetail();
      getReview();
    }
  }, [param?.placeId]);

  useEffect(() => {
    if (detail?.id) {
      getNearPlace();
    }
  }, [detail?.id]);

  return (
    <>
      <S.HomeDetailsContainer>
        {imgLoading ? (
          <CustomSkeleton height="250px" />
        ) : (
          <S.DetailsImageBox>
            <StyledSlider {...imageSliderSetting}>
              {detail?.photoUrls?.map((img, idx) => (
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

            <S.LikeBox onClick={handleLike}>
              <HeartIcon
                stroke={detail?.isLiked ? "#FF5757" : "#b8b8b8"}
                fill={detail?.isLiked ? "#FF5757" : "none"}
              />
            </S.LikeBox>

            <S.ImagePageIndicatorBox>
              <span>
                {imageIndex + 1} / {detail?.photoUrls.length}
              </span>
            </S.ImagePageIndicatorBox>
          </S.DetailsImageBox>
        )}

        <S.DetailsBody>
          <S.DetailsTitle>
            <MarkIcon />
            {detail?.name}
          </S.DetailsTitle>

          <ReviewTagRow>
            {detail?.tags?.map((tag) => (
              <ReviewTag key={tag}>
                <span>#{tag}</span>
              </ReviewTag>
            ))}
          </ReviewTagRow>

          <S.DetailsInfo>{detail?.description}</S.DetailsInfo>

          {detail?.placeType === "TRAVEL_PLACE" && (
            <>
              <S.DetailsTitle>기본 정보</S.DetailsTitle>
              <S.DetailsSubTitle>
                <MarkIcon width="18" height="18" />
                <span>{detail?.formattedAddress}</span>
              </S.DetailsSubTitle>

              {!loading && (
                <CustomGoogleMap
                  width="100%"
                  height="146px"
                  lat={detail?.location.lat}
                  lng={detail?.location.lng}
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
                    photoUrl={place.photoUrl}
                    name={place.name}
                    rating={place.rating}
                    handleClick={() => setAddPlaceId(place.placeId)}
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

          {(detail?.placeType === "TRAVEL_PLACE" ||
            detail?.placeType === "THEME") && (
            <S.AddScheduleBox>
              <S.AddScheduleButton
                onClick={() => setAddPlaceId(detail?.placeId)}
              >
                <PlusIcon stroke="#fff" />
                <span>여행지 추가</span>
              </S.AddScheduleButton>
            </S.AddScheduleBox>
          )}
        </S.DetailsBody>
      </S.HomeDetailsContainer>

      {!!addPlaceId && (
        <CreateScheduleSheet
          handleClose={() => setAddPlaceId("")}
          placeId={addPlaceId}
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
