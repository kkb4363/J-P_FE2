import CustomHeader from "../../../components/mobile/CustomHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getGooglePlaceDetail,
  getPlaceDetail,
  getSurroundingPlace,
} from "../../../utils/axios";
import {
  PlaceDetailAPiProps,
  SelectPlaceProps,
} from "../../../types/home.details";
import { useMapStore } from "../../../store/map.store";
import ImageView from "../../../components/ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import AlarmIcon from "../../../assets/icons/AlarmIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";
import * as S from "../../../assets/styles/nearplace.style";
import BottomSheet from "../../../components/mobile/BottomSheet";
import SurroundingPlaceCard from "../../../components/mobile/detail/SurroundingPlaceCard";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import PlusIcon from "../../../assets/icons/PlusIcon";
import useImgLoading from "../../../hooks/useImgLoading";
import CustomSkeleton from "../../../components/CustomSkeleton";
import CreateScheduleSheet from "../../../components/mobile/bottomSheets/CreateScheduleSheet";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import StyledToast from "../../../components/mobile/StyledToast";

const cookies = new Cookies();

export default function NearPlace() {
  const param = useParams();
  const location = useLocation();
  const mapStore = useMapStore();
  const navigate = useNavigate();

  const [details, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [selectPlaceId, setSelectPlaceId] = useState("");
  const [selectPlace, setSelectPlace] = useState<SelectPlaceProps>(
    {} as SelectPlaceProps
  );
  const [addPlaceId, setAddPlaceId] = useState("");

  const { loading: imgLoading, setLoading: setImgLoading } = useImgLoading({
    imgSrc: selectPlace?.photoUrls?.[0],
  });

  const handlePrev = () => {
    if (selectPlaceId && details?.id) {
      setSelectPlaceId("");
    } else {
      navigate(-1);
      mapStore.clear();
    }
  };

  const handleBottomSheetClose = () => {
    if (details.id) {
      setSelectPlaceId("");
    } else {
      navigate(-1);
    }
  };

  const handlePlaceAdd = (placeId: string) => {
    if (!cookies.get("userToken")) {
      return toast(<span>로그인이 필요합니다.</span>);
    }

    setAddPlaceId(placeId);
  };

  const getDetail = async () => {
    getPlaceDetail({ placeId: param?.placeId + "" }).then((res) => {
      setDetails(res?.data);
    });
  };

  const getSurroundingPlaces = async () => {
    if (details?.location) {
      getSurroundingPlace({
        lat: details.location.lat + "",
        lng: details.location.lng + "",
      }).then((res) => {
        mapStore.setNearPlace(res?.data.results);
      });
    }
  };

  const getGooglePlace = async () => {
    getGooglePlaceDetail({ placeId: selectPlaceId }).then((res) => {
      setSelectPlace(res?.data);
    });
  };

  useEffect(() => {
    if (param?.placeId) {
      getDetail();
    }
  }, [param?.placeId]);

  useEffect(() => {
    if (details?.id) {
      getSurroundingPlaces();
    }
  }, [details?.id]);

  useEffect(() => {
    if (selectPlaceId) {
      getGooglePlace();
    }
  }, [selectPlaceId]);

  useEffect(() => {
    if (location?.state?.selectedPlaceId) {
      setSelectPlaceId(location?.state?.selectedPlaceId);
    }
  }, [location?.state]);

  useEffect(() => {
    setImgLoading(true);
  }, [selectPlace?.photoUrls?.[0]]);

  return (
    <>
      <S.NearPlaceContainer>
        <CustomHeader title="주변 여행지" handleClick={handlePrev} />
        {!selectPlaceId ? (
          <BottomSheet
            maxH={0.9}
            minH={7}
            key={"surroundingPlace-bottom-sheet"}
          >
            {mapStore.getNearPlace().map((place) => (
              <SurroundingPlaceCard
                height="100px"
                key={place.placeId}
                photoUrl={place.photoUrl}
                name={place.name}
                rating={place.rating}
                vicinity={place.vicinity}
                handleClick={() => handlePlaceAdd(place.placeId)}
              />
            ))}
          </BottomSheet>
        ) : (
          <BottomSheet
            handleClose={handleBottomSheetClose}
            maxH={0.33}
            isDismiss={true}
            key={"surroundingPlace-details-bottom-sheet2"}
          >
            <S.SelectPlaceCol>
              <S.SelectPlaceCard>
                {imgLoading ? (
                  <CustomSkeleton
                    width="80px"
                    height="80px"
                    borderRadius="16px"
                  />
                ) : (
                  <ImageView
                    width="80px"
                    height="80px"
                    src={selectPlace?.photoUrls?.[0]}
                    alt={selectPlace?.name}
                  />
                )}

                <S.CardCol>
                  <p>{selectPlace?.name}</p>
                  <span>{selectPlace?.shortAddress}</span>
                  <div>
                    <div>
                      <StarIcon />
                      <span>{selectPlace?.rating}</span>
                    </div>
                    <S.PlaceAddButton
                      onClick={() => handlePlaceAdd(selectPlace?.placeId)}
                    >
                      <PlusIcon stroke="white" />
                      <span>여행지 추가</span>
                    </S.PlaceAddButton>
                  </div>
                </S.CardCol>
              </S.SelectPlaceCard>
              <S.Divider />
              <S.SelectPlaceDetailCol>
                <div>
                  <AlarmIcon />
                  <span>{selectPlace?.openNow ? "영업 중" : "영업 종료"}</span>
                </div>
                <div>
                  <InfoIcon />
                  <span>
                    {selectPlace?.formattedPhoneNumber
                      ? selectPlace?.formattedPhoneNumber
                      : "전화번호 미제공"}
                  </span>
                </div>
                <div>
                  <MarkIcon width="18" height="18" />
                  <span>{selectPlace?.fullAddress}</span>
                </div>
              </S.SelectPlaceDetailCol>
            </S.SelectPlaceCol>
          </BottomSheet>
        )}

        {details?.id ? (
          <CustomGoogleMap
            width="100%"
            height="calc(100dvh - 50px)"
            lat={details.location.lat}
            lng={details.location.lng}
            handleMarkerClick={setSelectPlaceId}
          />
        ) : (
          selectPlace.placeId && (
            <CustomGoogleMap
              width="100%"
              height="calc(100dvh - 50px)"
              lat={selectPlace?.location.lat}
              lng={selectPlace?.location.lng}
              handleMarkerClick={setSelectPlaceId}
            />
          )
        )}
      </S.NearPlaceContainer>

      {!!addPlaceId && (
        <CreateScheduleSheet
          handleClose={() => setAddPlaceId("")}
          placeId={addPlaceId}
        />
      )}
    </>
  );
}
