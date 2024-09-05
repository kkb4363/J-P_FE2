import styled from "styled-components";
import MarkIcon from "../../../assets/icons/MarkIcon";
import { useEffect, useRef } from "react";
import TwoButtonsModal from "../../../components/mobile/TwoButtonsModal";
import { useModal } from "../../../hooks/useModal";

export default function Mapview() {
  const mapRef = useRef<HTMLDivElement>(null);
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
        if ((window as any).google) {
          initMap();
        }
      }
    };

    const initMap = () => {
      if (mapRef.current) {
        const map = new (window as any).google.maps.Map(mapRef.current, {
          // publishing with 임시 좌표 값
          center: { lat: 37.579617, lng: 126.977041 },
          zoom: 16,
          mapTypeControl: false,
        });
      }
    };

    loadGoogleMapsScript();
  }, []);

  const {
    isOpen,
    openModal: test,
    closeModal,
    modalRef,
  } = useModal({ handleCloseCallback: () => {} });

  return (
    <>
      <Header>
        <MarkIcon stroke="#6979f8" width="20" height="20" />
        <span onClick={test}>주변 장소 더보기</span>
      </Header>

      <MapBox ref={mapRef} />

      {isOpen && (
        <TwoButtonsModal
          text="일정을 삭제할까요?"
          onClick={() => {}}
          onClose={closeModal}
          modalRef={modalRef}
        />
      )}
    </>
  );
}

const Header = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 14px;
    font-weight: 700;
  }
`;

const MapBox = styled.div`
  height: calc(100% - 30px - 10px);
  width: calc(100% + 20px * 2);
  margin-left: -20px;
`;
