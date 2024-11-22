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
} from "../../../service/axios";
import {
  GooglePlaceProps,
  PlaceDetailAPiProps,
} from "../../../types/home.details";
import { reviewApiProps } from "../../../types/home";
import { useMapStore } from "../../../store/map.store";
import * as S from "../../../assets/styles/homeDetail.style";
import { testImg2 } from "../../../utils/staticDatas";
import EditIcon from "../../../assets/icons/EditIcon";
import CustomSkeleton from "../../../components/CustomSkeleton";
import styled from "styled-components";
import Slider from "react-slick";
import SurroundingPlaceCard from "../../../components/mobile/home/SurroundingPlaceCard";
import TitleMoreBox from "../../../components/mobile/home/TitleMoreBox";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import useImgLoading from "../../../hooks/useImgLoading";
import LikeCommentBox from "../../../components/LikeCommentBox";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import TravelPlaceAddSheet from "../../../components/mobile/bottomSheets/TravelPlaceAddSheet";

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

  const [reviews, setReviews] = useState<reviewApiProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectPlaceId, setSelectPlaceId] = useState("");

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
    getReviews({ placeId: param.placeId + "" }).then((res) => {
      setReviews(res?.data.data);
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
      setLike({ type: "PLACE", id: placeInfo?.placeId }).then(() => {
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
    }
  }, [param?.placeId]);

  useEffect(() => {
    if (placeInfo?.id) {
      getNearPlace();
    }
  }, [placeInfo?.id]);

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
