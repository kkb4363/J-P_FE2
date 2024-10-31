import styled from "styled-components";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import MarkIcon from "../../../assets/icons/MarkIcon";
import SurroundingMoreAddCard from "../../../components/web/home/SurroundingMoreAddCard";
import { scrollHidden } from "../../../assets/styles/home.style";
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

import NoScheduleModal from "../../../components/web/surroundingPlace/NoScheduleModal";
import ScheduleModal from "../../../components/web/surroundingPlace/ScheduleModal";
import SuccessModal from "../../../components/web/surroundingPlace/SuccessModal";

export default function SurroundingMore() {
  const param = useParams();
  const mapStore = useMapStore();
  const [selectPlace, setSelectPlace] = useState<SelectPlaceProps>(
    {} as SelectPlaceProps
  );

  const getPlace = async () => {
    getSurroundingPlace({ lat: param?.lat + "", lng: param?.lng + "" }).then(
      (res) => {
        mapStore.setNearPlace(res?.data.results);
      }
    );
  };

  const handlePlaceClick = async (placeId: string) => {
    getGooglePlaceDetail({ placeId: placeId }).then((res) => {
      setSelectPlace(res!.data);
    });
  };

  useEffect(() => {
    if (param.lng && param.lat) {
      getPlace();
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
        <NoButtonModal
          width="530px"
          height="380px"
          onClose={() => setSelectPlace({} as SelectPlaceProps)}
        >
          <ModalContainer>
            <InfoModal
              imgSrc={selectPlace?.photoUrls[0]}
              title={selectPlace?.name}
              shortAddress={selectPlace?.shortAddress}
              rating={selectPlace?.rating}
              businessStatus={selectPlace?.businessStatus}
              phoneNumber={selectPlace?.formattedPhoneNumber}
              fullAddress={selectPlace?.fullAddress}
            />

            {/* <NoScheduleModal /> */}

            {/* <ScheduleModal /> */}

            {/* <SuccessModal /> */}
          </ModalContainer>
        </NoButtonModal>
      )}
    </>
  );
}

const MoreContainer = styled.div`
  // outlet Box padding 없애기
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

const ModalContainer = styled.div`
  width: 530px;
  height: 380px;
  border-radius: 30px;
  padding: 0 38px 58px 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
