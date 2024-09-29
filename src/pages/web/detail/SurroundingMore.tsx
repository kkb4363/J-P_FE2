import styled from "styled-components";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import MarkIcon from "../../../assets/icons/MarkIcon";
import SurroundingMoreAddCard from "../../../components/web/home/SurroundingMoreAddCard";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useMapStore } from "../../../store/map.store";

import NobuttonModal from "../../../components/mobile/NobuttonModal";
import { SelectPlaceProps } from "../../../types/home.details";

export default function SurroundingMore() {
  const param = useParams();
  const mapStore = useMapStore();
  const [selectPlace, setSelectPlace] = useState<SelectPlaceProps>(
    {} as SelectPlaceProps
  );

  const getSurroundingPlace = async () => {
    try {
      axiosInstance
        .get(
          `/googleplace/nearby-search/page?lat=${param?.lat}&lng=${param?.lng}&radius=10`
        )
        .then((res) => {
          if (res.status === 200) {
            mapStore.setNearPlace(res.data.results);
          }
        });
    } catch (error) {
      console.error("nearbyPlace Api Error=", error);
    }
  };

  const handlePlaceClick = async (placeId: string) => {
    try {
      axiosInstance
        .get(`/googleplace/details?placeId=${placeId}`)
        .then((res) => {
          if (res.status === 200) {
            setSelectPlace(res.data);
          }
        });
    } catch (err) {
      console.error("place marker click error=", err);
    }
  };

  useEffect(() => {
    if (param.lng && param.lat) {
      getSurroundingPlace();
    }
  }, [param?.lng, param?.lat]);

  return (
    <>
      <MoreContainer>
        <SideBar>
          <h1>주변 여행지</h1>
          <h2>
            <MarkIcon width="16" height="16" />
            섬진강 벚꽃길
          </h2>
          <CardCol>
            {mapStore.getNearPlace()?.map((card) => (
              <SurroundingMoreAddCard
                key={card.placeId}
                imgSrc={card.photoUrls[0]}
                name={card.name}
                subName={card.shortAddress}
                rating={card.rating}
              />
            ))}
          </CardCol>
        </SideBar>

        {param?.lng && (
          <CustomGoogleMap
            width="100%"
            height="98%"
            lat={Number(param?.lat)}
            lng={Number(param?.lng)}
            handleMarkerClick={handlePlaceClick}
          />
        )}
      </MoreContainer>
      {!!selectPlace?.placeId && (
        <NobuttonModal onClose={() => setSelectPlace({} as SelectPlaceProps)}>
          <div>test</div>
        </NobuttonModal>
      )}
    </>
  );
}

const MoreContainer = styled.div`
  width: calc(100% + 240px);
  height: calc(100% + 80px);
  margin-left: -120px;
  margin-bottom: -80px;
  min-height: 756px;
  display: flex;
  overflow-y: scroll;
`;

const SideBar = styled.div`
  width: 390px;
  height: 100%;
  min-height: 756px;
  background-color: ${(props) => props.theme.color.white};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }

  & > h2 {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.gray700};
    font-size: 16px;
    font-weight: 700;
    margin: 16px 0 18px 0;
  }
`;

const CardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow-y: scroll;
  ${scrollHidden};
`;
