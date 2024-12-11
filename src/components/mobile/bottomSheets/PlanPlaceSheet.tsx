import * as D from "../../../assets/styles/scheduleDetail.style";
import * as S from "../../../assets/styles/nearplace.style";
import BottomSheet from "../BottomSheet";
import { testImg1 } from "../../../utils/staticDatas";
import ImageView from "../../ImageView";
import AlarmIcon from "../../../assets/icons/AlarmIcon";
import CancelIcon from "../../../assets/icons/CancelIcon";
import TicketIcon from "../../../assets/icons/TicketIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";
import { useSelectPlanItemStore } from "../../../store/selectPlanItem.store";

interface Props {
  setIsPlanPlace: (value: boolean) => void;
}

export default function PlanPlaceSheet({ setIsPlanPlace }: Props) {
  const {getPlanItemId, setPlanItemId} = useSelectPlanItemStore();

  const handleCloseClick = () => {
    setPlanItemId(undefined);
    setIsPlanPlace(false);
  }
  
  return (
    <BottomSheet maxH={0.4}>
      <div>
        <D.CancelIconBox>
          <CancelIcon size="24" onClick={handleCloseClick} />
        </D.CancelIconBox>
        <D.PlanPlaceContainer>
          <D.PlaceHeader>
            <ImageView
              src={testImg1}
              alt="일정 장소 이미지"
              width="60px"
              height="60px"
            />
            <D.PlaceTitleBox>
              <h3>금산 보리암</h3>
            </D.PlaceTitleBox>
          </D.PlaceHeader>
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
    </BottomSheet>
  );
}
