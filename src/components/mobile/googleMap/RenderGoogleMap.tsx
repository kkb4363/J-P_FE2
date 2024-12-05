import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GoogleMapProps } from "./CustomGoogleMap";
import { useMapStore } from "../../../store/map.store";
import { useLocation } from "react-router-dom";

const defaultMarker = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M16 28.8002C16 28.8002 26.0174 19.8958 26.0174 13.2176C26.0174 7.68513 21.5325 3.2002 16 3.2002C10.4675 3.2002 5.9826 7.68513 5.9826 13.2176C5.9826 19.8958 16 28.8002 16 28.8002Z" fill="#6979F8"/>
<path d="M19.2004 12.8004C19.2004 14.5677 17.7677 16.0004 16.0004 16.0004C14.2331 16.0004 12.8004 14.5677 12.8004 12.8004C12.8004 11.0331 14.2331 9.6004 16.0004 9.6004C17.7677 9.6004 19.2004 11.0331 19.2004 12.8004Z" fill="#6979F8"/>
<path d="M16 28.8002C16 28.8002 26.0174 19.8958 26.0174 13.2176C26.0174 7.68513 21.5325 3.2002 16 3.2002C10.4675 3.2002 5.9826 7.68513 5.9826 13.2176C5.9826 19.8958 16 28.8002 16 28.8002Z" stroke="white" stroke-width="2"/>
<path d="M19.2004 12.8004C19.2004 14.5677 17.7677 16.0004 16.0004 16.0004C14.2331 16.0004 12.8004 14.5677 12.8004 12.8004C12.8004 11.0331 14.2331 9.6004 16.0004 9.6004C17.7677 9.6004 19.2004 11.0331 19.2004 12.8004Z" stroke="white" stroke-width="2"/>
</svg>`;

export default function RenderGoogleMap({
  width,
  height,
  lat,
  lng,
  style,
  handleMarkerClick,
  focusCenterId,
}: GoogleMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState([] as any);
  const ref = useRef<HTMLDivElement>(null);
  const mapStore = useMapStore();

  // 페이지 바뀔 때 clear
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname.includes("surroundingMore") ||
      location.pathname.includes("schedule/details")
    ) {
      return;
    } else {
      mapStore.clear();
    }
  }, []);

  useEffect(() => {
    if (
      !lat &&
      !lng &&
      mapStore.getAddedPlace() &&
      mapStore.getAddedPlace()?.length !== 0
    ) {
      const firstPlace = mapStore.getAddedPlace()?.[0].location;
      const newMap = new (window as any).google.maps.Map(ref.current, {
        center: { lat: firstPlace?.lat, lng: firstPlace?.lng },
        zoom: 14,
        mapTypeControl: false,
      });

      setMap(newMap);
    } else {
      const newMap = new (window as any).google.maps.Map(ref.current, {
        center: { lat: lat, lng: lng },
        zoom: 14,
        mapTypeControl: false,
      });

      new (window as any).google.maps.Marker({
        position: { lat, lng },
        map: newMap,
        title: "Marker",
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
            defaultMarker
          )}`,
          scaledSize: new google.maps.Size(32, 32),
        },
      });

      setMap(newMap);
    }
  }, [mapStore.getAddedPlace()]);

  // 마커가 여러개인 경우
  useEffect(() => {
    const surroundingPlaces = mapStore.getNearPlace();
    const addedPlaces = mapStore.getAddedPlace();

    let newPlaces: any = [];

    if (surroundingPlaces?.length !== 0) {
      newPlaces = surroundingPlaces?.map((p) => ({
        placeId: p.placeId,
        name: p.name,
        location: p.geometry.location,
      }));
    }

    if (addedPlaces?.length !== 0) {
      newPlaces = addedPlaces?.map((p) => ({
        location: p.location,
        name: p.name,
        idx: p.index,
      }));
    }

    setPlaces(newPlaces);
  }, [mapStore.getNearPlace(), mapStore.getAddedPlace()]);

  useEffect(() => {
    if (map) {
      const infoWindow = new (window as any).google.maps.InfoWindow();
      places?.forEach(
        (place: {
          location: {
            lat: number;
            lng: number;
          };
          name: string;
          placeId: string;
          idx?: number;
        }) => {
          const lat = place?.location.lat;
          const lng = place?.location.lng;

          const svgMarker = `
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="11" fill="#FF9E80" />
                    <text x="50%"
                      y="50%"
                      text-anchor="middle"
                      dominant-baseline="middle"
                      font-size="14"
                      font-weight="bold"
                      fill="white">
                        ${place?.idx}
                    </text>
                </svg>
                `;

          const marker = new (window as any).google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: place.name,
            icon: place.idx
              ? {
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    svgMarker
                  )}`,
                  scaledSize: new google.maps.Size(22, 22),
                }
              : {
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    defaultMarker
                  )}`,
                  scaledSize: new google.maps.Size(32, 32),
                },
          });

          const content = `
              <div class="${MarkerName.styledComponentId}">
              <strong>${place.name}</strong>
              </div>
            `;

          if (focusCenterId === place?.placeId) {
            map.setCenter(marker.getPosition());
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
            setTimeout(() => {
              infoWindow.close();
            }, 1000);
          }

          marker.addListener("click", () => {
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
            setTimeout(() => {
              infoWindow.close();
            }, 1000);

            map.setCenter(marker.getPosition());
            handleMarkerClick && handleMarkerClick(place.placeId);
          });

          //점선 패턴
          const lineSymbol = {
            path: "M 0,-1 0,1", // 선 모양
            strokeOpacity: 1,
            scale: 2, // 점선 간격
          };

          if (
            mapStore.getAddedPlace()?.length > 0 &&
            !map.data.hasOwnProperty("polyline")
          ) {
            const polyline = new google.maps.Polyline({
              path: places.map((p: any) => p.location),
              strokeColor: "#FF9E80",
              geodesic: true,
              strokeOpacity: 0,
              icons: [
                {
                  icon: lineSymbol,
                  offset: "0",
                  repeat: "10px",
                },
              ],
            });

            polyline.setMap(map);
            map.data.set("polyline", polyline);
          }
        }
      );
    }
  }, [map, places, focusCenterId]);

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
