import styled from "styled-components";
import CustomHeader from "../../components/mobile/CustomHeader";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { PlaceDetailAPiProps } from "../../types/home.details";
import { useMapStore } from "../../store/map.store";
import BottomSheet from "../../components/mobile/BottomSheet";
import NearPlaceCard2 from "../../components/mobile/NearPlaceCard2";

export default function NearPlace() {
  const param = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapStore = useMapStore();

  const [details, setDetails] = useState<PlaceDetailAPiProps>(
    {} as PlaceDetailAPiProps
  );

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
            infoWindow.setContent(
              `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`
            );
            infoWindow.open(map, marker);
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

  return (
    <NearPlaceContainer>
      <CustomHeader title="주변 여행지" />
      <BottomSheet>
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
