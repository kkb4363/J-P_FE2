import { Wrapper, Status } from "@googlemaps/react-wrapper";
import RenderGoogleMap from "./RenderGoogleMap";
import CustomSkeleton from "../../CustomSkeleton";

export interface GoogleMapProps {
  width: string;
  height: string;
  style?: React.CSSProperties;
  lat: number;
  lng: number;
  handleMarkerClick?: (id: string) => void;
}

export default function CustomGoogleMap({
  width,
  height,
  lat,
  lng,
  style,
  handleMarkerClick,
}: GoogleMapProps) {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <CustomSkeleton width={width} height={height} borderRadius="16px" />
        );
      case Status.FAILURE:
        return <>Error</>;
      case Status.SUCCESS:
        return (
          <RenderGoogleMap
            width={width}
            height={height}
            lat={lat}
            lng={lng}
            style={style}
            handleMarkerClick={handleMarkerClick}
          />
        );
    }
  };

  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      render={render}
      libraries={["places"]}
    />
  );
}
