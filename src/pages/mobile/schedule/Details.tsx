import { useState } from "react";
import BottomSheet from "../../../components/mobile/BottomSheet";
import PlanSheet from "../../../components/mobile/bottomSheets/PlanSheet";
import PlanPlaceSheet from "./../../../components/mobile/bottomSheets/PlanPlaceSheet";
import CustomInput from "../../../components/mobile/CustomInput";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";
import * as D from "../../../assets/styles/scheduleDetail.style";
import ClipIcon from "../../../assets/icons/ClipIcon";
import InviteIcon from "../../../assets/icons/InviteIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import testImg from "../../../assets/images/testImg.png";
import { InfoRow } from "../../../assets/styles/home.style";
import { useDisplayStore } from "../../../store/display.store";

type BottomSheetType = "AddPlace" | "Invite";

export default function Details() {
  const { getBottomSheetHeight } = useDisplayStore();

  const [sheetOpen, setSheetOpen] = useState<BottomSheetType>("AddPlace");
  const [isIdAdd, setIsIdAdd] = useState(false);
  const [isPlanPlace, setIsPlanPlace] = useState(false);

  const mapStyle = {
    margin: "10px 0 0 -20px",
  };

  const handleInviteClose = () => {
    setSheetOpen("AddPlace");
    setIsIdAdd(false);
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

      <CustomGoogleMap
        width="calc(100% + 20px * 2)"
        height={`calc(
    100% - 37px - 28px - 24px - ${getBottomSheetHeight()}px)`}
        lat={37.579617}
        lng={126.977041}
        style={mapStyle}
      />

      {sheetOpen === "AddPlace" &&
        (isPlanPlace ? (
          <PlanPlaceSheet setIsPlanPlace={setIsPlanPlace} />
        ) : (
          <PlanSheet setIsPlanPlace={setIsPlanPlace} />
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
