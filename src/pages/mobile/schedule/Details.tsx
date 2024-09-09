import { InfoRow } from "../../../assets/styles/home.style";
import PenIcon from "../../../assets/icons/PenIcon";
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
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import { useJPStore } from "../../../store/JPType.store";
import { planItemProps } from "../../../types/schedule";
import { testPlanItems } from "../../../utils/staticDatas";
import { arrayMoveImmutable } from "array-move";
import { PlanList } from "../../../components/mobile/scheduleSort/PlanList";
import * as D from "../../../assets/styles/scheduleDetail.style";

type BottomSheetType = "AddPlace" | "Invite";

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <D.ArrowBox className="left" onClick={onClick}>
      <ArrowLeftIcon stroke="#6979F8" />
    </D.ArrowBox>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <D.ArrowBox className="right" onClick={onClick}>
      <ArrowRightIcon stroke="#6979F8" />
    </D.ArrowBox>
  );
}

export default function Details() {
  const { getBottomSheetHeight } = useDisplayStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [sheetOpen, setSheetOpen] = useState<BottomSheetType>("AddPlace");
  const [isIdAdd, setIsIdAdd] = useState(false);
  const [fillPlan, setFillPlan] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [planItems, setPlanItems] = useState<planItemProps[]>(testPlanItems);
  const [isDetailsMode, setIsDetailsMode] = useState(false);
  const [isDetailsEdit, setIsDetailsEdit] = useState(false);
  const [transport, setTransport] = useState("");
  const { jpState } = useJPStore();
  const navigate = useNavigate();

  // Day 설정
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

  // 드래그 이벤트
  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setPlanItems(arrayMoveImmutable(planItems, oldIndex, newIndex));
  };

  const handleTransportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setTransport(e.currentTarget.innerText);
  };
  console.log(isDetailsMode);

  return (
    <>
      <InfoRow>
        <D.DetailsInfoText>
          남해 여행
          <div>
            <PenIcon />
          </div>
        </D.DetailsInfoText>
      </InfoRow>

      <D.DetailsSubInfo>
        <ScheduleIcon stroke="#4d4d4d" />
        4.17 ~ 4.19(2박 3일)
      </D.DetailsSubInfo>

      <D.InviteRow>
        <InviteIcon handleClick={() => setSheetOpen("Invite")} />

        <D.ParticipantsRow>
          <img src={testImg} alt="참가자" />
          <img src={testImg} alt="참가자" />
          <img src={testImg} alt="참가자" />
        </D.ParticipantsRow>
      </D.InviteRow>

      <D.MapBox $bottomSheetHeight={getBottomSheetHeight()} ref={mapRef} />

      {sheetOpen === "AddPlace" && (
        <BottomSheet minH={6} maxH={0.75}>
          {!isDetailsMode && (
            <>
              <D.PlansContainer>
                <D.PlansEditButton onClick={() => setIsEdit((prev) => !prev)}>
                  <PenIcon stroke="#808080" />
                  편집
                </D.PlansEditButton>
                <D.DaySelector>
                  <D.StyledSlider {...slickSettings}>
                    <D.DayBox $select={currentDay === 0}>Day 1</D.DayBox>
                    <D.DayBox $select={currentDay === 1}>Day 2</D.DayBox>
                    <D.DayBox $select={currentDay === 2}>Day 3</D.DayBox>
                    <D.DayBox $select={currentDay === 3}>Day 4</D.DayBox>
                  </D.StyledSlider>
                </D.DaySelector>
                <PlanList
                  planItems={planItems}
                  onSortEnd={handleSortEnd}
                  helperClass="dragging-helper-class"
                  isEdit={isEdit}
                  jpState={jpState}
                  setIsDetailsMode={() => setIsDetailsMode((prev) => !prev)}
                  useWindowAsScrollContainer
                  useDragHandle
                />
              </D.PlansContainer>
              <D.AddPlaceButton onClick={() => navigate("/addPlace")}>
                + 장소 추가
              </D.AddPlaceButton>
            </>
          )}

          {isDetailsMode && (
            <D.PlanDetailsContainer>
              <D.PlansEditButton
                onClick={() => setIsDetailsEdit((prev) => !prev)}
              >
                {!isDetailsEdit && (
                  <>
                    <PenIcon stroke="#808080" />
                    편집
                  </>
                )}
                {isDetailsEdit && <p>완료</p>}
              </D.PlansEditButton>
              <D.PlanDetailsHeader>
                <div onClick={() => setIsDetailsMode(false)}>
                  <ArrowLeftIcon />
                </div>
                <p>플랜 추가</p>
                <D.EmptyBox />
              </D.PlanDetailsHeader>
              <D.PlanDetailsBody>
                <D.DetailsInput>
                  <textarea placeholder="여행 상세 일정" />
                </D.DetailsInput>
                <div>
                  <p>비용</p>
                  <D.CostInput>
                    <input placeholder="금액 입력" />
                  </D.CostInput>
                </div>
                <div>
                  <p>이동 수단 선택</p>
                  <D.TransportBox>
                    <D.TransPortItem
                      $select={transport === "자동차"}
                      onClick={handleTransportClick}
                    >
                      자동차
                    </D.TransPortItem>
                    <D.TransPortItem
                      $select={transport === "버스/지하철"}
                      onClick={handleTransportClick}
                    >
                      버스/지하철
                    </D.TransPortItem>
                    <D.TransPortItem
                      $select={transport === "기차"}
                      onClick={handleTransportClick}
                    >
                      기차
                    </D.TransPortItem>
                    <D.TransPortItem
                      $select={transport === "택시"}
                      onClick={handleTransportClick}
                    >
                      택시
                    </D.TransPortItem>
                  </D.TransportBox>
                </div>
              </D.PlanDetailsBody>
            </D.PlanDetailsContainer>
          )}
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
              <D.FindedUsersCol>
                <CustomInput text="아이디를 입력해주세요." value="" />
                <D.FindedUser>
                  <img src={testImg} alt="user" />
                  <span>mirae78</span>
                  <span>선택</span>
                </D.FindedUser>
                <D.FindedUser>
                  <img src={testImg} alt="user" />
                  <span>mirae78</span>
                  <span>선택</span>
                </D.FindedUser>
              </D.FindedUsersCol>
            </>
          ) : (
            <>
              <D.InviteBox>
                <h1>남해 여행</h1>

                <div>
                  <ScheduleIcon stroke="#4d4d4d" />
                  4.17 ~ 4.19(2박 3일)
                </div>

                <span>함께 여행 준비하는 여행 메이트를 초대해요.</span>
              </D.InviteBox>
              <D.InviteButtonRow>
                <button onClick={() => setIsIdAdd(true)}>
                  <UserIcon />
                  <span>아이디로 추가하기</span>
                </button>
                <button>
                  <ClipIcon />
                  <span>링크로 공유하기</span>
                </button>
              </D.InviteButtonRow>
            </>
          )}
        </BottomSheet>
      )}
    </>
  );
}
