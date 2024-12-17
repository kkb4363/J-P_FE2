import styled from "styled-components";
import NoButtonModal from "../NoButtonModal";
import ImageView from "../ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import { useEffect, useState } from "react";
import { SelectPlaceProps } from "../../../types/place";
import { getGooglePlaceDetail } from "../../../service/axios";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import TicketIcon from "../../../assets/icons/TicketIcon";
import AlarmIcon from "../../../assets/icons/AlarmIcon";
import IconBox from "../../IconBox";
import MarkIcon from "../../../assets/icons/MarkIcon";

interface Props {
  placeId: string;
  handleClose: () => void;
}

export default function AddedPlaceDetailModal(props: Props) {
  const [data, setData] = useState<SelectPlaceProps>();

  useEffect(() => {
    if (props?.placeId) {
      getGooglePlaceDetail({ placeId: props?.placeId }).then((res) => {
        if (res) setData(res?.data);
      });
    }
  }, [props?.placeId]);

  console.log(data);

  return (
    <NoButtonModal width="470px" height="390px" onClose={props.handleClose}>
      <>
        <ModalTopBox>
          <ImageView
            src={data?.photoUrls[0] ? data?.photoUrls[0] : ""}
            alt={data?.name ? data?.name : ""}
            width="130px"
            height="110px"
          />

          <div>
            <h1>{data?.name}</h1>
            <span>{data?.shortAddress}</span>
            <IconBox>
              <StarIcon />
              <span>{data?.rating}</span>
            </IconBox>
          </div>
        </ModalTopBox>
        <ModalBottomBox>
          <PlaceInfoBox>
            <div>
              <AlarmIcon />
              <span>
                {data?.weekdayText?.map((weekday, idx) => {
                  const todayIdx = new Date().getDay();
                  if (todayIdx === idx) return <span key={idx}>{weekday}</span>;
                })}
              </span>
            </div>
            <div>
              <TicketIcon />
              <span>
                {data?.website ? data?.website : "웹사이트는 지원하지 않습니다"}
              </span>
            </div>
            <div>
              <PhoneIcon />
              <span>
                {data?.formattedPhoneNumber
                  ? data?.formattedPhoneNumber
                  : "전화번호는 지원하지 않습니다"}
              </span>
            </div>
            <div>
              <MarkIcon width="18" height="18" stroke="#4d4d4d" />
              <span>
                {data?.fullAddress && data?.fullAddress?.length > 30
                  ? data?.fullAddress.slice(0, 30) + "..."
                  : data?.fullAddress}
              </span>
            </div>
          </PlaceInfoBox>
        </ModalBottomBox>
      </>
    </NoButtonModal>
  );
}

const ModalTopBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 0 20px;
  gap: 28px;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }
`;

const ModalBottomBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: center;
  padding: 36px;
`;

const PlaceInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;

    & > span {
      color: ${(props) => props.theme.color.gray700};
    }
  }
`;
