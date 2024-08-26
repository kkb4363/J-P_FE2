import CustomHeader from "../../../components/mobile/CustomHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import {
  PlaceDetailAPiProps,
  SelectPlaceProps,
} from "../../../types/home.details";
import { useMapStore } from "../../../store/map.store";
import ImageView from "../../../components/mobile/ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import AlarmIcon from "../../../assets/icons/AlarmIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import * as S from "../../../assets/styles/nearplace.style";
import BottomSheet from "../../../components/mobile/BottomSheet";

interface Props {
  photoUrl: string;
  name: string;
  rating: number;
  vicinity: string;
  height?: string;
}

export default function NearPlace() {
  const param = useParams();
  const location = useLocation();

  const mapRef = useRef<HTMLDivElement>(null);
  const mapStore = useMapStore();
  const navigate = useNavigate();

  const [details, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );
  const [selectPlaceId, setSelectPlaceId] = useState("");
  const [selectPlace, setSelectPlace] = useState<SelectPlaceProps>(
    {} as SelectPlaceProps
  );

  const handlePrev = () => {
    !selectPlaceId ? navigate(-1) : setSelectPlaceId("");
  };

  useEffect(() => {
    try {
      axiosInstance.get(`/place/details/${param?.placeId}`).then((res) => {
        if (res.status === 200) {
          setDetails(res.data);
        }
      });
    } catch (error) {
      console.error("API Error=", error);
    }
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

    const initMap = () => {
      if (mapRef.current && details?.location) {
        const lat = details.location.lat;
        const lng = details.location.lng;

        if (typeof lat === "number" && typeof lng === "number") {
          const map = new (window as any).google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 16,
            mapTypeControl: false,
          });

          const infoWindow = new (window as any).google.maps.InfoWindow();
          const nearPlaces = mapStore.getNearPlace();

          nearPlaces.forEach((place) => {
            const markerLat = place.geometry.location.lat;
            const markerLng = place.geometry.location.lng;

            if (
              typeof markerLat === "number" &&
              typeof markerLng === "number"
            ) {
              const marker = new (window as any).google.maps.Marker({
                position: { lat: markerLat, lng: markerLng },
                map: map,
                title: place.name,
              });

              marker.addListener("click", () => {
                const contentString = `
                  <div class="${S.PlaceMarkerName.styledComponentId}">
                    <strong>${place.name}</strong>
                  </div>
                `;
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);

                map.setCenter(marker.getPosition());
                setSelectPlaceId(place.placeId);
              });
            } else {
              console.error(
                "Invalid marker coordinates:",
                place.geometry.location
              );
            }
          });

          console.log("Google Maps init");
        } else {
          console.error("Invalid map coordinates:", details.location);
        }
      }
    };

    const getNearPlace = async () => {
      try {
        if (details?.location) {
          const res = await axiosInstance.get(
            `/googleplace/nearby-search/page?lat=${details.location.lat}&lng=${details.location.lng}&radius=5`
          );
          if (res.status === 200) {
            mapStore.setNearPlace(res.data.results);
          }
        }
      } catch (error) {
        console.error("nearbyPlace Api Error=", error);
      }
    };

    const loadMapAndNearbyPlaces = async () => {
      try {
        await getNearPlace();
        await loadGoogleMapsScript();
        initMap();
      } catch (error) {
        console.error("Error loading map or nearby places:", error);
      } finally {
        // loading 관련 부분
      }
    };

    if (details) {
      loadMapAndNearbyPlaces();
    }
  }, [details]);

  useEffect(() => {
    axiosInstance
      .get(`/googleplace/details?placeId=${selectPlaceId}`)
      .then((res) => {
        if (res.status === 200) {
          setSelectPlace(res.data);
        }
      });
  }, [selectPlaceId]);

  useEffect(() => {
    if (location?.state?.selectedPlaceId) {
      setSelectPlaceId(location?.state?.selectedPlaceId);
    }
  }, [location?.state]);

  return (
    <S.NearPlaceContainer>
      <CustomHeader title="주변 여행지" handleClick={handlePrev} />
      {!selectPlaceId ? (
        <BottomSheet maxH={0.9} minH={7} key={"nearPlaces-bottom-sheet"}>
          {mapStore.getNearPlace().map((place) => (
            <NearPlaceCard
              height="100px"
              key={place.placeId}
              photoUrl={place.photoUrls[0]}
              name={place.name}
              rating={place.rating}
              vicinity={place.vicinity}
            />
          ))}
        </BottomSheet>
      ) : (
        <BottomSheet
          handleClose={() => setSelectPlaceId("")}
          maxH={0.33}
          isDismiss={true}
          key={"nearPlaces-details-bottom-sheet"}
        >
          <S.SelectPlaceCol>
            <S.SelectPlaceCard>
              <ImageView
                width="80px"
                height="80px"
                src={selectPlace?.photoUrls?.[0]}
                alt={selectPlace?.name}
              />
              <S.CardCol>
                <p>{selectPlace?.name}</p>
                <span>{selectPlace?.shortAddress}</span>
                <div>
                  <StarIcon />
                  <span>{selectPlace?.rating}</span>
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

      <S.NearPlaceMapBox ref={mapRef} />
    </S.NearPlaceContainer>
  );
}

function NearPlaceCard({
  photoUrl,
  name,
  rating,
  vicinity,
  height = "83px",
}: Props) {
  return (
    <S.NearPlaceBox $height={height}>
      <ImageView width="80px" height="80px" src={photoUrl} alt={"이미지없음"} />

      <S.NearPlaceDetailCol>
        <div>주변 여행지</div>

        <p>{name}</p>

        <div>
          <span>{vicinity}</span>
        </div>
      </S.NearPlaceDetailCol>

      <S.ButtonCol>
        <S.RatingBox>
          <StarIcon />
          <span>{rating}</span>
        </S.RatingBox>

        <S.NearPlaceAddBtn>
          <PlusIcon />
          <span>추가</span>
        </S.NearPlaceAddBtn>
      </S.ButtonCol>
    </S.NearPlaceBox>
  );
}
