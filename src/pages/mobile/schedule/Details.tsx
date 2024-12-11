import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipIcon from "../../../assets/icons/ClipIcon";
import InviteIcon from "../../../assets/icons/InviteIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import testImg from "../../../assets/images/testImg.png";
import { InfoRow } from "../../../assets/styles/home.style";
import * as D from "../../../assets/styles/scheduleDetail.style";
import CustomInput from "../../../components/CustomInput";
import CustomSkeleton from "../../../components/CustomSkeleton";
import DatesBox from "../../../components/DatesBox";
import BottomSheet from "../../../components/mobile/BottomSheet";
import PlanSheet from "../../../components/mobile/bottomSheets/PlanSheet";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import { getPlaceDetail, getSchedule } from "../../../service/axios";
import { useCurrentDayIdStore } from "../../../store/currentDayId.store";
import { useDisplayStore } from "../../../store/display.store";
import { useMapStore } from "../../../store/map.store";
import { ScheduleApiProps } from "../../../types/schedule";
import PlanPlaceSheet from "./../../../components/mobile/bottomSheets/PlanPlaceSheet";

const mapStyle = {
  margin: "10px 0 0 -20px",
};

type BottomSheetType = "AddPlace" | "Invite";

export default function Details() {
  const { getBottomSheetHeight } = useDisplayStore();
  const { getCurrentDayId, setCurrentDayId } = useCurrentDayIdStore();
  const { scheduleId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<ScheduleApiProps>(
    {} as ScheduleApiProps
  );

  const mapStore = useMapStore();
  const [loc, setLoc] = useState({
    lat: 0,
    lng: 0,
  });
  const currentDayPlaces = detail?.dayResDtos?.find(
    (d) => d.id === getCurrentDayId()
  )?.dayLocationResDtoList;

  const requestApi = () => {
    if (scheduleId) {
      setIsLoading(true);
      getSchedule(scheduleId).then((res) => {
        if (res) {
          setDetail(res?.data);
          setCurrentDayId(res.data.dayResDtos[0].id);
        }
      });
      setIsLoading(false);
    }
  };

  const getPlaceLocation = () => {
    getPlaceDetail({ placeId: detail?.place?.placeId }).then((res) => {
      if (res) {
        const location = res?.data.location;
        setLoc({
          lat: Number(location.lat),
          lng: Number(location.lng),
        });
      }
    });
  };

  useEffect(() => {
    requestApi();
  }, [scheduleId]);

  useEffect(() => {
    if (detail?.place?.placeId) {
      getPlaceLocation();
    }
  }, [detail?.place?.placeId]);

  useEffect(() => {
    if (loc?.lat) {
      mapStore.setAddedPlace(currentDayPlaces as any[]);
    }
  }, [getCurrentDayId(), loc?.lat]);

  const [sheetOpen, setSheetOpen] = useState<BottomSheetType>("AddPlace");
  const [isIdAdd, setIsIdAdd] = useState(false);
  const [isPlanPlace, setIsPlanPlace] = useState(false);

  const handleInviteClose = () => {
    setSheetOpen("AddPlace");
    setIsIdAdd(false);
  };
  
  if (isLoading) return <div>로딩중</div>;
  return (
    <>
      <InfoRow>
        <D.DetailsInfoText>
          {detail?.title}
          <div>
            <PenIcon />
          </div>
        </D.DetailsInfoText>
      </InfoRow>

      <DatesBox
        dates={{ startDate: detail?.startDate, endDate: detail?.endDate }}
      />

      <D.InviteRow>
        <InviteIcon handleClick={() => setSheetOpen("Invite")} />

        <D.ParticipantsRow>
          {detail?.member?.map((user, idx) => (
            <img
              key={idx}
              src={user.profile ? user.profile : testImg}
              alt={user.nickname}
            />
          ))}
        </D.ParticipantsRow>
      </D.InviteRow>

      {!loc?.lat ? (
        <CustomSkeleton width="100%" height="340px" />
      ) : (
        <CustomGoogleMap
          width="calc(100% + 20px * 2)"
          height={`calc(
    100% - 37px - 28px - 24px - ${getBottomSheetHeight()}px)`}
          lat={currentDayPlaces?.length === 0 ? loc?.lat : undefined}
          lng={currentDayPlaces?.length === 0 ? loc?.lng : undefined}
          style={mapStyle}
        />
      )}

      {sheetOpen === "AddPlace" &&
        (isPlanPlace ? (
          <PlanPlaceSheet setIsPlanPlace={setIsPlanPlace} />
        ) : (
          <PlanSheet
            setIsPlanPlace={setIsPlanPlace}
            detail={detail}
            requestApi={requestApi}
          />
        ))}

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
