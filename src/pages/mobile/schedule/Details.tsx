import styled from "styled-components";
import { InfoRow, InfoText } from "../../../assets/styles/home.style";
import PenIcon from "../../../assets/icons/PenIcon";
import { SubInfo } from "./Calendar";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import InviteIcon from "../../../assets/icons/InviteIcon";
import testImg from "../../../assets/images/testImg.png";
import BottomSheet from "../../../components/mobile/BottomSheet";
import { useDisplayStore } from "../../../store/display.store";
import { useEffect, useRef, useState } from "react";
import UserIcon from "../../../assets/icons/UserIcon";
import ClipIcon from "../../../assets/icons/ClipIcon";
import CustomInput from "../../../components/mobile/CustomInput";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import FileCheckIcon from "../../../assets/icons/FileCheckIcon";
import { useJPStore } from "../../../store/JPType.store";

type BottomSheetType = "AddPlace" | "Invite";

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <ArrowBox className="left" onClick={onClick}>
      <ArrowLeftIcon stroke="#6979F8" />
    </ArrowBox>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <ArrowBox className="right" onClick={onClick}>
      <ArrowRightIcon stroke="#6979F8" />
    </ArrowBox>
  );
}

export default function Details() {
  const { getBottomSheetHeight } = useDisplayStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [sheetOpen, setSheetOpen] = useState<BottomSheetType>("AddPlace");
  const [isIdAdd, setIsIdAdd] = useState(false);
  const [fillPlan, setFillPlan] = useState(false);
  const { jpState } = useJPStore();

  const navigate = useNavigate();

  const [currentDay, setCurrentDay] = useState(0);
  const slickSettings = {
    className: "center",
    centerMode: true,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
    centerPadding: "0px",
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current: number, next: number) => setCurrentDay(next),
  };

  const handleInviteClose = () => {
    setSheetOpen("AddPlace");
    setIsIdAdd(false);
  };

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
  return (
    <>
      <InfoRow>
        <DetailsInfoText>
          남해 여행
          <div>
            <PenIcon />
          </div>
        </DetailsInfoText>
      </InfoRow>

      <DetailsSubInfo>
        <ScheduleIcon stroke="#4d4d4d" />
        4.17 ~ 4.19(2박 3일)
      </DetailsSubInfo>

      <InviteRow>
        <InviteIcon handleClick={() => setSheetOpen("Invite")} />

        <ParticipantsRow>
          <img src={testImg} alt="참가자" />
          <img src={testImg} alt="참가자" />
          <img src={testImg} alt="참가자" />
        </ParticipantsRow>
      </InviteRow>

      <MapBox $bottomSheetHeight={getBottomSheetHeight()} ref={mapRef} />

      {sheetOpen === "AddPlace" && (
        <BottomSheet minH={6} maxH={0.75}>
          <DetailsContainer>
            <DetailsEditButton>
              <PenIcon stroke="#808080" />
              편집
            </DetailsEditButton>
            <DaySelector>
              <StyledSlider {...slickSettings}>
                <DayBox select={currentDay === 0}>Day 1</DayBox>
                <DayBox select={currentDay === 1}>Day 2</DayBox>
                <DayBox select={currentDay === 2}>Day 3</DayBox>
                <DayBox select={currentDay === 3}>Day 4</DayBox>
                <DayBox select={currentDay === 4}>Day 5</DayBox>
                <DayBox select={currentDay === 5}>Day 6</DayBox>
              </StyledSlider>
            </DaySelector>
            <PlanCol>
              <Plan>
                <TimeBox>10:10</TimeBox>
                <PlaceBox>
                  <PlaceIdx>1</PlaceIdx>
                  <PlaceTitleCol>
                    <p>금산 보리암</p>
                    <span>명소</span>
                  </PlaceTitleCol>
                </PlaceBox>
                {jpState === "J" && (
                  <PlaceDetailsButton fill={true}>
                    <FileCheckIcon />
                  </PlaceDetailsButton>
                )}
              </Plan>
              <Plan>
                <TimeBox>12:00</TimeBox>
                <PlaceBox>
                  <PlaceIdx>2</PlaceIdx>
                  <PlaceTitleCol>
                    <p>물건항</p>
                    <span>명소</span>
                  </PlaceTitleCol>
                </PlaceBox>
                {jpState === "J" && (
                  <PlaceDetailsButton>
                    <FileCheckIcon stroke={fillPlan ? "#6979F8" : "#B8B8B8"} />
                  </PlaceDetailsButton>
                )}
              </Plan>
              <Plan>
                <TimeBox>14:00</TimeBox>
                <PlaceBox>
                  <PlaceIdx>3</PlaceIdx>
                  <PlaceTitleCol>
                    <p>남해 보물섬전망대</p>
                    <span>명소</span>
                  </PlaceTitleCol>
                </PlaceBox>
                {jpState === "J" && (
                  <PlaceDetailsButton fill={true}>
                    <FileCheckIcon />
                  </PlaceDetailsButton>
                )}
              </Plan>
            </PlanCol>
          </DetailsContainer>
          <AddPlaceButton onClick={() => navigate("/addPlace")}>
            + 장소 추가
          </AddPlaceButton>
        </BottomSheet>
      )}

      {sheetOpen === "Invite" && (
        <BottomSheet
          isBlocking={true}
          isDismiss={true}
          handleClose={handleInviteClose}
          maxH={0.4}
        >
          {isIdAdd ? (
            <>
              <FindedUsersCol>
                <CustomInput text="아이디를 입력해주세요." value="" />
                <FindedUser>
                  <img src={testImg} alt="user" />
                  <span>mirae78</span>
                  <span>선택</span>
                </FindedUser>
                <FindedUser>
                  <img src={testImg} alt="user" />
                  <span>mirae78</span>
                  <span>선택</span>
                </FindedUser>
              </FindedUsersCol>
            </>
          ) : (
            <>
              <InviteBox>
                <h1>남해 여행</h1>

                <div>
                  <ScheduleIcon stroke="#4d4d4d" />
                  4.17 ~ 4.19(2박 3일)
                </div>

                <span>함께 여행 준비하는 여행 메이트를 초대해요.</span>
              </InviteBox>
              <InviteButtonRow>
                <button onClick={() => setIsIdAdd(true)}>
                  <UserIcon />
                  <span>아이디로 추가하기</span>
                </button>
                <button>
                  <ClipIcon />
                  <span>링크로 공유하기</span>
                </button>
              </InviteButtonRow>
            </>
          )}
        </BottomSheet>
      )}
    </>
  );
}

