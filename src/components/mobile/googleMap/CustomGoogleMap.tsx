import { Wrapper, Status } from "@googlemaps/react-wrapper";
import RenderGoogleMap from "./RenderGoogleMap";
import CustomSkeleton from "../../CustomSkeleton";
import { GoogleMapProps } from "../../../types/common";

export default function CustomGoogleMap({
  width,
  height,
  lat,
  lng,
  style,
  handleMarkerClick,
  focusCenterId,
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
            focusCenterId={focusCenterId}
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
