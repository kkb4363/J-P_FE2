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
import { testDayList, testPlanItems } from "../../../utils/staticDatas";
import { arrayMoveImmutable } from "array-move";
import { PlanList } from "../../../components/mobile/scheduleSort/PlanList";
import PlanCalendarIcon from "../../../assets/icons/PlanCalendarIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import TrainIcon from "../../../assets/icons/TrainIcon";
import ImageView from "../../../components/mobile/ImageView";
import * as S from "../../../assets/styles/nearplace.style";
import * as D from "../../../assets/styles/scheduleDetail.style";
import AlarmIcon from "../../../assets/icons/AlarmIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";
import TicketIcon from "../../../assets/icons/TicketIcon";
import PrevArrow from "../../../components/mobile/SlideArrows/PrevArrow";
import NextArrow from "../../../components/mobile/SlideArrows/NextArrow";
import CancelIcon from "../../../assets/icons/CancelIcon";

type BottomSheetType = "AddPlace" | "Invite";

export default function Details() {
  const { getBottomSheetHeight } = useDisplayStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [sheetOpen, setSheetOpen] = useState<BottomSheetType>("AddPlace");
  const [isIdAdd, setIsIdAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [planItems, setPlanItems] = useState<planItemProps[]>(testPlanItems);
  const [isPlanDetail, setIsPlanDetail] = useState(false);
  const [isPlanPlace, setIsPlanPlace] = useState(false);
  const [isDetailsEdit, setIsDetailsEdit] = useState(false);
  const [transport, setTransport] = useState("");
  const [currentDay, setCurrentDay] = useState(0);
  const { jpState } = useJPStore();
  const navigate = useNavigate();
  const daySlideSettings = {
    infinite: false,
    focusOnSelect: true,
    focusOnChange: true,
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleInviteClose = () => {
    setSheetOpen("AddPlace");
    setIsIdAdd(false);
  };

  const handleDayClick = (day: number) => {
    setCurrentDay(day);
  };

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      const existingScript = document.getElementById("google-maps");
      if (!existingScript) {
        const script = document.createElement("sc ript");
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
    if (isDetailsEdit) {
      setTransport(e.currentTarget.innerText);
    }
  };

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
        <BottomSheet maxH={isPlanPlace ? 0.4 : 0.75}>
          {/* 일정 목록 */}
          {!isPlanDetail && !isPlanPlace && (
            <>
              <D.PlansBox>
                <D.PlansEditButton onClick={() => setIsEdit((prev) => !prev)}>
                  {isEdit ? (
                    <p>완료</p>
                  ) : (
                    <>
                      <PenIcon stroke="#808080" />
                      <span>편집</span>
                    </>
                  )}
                </D.PlansEditButton>
                <div>
                  <D.StyledSlider {...daySlideSettings}>
                    {testDayList.map((day, i) => (
                      <D.DayBox
                        key={i}
                        onClick={() => handleDayClick(day)}
                        $select={currentDay === day}
                      >{`Day ${day + 1}`}</D.DayBox>
                    ))}
                  </D.StyledSlider>
                </div>
                <PlanList
                  planItems={planItems}
                  onSortEnd={handleSortEnd}
                  helperClass="dragging-helper-class"
                  isEdit={isEdit}
                  jpState={jpState}
                  setIsPlanDetail={() => setIsPlanDetail((prev) => !prev)}
                  setIsPlanPlace={() => setIsPlanPlace((prev) => !prev)}
                  useWindowAsScrollContainer
                  useDragHandle
                />
              </D.PlansBox>
              <D.AddPlaceButton onClick={() => navigate("/addPlace")}>
                + 장소 추가
              </D.AddPlaceButton>
            </>
          )}

          {/* 일정 장소 상세 */}
          {isPlanPlace && (
            <div>
              <D.CancelIconBox>
                <CancelIcon size="24" onClick={() => setIsPlanPlace(false)} />
              </D.CancelIconBox>
              <D.PlanPlaceContainer>
                <D.PlaceTitleBox>
                  <ImageView
                    src={testImg}
                    alt="일정 장소 이미지"
                    width="60px"
                    height="60px"
                  />
                  <p>금산 보리암</p>
                </D.PlaceTitleBox>
                <D.Line />
                <S.SelectPlaceDetailCol>
                  <div>
                    <AlarmIcon />
                    <span>연중무휴</span>
                  </div>
                  <div>
                    <TicketIcon />
                    <span>개인 1,000원 단체 800원</span>
                  </div>
                  <div>
                    <InfoIcon />
                    <span>02-1111-1111</span>
                  </div>
                  <div>
                    <MarkIcon width="18" height="18" />
                    <span>전남 구례시</span>
                  </div>
                </S.SelectPlaceDetailCol>
              </D.PlanPlaceContainer>
            </div>
          )}

          {/* 일정 상세 */}
          {isPlanDetail && (
            <div>
              <D.PlanDetailsHeader>
                <div onClick={() => setIsPlanDetail(false)}>
                  <ArrowLeftIcon />
                </div>
                <span>플랜 추가</span>
                <p onClick={() => setIsDetailsEdit((prev) => !prev)}>
                  {isDetailsEdit ? "완료" : "수정"}
                </p>
              </D.PlanDetailsHeader>
              <D.PlanDetailsBody>
                <div>
                  <D.SubTitleBox>
                    <PlanCalendarIcon />
                    <p>일정</p>
                  </D.SubTitleBox>
                  <D.DetailsInput>
                    <textarea
                      placeholder="여행 상세 일정"
                      readOnly={!isDetailsEdit}
                    />
                  </D.DetailsInput>
                </div>
                <div>
                  <D.SubTitleBox>
                    <CardIcon />
                    <p>비용</p>
                  </D.SubTitleBox>
                  <D.CostInput>
                    <input placeholder="금액 입력" readOnly={!isDetailsEdit} />
                  </D.CostInput>
                </div>
                <div>
                  <D.SubTitleBox>
                    <TrainIcon />
                    <p>이동 수단</p>
                  </D.SubTitleBox>
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
            </div>
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
