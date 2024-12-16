import { useEffect, useState } from "react";
import AlarmIcon from "../../../assets/icons/AlarmIcon";
import CancelIcon from "../../../assets/icons/CancelIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import TicketIcon from "../../../assets/icons/TicketIcon";
import * as S from "../../../assets/styles/nearplace.style";
import * as D from "../../../assets/styles/scheduleDetail.style";
import { getGooglePlaceDetail } from "../../../service/axios";
import { useSelectPlanItemStore } from "../../../store/selectPlanItem.store";
import { SelectPlaceProps } from "../../../types/place";
import CustomSkeleton from "../../CustomSkeleton";
import IconBox from "../../IconBox";
import ImageView from "../../ImageView";
import BottomSheet from "../BottomSheet";

interface Props {
  setIsPlanPlace: (value: boolean) => void;
}

export default function PlanPlaceSheet({ setIsPlanPlace }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { getPlanPlaceId, setPlanItemId, setPlanPlaceId } =
    useSelectPlanItemStore();
  const [placeData, setPlaceData] = useState<SelectPlaceProps>();

  const handleCloseClick = () => {
    setPlanItemId(undefined);
    setPlanPlaceId(undefined);
    setIsPlanPlace(false);
  };

  const getGooglePlaceApi = async () => {
    setIsLoading(true);
    await getGooglePlaceDetail({ placeId: getPlanPlaceId()! }).then((res) => {
      setPlaceData(res!.data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (getPlanPlaceId()) {
      getGooglePlaceApi();
    }
  }, [getPlanPlaceId]);

  return (
    <BottomSheet maxH={0.4}>
      <div>
        <D.CancelIconBox>
          <CancelIcon size="24" onClick={handleCloseClick} />
        </D.CancelIconBox>
        {placeData && (
          <D.PlanPlaceContainer>
            <D.PlaceHeader>
              {isLoading ? (
                <CustomSkeleton
                  width="80px"
                  height="78px"
                  borderRadius="16px"
                />
              ) : (
                <ImageView
                  src={placeData.photoUrls[0]}
                  alt="일정 장소 이미지"
                  width="80px"
                  height="78px"
                />
              )}
              <D.PlaceTitleBox>
                <h1>{placeData.name}</h1>
                <span>{placeData.shortAddress}</span>
                <IconBox>
                  <StarIcon />
                  <span>{placeData.rating}</span>
                </IconBox>
              </D.PlaceTitleBox>
            </D.PlaceHeader>
            <D.Line />
            <S.SelectPlaceDetailCol>
              <div>
                <AlarmIcon />
                <S.PlaceWeekdayBox>
                  {placeData.weekdayText.map((weekday, idx) => {
                    return <span key={idx}>{weekday}</span>;
                  })}
                </S.PlaceWeekdayBox>
              </div>
              <div>
                <TicketIcon />
                <span></span>
              </div>
              <div>
                <InfoIcon />
                <span>{placeData.formattedPhoneNumber}</span>
              </div>
              <div>
                <MarkIcon width="18" height="18" />
                <span>{placeData.fullAddress}</span>
              </div>
            </S.SelectPlaceDetailCol>
          </D.PlanPlaceContainer>
        )}
      </div>
    </BottomSheet>
  );
}
