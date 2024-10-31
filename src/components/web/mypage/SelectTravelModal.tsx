import styled from "styled-components";
import OneButtonModal from "../../OneButtonModal";
import MyTravelCard from "./MyTravelCard";
import { scrollHidden } from "../../../assets/styles/home.style";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}

export default function SelectTravelModal({ onClose }: Props) {
  const navigate = useNavigate();
  const hasTravel = true;

  return (
    <OneButtonModal
      isMobile={false}
      title="여행을 선택해주세요."
      onClick={() => navigate("/home/writeTravelogue")}
      onClose={onClose}
      width="580px"
      height="417px"
      buttonText="다음"
      noBtn={!hasTravel}
    >
      {hasTravel ? (
        <TravelCardCol>
          <MyTravelCard />
          <MyTravelCard />
        </TravelCardCol>
      ) : (
        <NoTravelCardBox>
          <h1>내 여행</h1>
          <div>
            <CalendarCheckIcon stroke="#b8b8b8" />
            <span>일정이 없어요. 새로운 여행 일정을 추가해주세요.</span>
          </div>
          <CustomAddTravelButton>
            <PlusIcon stroke="white" />
            <span>일정 생성</span>
          </CustomAddTravelButton>
        </NoTravelCardBox>
      )}
    </OneButtonModal>
  );
}

const TravelCardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 200px;
  overflow-y: scroll;
  ${scrollHidden};
`;

const NoTravelCardBox = styled.div`
  margin-top: 30px;
  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }

  & > div {
    display: flex;
    align-items: center;
    margin-top: 47px;

    & > span {
      color: ${(props) => props.theme.color.gray300};
      font-size: 16px;
    }
  }
`;

export const AddTravelButton = styled.button`
  width: 103px;
  height: 44px;
  border-radius: 30px;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);
  background-color: ${(props) => props.theme.color.main};

  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
  }
`;

const CustomAddTravelButton = styled(AddTravelButton)`
  margin: 0 auto;
  margin-top: 83px;
`;
