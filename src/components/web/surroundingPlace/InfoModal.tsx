import styled from "styled-components";
import ImageView from "../ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import AlarmIcon from "../../../assets/icons/AlarmIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";

interface Props {
  imgSrc: string;
  title: string;
  shortAddress: string;
  rating: number;
  businessStatus: string;
  phoneNumber: string;
  fullAddress: string;
}

export default function InfoModal(props: Props) {
  return (
    <>
      <ModalTopBox>
        <ImageView
          src={props.imgSrc}
          alt="이미지없음"
          width="160px"
          height="145px"
        />
        <div>
          <h1>{props.title}</h1>
          <p>{props.shortAddress}</p>
          <span>
            <StarIcon />
            {props.rating}
          </span>
        </div>
        <ModalAddButton>
          <span>+ 여행지 추가</span>
        </ModalAddButton>
      </ModalTopBox>
      <ModalBottomBox>
        <span>
          <AlarmIcon /> {props.businessStatus}
        </span>
        <span>
          <InfoIcon />{" "}
          {!props.phoneNumber ? "전화번호 없음" : props.phoneNumber}
        </span>
        <span>
          <MarkIcon width="18" height="18" /> {props.fullAddress}
        </span>
      </ModalBottomBox>
    </>
  );
}

const ModalTopBox = styled.div`
  height: 145px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 22px;
  position: relative;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    & > h1 {
      color: ${(props) => props.theme.color.gray900};
      font-size: 24px;
      font-weight: 700;
    }
    & > p {
      color: ${(props) => props.theme.color.gray700};
      font-size: 16px;
    }
    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
`;

const ModalAddButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 120px;
  height: 44px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.main};
  background-color: ${(props) => props.theme.color.main};
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
  }
`;

const ModalBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > span {
    display: flex;
    align-items: center;
    gap: 9px;
    color: ${(props) => props.theme.color.gray700};
    font-size: 16px;
  }
`;
