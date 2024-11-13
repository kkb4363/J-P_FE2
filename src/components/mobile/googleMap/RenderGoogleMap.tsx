import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GoogleMapProps } from "./CustomGoogleMap";
import { useMapStore } from "../../../store/map.store";
import { GooglePlaceProps } from "../../../types/home.details";

// marker가 여러개일 경우 marker를 렌더링해주는 컴포넌트에서
// mapStore.setNearPlace를 추가해주고, 페이지를 나갈 때
// mapStore.clear를 해주세요! 안그러면 마커 하나만 표시하고 싶을 때 여러개가 나올 수 있어요!

export default function RenderGoogleMap({
  width,
  height,
  lat,
  lng,
  style,
  handleMarkerClick,
}: GoogleMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState([] as any);
  const ref = useRef<HTMLDivElement>(null);
  const mapStore = useMapStore();

  useEffect(() => {
    const newMap = new (window as any).google.maps.Map(ref.current, {
      center: { lat: lat, lng: lng },
      zoom: 16,
      mapTypeControl: false,
    });

    new (window as any).google.maps.Marker({
      position: { lat, lng },
      map: newMap,
      title: "Marker",
    });

    setMap(newMap);
  }, []);

  useEffect(() => {
    const places = mapStore.getNearPlace();
    setPlaces(places);
  }, [mapStore]);

  useEffect(() => {
    if (map && places.length > 0) {
      const infoWindow = new (window as any).google.maps.InfoWindow();

      places.forEach((place: GooglePlaceProps) => {
        const lat = place.geometry.location.lat;
        const lng = place.geometry.location.lng;

        const marker = new (window as any).google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: place.name,
        });

        marker.addListener("click", () => {
          const content = `
              <div class="${MarkerName.styledComponentId}">
              <strong>${place.name}</strong>
              </div>
            `;
          infoWindow.setContent(content);
          infoWindow.open(map, marker);

          map.setCenter(marker.getPosition());
          handleMarkerClick && handleMarkerClick(place.placeId);
        });
      });
    }
  }, [map, places]);

  return (
    <CustomGoogleMapContainer
      $width={width}
      $height={height}
      ref={ref}
      id="map"
      style={style}
    />
  );
}

const CustomGoogleMapContainer = styled.div<{
  $width: string;
  $height: string;
}>`
  width: ${(props) => props.$width && props.$width};
  height: ${(props) => props.$height && props.$height};
  margin: 8px 0;
  border-radius: 16px;
`;

const MarkerName = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12),
    2px 6px 12px 0px rgba(0, 0, 0, 0.12);

  & > strong {
    color: ${(props) => props.theme.color.gray900};
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  }
`;
