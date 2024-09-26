import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  NearByPlaceProps,
  PlaceDetailAPiProps,
} from "../../../types/home.details";
import { reviewApiProps } from "../../../types/home";
import MarkIcon from "../../../assets/icons/MarkIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import StarIcon from "../../../assets/icons/StarIcon";
import testImg from "../../../assets/images/testImg3.png";
import ImageView from "../../../components/web/ImageView";
import {
  ReviewInfo,
  ReviewMessageRow,
  ReviewTitle,
} from "../../../assets/styles/homeDetail.style";
import CommentIcon from "../../../assets/icons/CommentIcon";
import CustomSkeleton from "../../../components/mobile/CustomSkeleton";

export default function Detail() {
  const param = useParams();
  const navigate = useNavigate();

  const isCityDetailPage = location.pathname.includes("city");
  const [loading, setLoading] = useState(true);
  const [detail, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [surrondingPlace, setSurroundingPlace] = useState<NearByPlaceProps[]>(
    []
  );
  const [review, setReviews] = useState<reviewApiProps[]>([]);

  const getSurroundingPlace = async () => {
    try {
      axiosInstance
        .get(
          `/googleplace/nearby-search/page?lat=${detail?.location.lat}&lng=${detail?.location.lng}&radius=10`
        )
        .then((res) => {
          if (res.status === 200) {
            setSurroundingPlace(res.data.results);
          }
        });
    } catch (error) {
      console.error("nearbyPlace Api Error=", error);
    }
  };

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
          setLoading(false);
        }
        if (reviewsRes.status === 200) {
          setReviews(reviewsRes.data.data);
        }
      } catch (error) {
        console.error("homeDetail api error=", error);
      }
    };

    requestApi();
  }, [param?.placeId]);

  useEffect(() => {
    if (detail.id) {
      getSurroundingPlace();
    }
  }, [detail?.id]);

  console.log(detail);
  console.log(surrondingPlace);
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
                ?.slice(1, 5)
                .map((photo) => (
                  <SmallPhoto key={photo} src={photo} alt="small-photo" />
                ))}
        </PhotoBoxGrid>
      </PhotoBoxRow>

      <TitleBox>
        <MarkIcon width="32" height="32" />
        <span>{detail?.name}</span>
        <HeartBox>
          <HeartIcon />
        </HeartBox>
      </TitleBox>

      <TagRowBox>
        <TagRow>
          {detail?.tags?.map((tag) => (
            <Tag key={tag}>
              <span>#{tag}</span>
            </Tag>
          ))}
        </TagRow>

        <AddScheduleButton>
          <PlusIcon stroke="#fff" />
          <span>일정추가</span>
        </AddScheduleButton>
      </TagRowBox>

      <InfoBox>
        <span>{detail?.description}</span>
      </InfoBox>

      {!isCityDetailPage && (
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
        <p>더보기</p>
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
          : surrondingPlace?.slice(0, 5)?.map((place) => (
              <SurroundingPlaceCard key={place.placeId}>
                <img src={place?.photoUrls[0]} alt="surrounding-place-img" />

                <SurroundingPlaceCardBottomBox>
                  <p>{place?.name}</p>
                  <div>
                    <StarIcon width="14" height="14" />
                    &nbsp; 4.9 | 위치보기
                  </div>
                  <SurrondingPlaceAddButton>
                    <PlusIcon />
                    <span>추가</span>
                  </SurrondingPlaceAddButton>
                </SurroundingPlaceCardBottomBox>
              </SurroundingPlaceCard>
            ))}
      </SurroundingPlaceCardRow>

      <SubTitle>
        <span>리뷰</span>
        <p>더보기</p>
      </SubTitle>

      <ReviewCardRow>
        <ReviewCard>
          <ImageView
            width="110px"
            height="100px"
            src={testImg}
            alt="review-img"
          />

          <ReviewInfoCol>
            <ReviewTitle>
              <div>
                <img src={testImg} alt="user-img" />
                <span>jiwoo</span>
                <span>24.4.1</span>
              </div>
              <div>
                <StarIcon />
                <span>4.8</span>
              </div>
            </ReviewTitle>
            <ReviewInfo>
              <span>드라이브, 산책 코스로 딱좋았던</span>
            </ReviewInfo>
            <ReviewMessageRow>
              <HeartIcon />
              <span>10</span>
              <CommentIcon />
              <span>1</span>
            </ReviewMessageRow>
          </ReviewInfoCol>
        </ReviewCard>
        <ReviewCard>
          <ImageView
            width="110px"
            height="100px"
            src={testImg}
            alt="review-img"
          />

          <ReviewInfoCol>
            <ReviewTitle>
              <div>
                <img src={testImg} alt="user-img" />
                <span>jiwoo</span>
                <span>24.4.1</span>
              </div>
              <div>
                <StarIcon />
                <span>4.8</span>
              </div>
            </ReviewTitle>
            <ReviewInfo>
              <span>드라이브, 산책 코스로 딱좋았던</span>
            </ReviewInfo>
            <ReviewMessageRow>
              <HeartIcon />
              <span>10</span>
              <CommentIcon />
              <span>1</span>
            </ReviewMessageRow>
          </ReviewInfoCol>
        </ReviewCard>
        <ReviewCard>
          <ImageView
            width="110px"
            height="100px"
            src={testImg}
            alt="review-img"
          />

          <ReviewInfoCol>
            <ReviewTitle>
              <div>
                <img src={testImg} alt="user-img" />
                <span>jiwoo</span>
                <span>24.4.1</span>
              </div>
              <div>
                <StarIcon />
                <span>4.8</span>
              </div>
            </ReviewTitle>
            <ReviewInfo>
              <span>드라이브, 산책 코스로 딱좋았던</span>
            </ReviewInfo>
            <ReviewMessageRow>
              <HeartIcon />
              <span>10</span>
              <CommentIcon />
              <span>1</span>
            </ReviewMessageRow>
          </ReviewInfoCol>
        </ReviewCard>
      </ReviewCardRow>
    </>
  );
}

//기범 TODO = SurroundingCard, ReviewCard 컴포넌트화하기
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

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 24px 0;
  position: relative;

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 32px;
    font-weight: 700;
  }
`;

const HeartBox = styled.div`
  position: absolute;
  right: 30px;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
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

const SurroundingPlaceCard = styled.div`
  width: 224px;
  height: 190px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  & > img {
    width: 100%;
    height: 100px;
    border-radius: 16px 16px 0 0;
  }
`;

const SurroundingPlaceCardBottomBox = styled.div`
  border-radius: 0 0 16px 16px;
  padding: 13px 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90px;
  position: relative;
  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }

  & > div {
    color: ${(props) => props.theme.color.gray500};
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
`;

const SurrondingPlaceAddButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 18px;
  padding: 6px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray700};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
    font-weight: 700;
  }
`;

const ReviewCardRow = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ReviewCard = styled.div`
  padding: 17px;
  width: 390px;
  height: 134px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReviewInfoCol = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
