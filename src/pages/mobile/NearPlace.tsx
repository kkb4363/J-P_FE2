import styled from "styled-components";
import CustomHeader from "../../components/mobile/CustomHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import {
  PlaceDetailAPiProps,
  SelectPlaceProps,
} from "../../types/home.details";
import { useMapStore } from "../../store/map.store";
import BottomSheet from "../../components/mobile/BottomSheet";
import NearPlaceCard2 from "../../components/mobile/NearPlaceCard2";
import ImageView from "../../components/mobile/ImageView";
import StarIcon from "../../assets/icons/StarIcon";
import AlarmIcon from "../../assets/icons/AlarmIcon";
import InfoIcon from "../../assets/icons/InfoIcon";
import MarkIcon from "../../assets/icons/MarkIcon";

export default function NearPlace() {
  const param = useParams();
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

        script.onload = async () => {
          if ((window as any).google) {
            initMap();
          }
        };
      } else {
        if ((window as any).google && mapStore.getNearPlace().length !== 0) {
          initMap();
        }
      }
    };

    const getNearPlace = async () => {
      try {
        if (details?.location) {
          axiosInstance
            .get(
              `/googleplace/nearby-search/page?lat=${details?.location.lat}&lng=${details?.location.lng}&radius=5`
            )
            .then((res) => {
              if (res.status === 200) {
                mapStore.setNearPlace(res.data.results);
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
          mapTypeControl: false,
        });

        const infoWindow = new (window as any).google.maps.InfoWindow();

        const nearPlaces = mapStore.getNearPlace();

        nearPlaces.forEach((place) => {
          const marker = new (window as any).google.maps.Marker({
            position: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            },
            map: map,
            title: place.name,
          });

          marker.addListener("click", () => {
            const contentString = `
            <div class="${PlaceMarkerName.styledComponentId}">
              <strong>${place.name}</strong>
            </div>
          `;
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);

            map.setCenter(marker.getPosition());
            setSelectPlaceId(place.placeId);
          });
        });

        console.log("Google Maps init");
      }
    };

    const loadMapAndNearbyPlaces = async () => {
      await getNearPlace();
      loadGoogleMapsScript();
    };

    if (details) {
      loadMapAndNearbyPlaces();
    }
  }, [details, mapStore.getNearPlace().length]);

  useEffect(() => {
    axiosInstance
      .get(`/googleplace/details?placeId=${selectPlaceId}`)
      .then((res) => {
        if (res.status === 200) {
          setSelectPlace(res.data);
        }
      });

    // const requestAPi = async () => {
    //   try {
    //     const [googlePlaceDetail, placeDetail] = await Promise.all([
    //       axiosInstance.get(`/googleplace/details?placeId=${selectPlaceId}`),
    //       axiosInstance.get(`/place/details/${selectPlaceId}`),
    //     ]);

    //     if (placeDetail.status === 200 && googlePlaceDetail.status === 200) {
    //       console.log(googlePlaceDetail);
    //     }
    //   } catch (error) {
    //     console.error("Api Error=", error);
    //   }
    // };
    // requestAPi();
  }, [selectPlaceId]);

  return (
    <NearPlaceContainer>
      <CustomHeader title="주변 여행지" handleClick={handlePrev} />

      {!selectPlaceId ? (
        <BottomSheet maxHeight={window.innerHeight - 100} key={"sheet1"}>
          {mapStore.getNearPlace().map((place) => (
            <NearPlaceCard2
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
        <BottomSheet maxHeight={window.innerHeight - 500} key={"sheet2"}>
          <SelectPlaceCol>
            <SelectPlaceCard>
              <ImageView
                width="80px"
                height="80px"
                src={selectPlace?.photoUrls?.[0]}
                alt={selectPlace?.name}
              />
              <CardCol>
                <p>{selectPlace?.name}</p>
                <span>전남 구례군</span>
                <div>
                  <StarIcon />
                  <span>4,9</span>
                </div>
              </CardCol>
            </SelectPlaceCard>
            <Divider />
            <SelectPlaceDetailCol>
              <div>
                <AlarmIcon />
                <span>연중무휴</span>
              </div>
              <div>
                <InfoIcon />
                <span>061-666-666</span>
              </div>
              <div>
                <MarkIcon width="18" height="18" />
                <span>전라남도 구례군 구례읍 원방리 </span>
              </div>
            </SelectPlaceDetailCol>
          </SelectPlaceCol>
        </BottomSheet>
      )}
      <NearPlaceMapBox ref={mapRef}></NearPlaceMapBox>
    </NearPlaceContainer>
  );
}

const NearPlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
`;

const NearPlaceMapBox = styled.div`
  width: 100%;
  height: calc(100% - 50px);
`;

const PlaceMarkerName = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12),
    2px 6px 12px 0px rgba(0, 0, 0, 0.12);

  & > strong {
    color: #1a1a1a;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.6px;
  }

  & > .gm-style-iw-chr > button {
    display: none;
    background-color: tomato;
  }
`;

const SelectPlaceCol = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px 24px 24px;
`;

const SelectPlaceCard = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  gap: 8px;
`;

const CardCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 100%;

  & > p {
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.048px;
  }

  & > span {
    color: #4d4d4d;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.036px;
  }

  & > div {
    color: #808080;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.036px;

    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

const Divider = styled.div`
  background: #e6e6e6;
  width: 100%;
  height: 1px;
  margin: 16px 0;
`;

const SelectPlaceDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
    & > span {
      color: #4d4d4d;
      font-size: 14px;
      font-weight: 400;
      text-transform: capitalize;
    }
  }
`;
