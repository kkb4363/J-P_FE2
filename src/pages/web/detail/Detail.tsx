import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAllDiaries,
  getPlaceDetail,
  getReviews,
  getSurroundingPlace,
  setLike,
} from "../../../service/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GooglePlaceProps, PlaceDetailAPiProps } from "../../../types/place";
import { ReviewProps, TravelogProps } from "../../../types/travelreview";
import MarkIcon from "../../../assets/icons/MarkIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import CustomSkeleton from "../../../components/CustomSkeleton";
import SearchIcon from "../../../assets/icons/SearchIcon";
import SurroundingPlaceCard from "../../../components/web/home/SurroundingPlaceCard";
import { toast } from "react-toastify";
import { useModalStore } from "../../../store/modal.store";
import NoButtonModal from "../../../components/web/NoButtonModal";
import { PlaceAddModalContainer } from "./SurroundingMore";
import SuccessModal from "../../../components/web/surroundingPlace/SuccessModal";
import { Cookies } from "react-cookie";
import TravelPlaceAddModal from "../../../components/web/surroundingPlace/TravelPlaceAddModal";
import TripCard from "../../../components/web/detail/TripCard";
import ReviewCard from "../../../components/web/detail/ReviewCard";
import EditIcon from "../../../assets/icons/EditIcon";
import { useWriteReviewStore } from "../../../store/writeReview.store";
import { useReviewStore } from "../../../store/travelReview.store";

const cookies = new Cookies();

export default function Detail() {
  const param = useParams();
  const navigate = useNavigate();
  const modalStore = useModalStore();

  const [addPlaceId, setAddPlaceId] = useState("");
  const [loading, setLoading] = useState(true);
  const [detail, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [surrondingPlace, setSurroundingPlace] = useState<GooglePlaceProps[]>(
    []
  );
  const [review, setReviews] = useState<ReviewProps[]>([]);
  const [recommendedTrips, setRecommendedTrips] = useState<TravelogProps[]>([]);

  const getDetail = () => {
    getPlaceDetail({ placeId: param.placeId + "" }).then((res) => {
      setDetails(res?.data);
      setLoading(false);
    });
  };

  const getReview = () => {
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

  const getNearPlace = () => {
    getSurroundingPlace({
      lat: detail?.location.lat + "",
      lng: detail?.location.lng + "",
    }).then((res) => {
      setSurroundingPlace(res?.data.results);
    });
  };

  const handleLike = () => {
    if (!cookies.get("userToken")) {
      return toast(<span>로그인이 필요합니다.</span>);
    } else if (detail?.id) {
      setLike({
        actionType: "BOOKMARK",
        targetType: "PLACE",
        id: detail?.placeId,
      }).then(() => {
        getDetail();
      });
    }
  };

  const handlePlaceAdd = (placeId: string) => {
    if (!cookies.get("userToken")) {
      return toast(<span>로그인이 필요합니다.</span>);
    } else {
      modalStore.setCurrentModal("addPlan");
      setAddPlaceId(placeId);
    }
  };

  const handlePlaceAddModalClose = () => {
    modalStore.setCurrentModal("");
    setAddPlaceId("");
  };

  useEffect(() => {
    if (param?.placeId) {
      getDetail();
      getReview();
      getRecommendedTrips();
    }
  }, [param?.placeId]);

  useEffect(() => {
    if (detail?.id) {
      getNearPlace();
    }
  }, [detail?.id]);

  const writeReviewStore = useWriteReviewStore();
  const reviewStore = useReviewStore();
  const handleReviewWrite = () => {
    writeReviewStore.setSelectedPlace(detail?.placeId);
    writeReviewStore.setSelectedPlace(detail?.name);
    navigate("/home/writeReview");
  };

  const handleReviewTripMore = () => {
    if (detail?.placeType === "CITY") {
      reviewStore.setIsReview(false);
      navigate("/home/travelReview");
    } else {
      navigate(`/home/reviewMore/${param?.placeId}`);
    }
  };

  return (
    <>
      <PhotoBoxRow>
        <PhotoBox>
          {loading ? (
            <CustomSkeleton height="100%" />
          ) : (
            <BigPhoto src={detail?.photoUrls?.[0]} alt="big-photo" />
          )}
        </PhotoBox>
        <PhotoBoxGrid>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CustomSkeleton key={index} width="276px" height="200px" />
              ))
            : detail?.photoUrls
                ?.slice(1, 4)
                .map((photo) => (
                  <SmallPhoto key={photo} src={photo} alt="small-photo" />
                ))}
          {!loading && (
            <ImageSearchBox
              to={`https://www.google.com/search?q=${detail?.name}`}
            >
              <SearchIcon stroke="#b8b8b8" />
              <span>이미지 검색 더보기</span>
            </ImageSearchBox>
          )}
        </PhotoBoxGrid>
      </PhotoBoxRow>

      <TitleBox>
        <div>
          <MarkIcon width="32" height="32" />
          <span>
            {detail?.name}
            <HeartBox onClick={handleLike}>
              <HeartIcon
                stroke={detail?.isLiked ? "#FF5757" : "#b8b8b8"}
                fill={detail?.isLiked ? "#FF5757" : "none"}
              />
            </HeartBox>
          </span>
        </div>

        {detail?.placeType === "TRAVEL_PLACE" && (
          <AddScheduleButton onClick={() => handlePlaceAdd(detail?.placeId)}>
            <PlusIcon stroke="#fff" />
            <span>여행지 추가</span>
          </AddScheduleButton>
        )}
      </TitleBox>

      <TagRowBox>
        <TagRow>
          {detail?.tags?.map((tag) => (
            <Tag key={tag}>
              <span>#{tag}</span>
            </Tag>
          ))}
        </TagRow>
      </TagRowBox>

      <InfoBox>
        <span>{detail?.description}</span>
      </InfoBox>

      {detail?.placeType === "TRAVEL_PLACE" && (
        <>
          <SubTitle>
            <span>기본 정보</span>
          </SubTitle>

          <MapTitle>
            <MarkIcon />
            <span>{detail?.formattedAddress}</span>
          </MapTitle>

          {detail?.id && (
            <CustomGoogleMap
              width="100%"
              height="450px"
              lat={detail?.location?.lat}
              lng={detail?.location?.lng}
            />
          )}
        </>
      )}

      <SubTitle>
        <span>주변 여행지 추천</span>
        <p
          onClick={() =>
            navigate(
              `/home/surroundingMore/${detail?.location.lng}/${detail?.location.lat}`
            )
          }
        >
          더보기
        </p>
      </SubTitle>

      <SurroundingPlaceCardRow>
        {surrondingPlace?.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <CustomSkeleton
                key={index}
                width="224px"
                height="190px"
                borderRadius="16px"
              />
            ))
          : surrondingPlace
              ?.slice(0, 5)
              ?.map((place) => (
                <SurroundingPlaceCard
                  key={place?.placeId}
                  imgSrc={place?.photoUrl}
                  title={place?.name}
                  rating={place?.rating}
                  onClick={() => handlePlaceAdd(place?.placeId)}
                />
              ))}
      </SurroundingPlaceCardRow>

      <SubTitle>
        <span>{detail?.placeType === "CITY" ? "여행기" : "리뷰"}</span>
        <p onClick={handleReviewTripMore}>더보기</p>
      </SubTitle>

      <ReviewCardRow>
        {detail?.placeType !== "CITY" && review?.length === 0 ? (
          <NoReviewAndTripText>
            <span>등록된 리뷰가 없어요. 첫 리뷰를 작성해보세요 😀</span>
            <div onClick={handleReviewWrite}>
              작성하기
              <EditIcon stroke="black" width="24" height="24" />
            </div>
          </NoReviewAndTripText>
        ) : (
          review?.map((r) => <ReviewCard item={r} key={r.id} />)
        )}

        {detail?.placeType === "CITY" &&
          recommendedTrips?.map((r, i) => <TripCard key={i} item={r} />)}
      </ReviewCardRow>

      {!!addPlaceId && (
        <NoButtonModal
          width="530px"
          height="380px"
          onClose={handlePlaceAddModalClose}
        >
          <PlaceAddModalContainer>
            {modalStore.getCurrentModal() === "addPlan" && (
              <TravelPlaceAddModal placeId={addPlaceId} />
            )}

            {modalStore.getCurrentModal() === "successAddPlan" && (
              <SuccessModal />
            )}
          </PlaceAddModalContainer>
        </NoButtonModal>
      )}
    </>
  );
}

const PhotoBoxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PhotoBox = styled.div`
  width: 615px;
  height: 420px;
`;

const PhotoBoxGrid = styled(PhotoBox)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  column-gap: 0;
`;

const BigPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SmallPhoto = styled.img`
  width: 276px;
  height: 200px;
  object-fit: cover;
`;

const ImageSearchBox = styled(Link)`
  width: 276px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background-color: ${(props) => props.theme.color.gray100};
  cursor: pointer;

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0 24px 0;
  position: relative;

  & > div:first-child {
    display: flex;
    align-items: center;
    & > span {
      color: ${(props) => props.theme.color.gray900};
      font-size: 32px;
      font-weight: 700;

      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

const HeartBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TagRowBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const AddScheduleButton = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  border-radius: 30px;
  background-color: ${(props) => props.theme.color.main};
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
  }
`;

const TagRow = styled.div`
  flex: 1;
  display: flex;
  height: 40px;
  align-items: center;
  gap: 8px;
`;

const Tag = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.color.white};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 16px;
    font-weight: 400;
  }
`;

const InfoBox = styled.div`
  width: 784px;

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 400;
  }
`;

const SubTitle = styled.div`
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }

  & > p {
    color: ${(props) => props.theme.color.gray300};
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }
`;

const MapTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 14px 0 26px 0;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 16px;
    font-weight: 400;
  }
`;

const SurroundingPlaceCardRow = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ReviewCardRow = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NoReviewAndTripText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 16px;
    text-align: center;
  }

  & > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 20px;
    gap: 4px;
    color: ${(props) => props.theme.color.gray700};
  }
`;