const DetailsInfoText = styled(InfoText)`
  display: flex;
  gap: 3px;

  & > div {
    display: flex;
    align-items: flex-end;
  }
`;

const DetailsSubInfo = styled(SubInfo)`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;
`;

const InviteRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ParticipantsRow = styled.div`
  position: relative;
  & > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    top: -12px;
  }
  & > img:nth-child(2) {
    left: 10px;
  }
  & > img:nth-child(3) {
    left: 20px;
  }
`;

const MapBox = styled.div<{ $bottomSheetHeight?: number }>`
  height: calc(
    100% - 37px - 28px - 24px -
      (${({ $bottomSheetHeight }) => `${$bottomSheetHeight || 0}px`})
  );
  width: calc(100% + 20px * 2);
  margin: 10px 0 0 -20px;
`;

const InviteBox = styled.div`
  & > h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.color.gray900};
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 3px;
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    margin: 10px 0 18px 0;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
  }

  padding: 30px 0 15px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray200};
`;

const InviteButtonRow = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > button {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 30px;
    border: 1px solid ${(props) => props.theme.color.secondary};

    & > span {
      color: ${(props) => props.theme.color.secondary};
      font-size: 14px;
    }
  }
`;

const FindedUsersCol = styled.div`
  padding: 20px 10px 0 10px;
  gap: 30px;

  display: flex;
  flex-direction: column;
`;

const FindedUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  & > span:nth-child(2) {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    flex: 1;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
  }
`;

const DetailsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;
const DetailsEditButton = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 3px;
  color: ${(props) => props.theme.color.gray500};
`;

const DaySelector = styled.div``;

const StyledSlider = styled(Slider)`
  text-align: center;
  display: flex;
`;

const ArrowBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DayBox = styled.div<{ select: boolean }>`
  width: 80px !important;
  padding: 8px 22px;
  white-space: nowrap;
  background-color: ${(props) =>
    props.select ? props.theme.color.secondary : props.theme.color.white};
  color: ${(props) =>
    props.select ? props.theme.color.white : props.theme.color.secondary};
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 16px;
  font-size: 14px;
  font-weight: 700;
`;

const PlanCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13px;
  gap: 24px;
  overflow-y: auto;
`;

const Plan = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const TimeBox = styled.div`
  padding: 8px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.color.secondaryLight};
  font-size: 14px;
`;

const PlaceBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  gap: 16px;
`;

const PlaceIdx = styled.div`
  padding: 5px 8px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.color.pointCoral};
  color: ${(props) => props.theme.color.white};
  font-size: 12px;
  font-weight: 700;
`;

const PlaceTitleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-weight: 700;

  & > span {
    color: ${(props) => props.theme.color.gray400};
    font-size: 12px;
    font-weight: normal;
  }
`;

const PlaceDetailsButton = styled.div<{ fill?: boolean }>`
  display: grid;
  place-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.fill ? props.theme.color.secondary : props.theme.color.gray300};
`;

const AddPlaceButton = styled.div`
  align-self: flex-end;
  text-align: center;
  padding: 13px 17px;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.white};
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);
`;
