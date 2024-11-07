import styled from "styled-components";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import MarkIcon from "../../../assets/icons/MarkIcon";
import SurroundingMoreAddCard from "../../../components/web/home/SurroundingMoreAddCard";
import {
  extendedContainerStyle,
  scrollHidden,
} from "../../../assets/styles/home.style";
import { useParams } from "react-router-dom";
import {
  getGooglePlaceDetail,
  getSurroundingPlace,
} from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useMapStore } from "../../../store/map.store";

import { SelectPlaceProps } from "../../../types/home.details";
import InfoModal from "../../../components/web/surroundingPlace/InfoModal";
import NoButtonModal from "../../../components/web/NoButtonModal";

import ScheduleModal from "../../../components/web/surroundingPlace/ScheduleModal";
import SuccessModal from "../../../components/web/surroundingPlace/SuccessModal";
import { useModalStore } from "../../../store/modal.store";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

const cookies = new Cookies();

export default function SurroundingMore() {
  const param = useParams();
  const mapStore = useMapStore();
  const modalStore = useModalStore();
  const [selectPlace, setSelectPlace] = useState<SelectPlaceProps>(
    {} as SelectPlaceProps
  );

  const getPlaceApi = async () => {
    getSurroundingPlace({ lat: param?.lat + "", lng: param?.lng + "" }).then(
      (res) => {
        mapStore.setNearPlace(res?.data.results);
      }
    );
  };

  const handleMarkerClick = async (placeId: string) => {
    getGooglePlaceDetail({ placeId: placeId }).then((res) => {
      setSelectPlace(res!.data);
      modalStore.setCurrentModal("placeInfo");
    });
  };

  const handlePlaceAddCardClick = (placeId: string) => {
    if (!cookies.get("userToken")) {
      return toast(<span>로그인이 필요합니다.</span>);
    }

    modalStore.setCurrentModal("addPlan");
    setSelectPlace((p) => ({
      ...p,
      placeId: placeId,
    }));
  };

  const handlePlaceAddModalClose = () => {
    setSelectPlace({} as SelectPlaceProps);
    modalStore.setCurrentModal("");
  };

  useEffect(() => {
    if (param.lng && param.lat) {
      getPlaceApi();
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
                imgSrc={card.photoUrl}
                name={card.name}
                subName={card.shortAddress}
                rating={card.rating}
                onClick={() => handlePlaceAddCardClick(card.placeId)}
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
            handleMarkerClick={handleMarkerClick}
          />
        )}
      </MoreContainer>

      {!!selectPlace?.placeId && (
        <NoButtonModal
          width="530px"
          height="380px"
          onClose={handlePlaceAddModalClose}
        >
          <PlaceAddModalContainer>
            {modalStore.getCurrentModal() === "placeInfo" && (
              <InfoModal
                imgSrc={selectPlace?.photoUrls[0]}
                title={selectPlace?.name}
                shortAddress={selectPlace?.shortAddress}
                rating={selectPlace?.rating}
                businessStatus={selectPlace?.businessStatus}
                phoneNumber={selectPlace?.formattedPhoneNumber}
                fullAddress={selectPlace?.fullAddress}
              />
            )}

            {modalStore.getCurrentModal() === "addPlan" && (
              <ScheduleModal placeId={selectPlace?.placeId} />
            )}

            {modalStore.getCurrentModal() === "successAddPlan" && (
              <SuccessModal />
            )}
          </PlaceAddModalContainer>
        </NoButtonModal>
      )}
    </>
  );
}

const MoreContainer = styled.div`
  ${extendedContainerStyle};
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

export const PlaceAddModalContainer = styled.div`
  width: 530px;
  height: 380px;
  border-radius: 30px;
  padding: 0 38px 58px 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
