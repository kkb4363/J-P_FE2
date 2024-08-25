import styled from "styled-components";
import { InfoRow, InfoText } from "../../../assets/styles/home.style";
import PenIcon from "../../../assets/icons/PenIcon";
import { SubInfo } from "./Calendar";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import InviteIcon from "../../../assets/icons/InviteIcon";
import testImg from "../../../assets/images/testImg.png";
import BottomSheet from "../../../components/mobile/BottomSheet";
import { useDisplayStore } from "../../../store/display.store";

export default function Details() {
  const { getBottomSheetHeight } = useDisplayStore();
  console.log(getBottomSheetHeight());
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
        <InviteIcon />
        <ParticipantsRow>
          <img src={testImg} alt="참가자" />
          <img src={testImg} alt="참가자" />
          <img src={testImg} alt="참가자" />
        </ParticipantsRow>
      </InviteRow>

      <MapBox $bottomSheetHeight={getBottomSheetHeight()}></MapBox>

      <BottomSheet minH={6} maxH={0.75}>
        <div>일정</div>
      </BottomSheet>
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
  background-color: tomato;
`;
