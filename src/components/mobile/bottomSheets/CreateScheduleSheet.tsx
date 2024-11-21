import styled from "styled-components";
import BottomSheet from "../BottomSheet";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import { scrollHidden } from "../../../assets/styles/home.style";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { getMySchedules } from "../../../service/axios";

interface Props {
  handleClose: () => void;
  placeId: string;
}

const cookies = new Cookies();

export default function CreateScheduleSheet({ handleClose, placeId }: Props) {
  const navigate = useNavigate();
  const [isSelect, setIsSelect] = useState(false);
  const handleSelect = () => {
    setIsSelect(true);
  };

  const handlePlaceAdd = () => {
    toast(
      <AddScheduleSuccess>
        <span>일정에 추가 되었습니다.</span>
        <span onClick={() => navigate("/home/schedule")}>
          내 일정 보기 <ArrowRightIcon stroke="#6979F8" />
        </span>
      </AddScheduleSuccess>
    );
    handleClose();
  };

  const handlePlaceCreate = () => {
    if (!!cookies.get("userToken")) {
      navigate("/Schedule");
    } else {
      toast(<span>로그인이 필요합니다.</span>);
    }
  };

  useEffect(() => {
    getMySchedules().then((res) => console.log(res));
  });

  const hasSchedule = true;
  console.log(placeId);

  return (
    <BottomSheet
      isBlocking={true}
      maxH={0.5}
      isDismiss={true}
      handleClose={handleClose}
    >
      {hasSchedule ? (
        <AddPlaceContainer>
          <h1>내 여행 일정</h1>
          <AddPlaceCardCol>
            <AddPlaceCard $isSelect={isSelect}>
              <span>경주</span>
              <div>4.25 ~ 4.27(2박 3일)</div>
              <span onClick={handleSelect}>{!isSelect && "선택"}</span>
            </AddPlaceCard>
          </AddPlaceCardCol>

          <AddPlaceDayListRow>
            {isSelect && (
              <>
                <AddPlaceDayListBox $isSelect={true}>
                  <p>Day1</p>
                  <span>4.25(목)</span>
                </AddPlaceDayListBox>
                <AddPlaceDayListBox $isSelect={false}>
                  <p>Day2</p>
                  <span>4.26(금)</span>
                </AddPlaceDayListBox>
                <AddPlaceDayListBox $isSelect={false}>
                  <p>Day3</p>
                  <span>4.27(토)</span>
                </AddPlaceDayListBox>
              </>
            )}
          </AddPlaceDayListRow>

          {isSelect && (
            <AddPlaceButton onClick={handlePlaceAdd}>
              <span>추가하기</span>
            </AddPlaceButton>
          )}
        </AddPlaceContainer>
      ) : (
        <AddPlaceContainer>
          <NoScheduleTitle>
            <CalendarIcon />
            <span> 일정이 없어요. 여행 일정을 등록해봐요!</span>
          </NoScheduleTitle>

          <AddScheduleButton onClick={handlePlaceCreate}>
            <span>일정 등록하기</span>
          </AddScheduleButton>
        </AddPlaceContainer>
      )}
    </BottomSheet>
  );
}

const AddPlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 5px 8px;
  min-height: 330px;
  & > h1 {
    text-align: center;
    color: ${(props) => props.theme.color.black};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const AddPlaceCardCol = styled.div`
  height: 80px;
  width: 100%;
  overflow-y: scroll;
  ${scrollHidden};

  display: flex;
  gap: 6px;
  flex-direction: column;
`;

// 일정 있을 때
const AddPlaceCard = styled.div<{ $isSelect: boolean }>`
  min-height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) =>
    props.$isSelect ? props.theme.color.gray200 : props.theme.color.white};
  padding: 0 16px;

  & > span:first-child {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    flex: 1;
    white-space: nowrap;
  }

  & > div {
    flex: 3;
    font-size: 14px;
    color: ${(props) => props.theme.color.gray900};
    line-height: 150%;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    flex: 0.5;
    white-space: nowrap;
  }
`;

const AddPlaceDayListRow = styled.div`
  padding: 0 30px 30px 30px;
  display: flex;
  align-items: center;
  flex: 1;
  gap: 18px;
`;

const AddPlaceDayListBox = styled.div<{ $isSelect: boolean }>`
  width: 80px;
  height: 61px;
  border: 1px solid
    ${(props) =>
      props.$isSelect ? props.theme.color.main : props.theme.color.gray200};
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  & > p {
    color: ${(props) =>
      props.$isSelect ? props.theme.color.main : props.theme.color.gray700};
    font-weight: 700;
    font-size: 14px;
  }

  & > span {
    color: ${(props) =>
      props.$isSelect ? props.theme.color.main : props.theme.color.gray400};
    font-weight: 500;
    font-size: 12px;
  }
`;

const AddPlaceButton = styled.button`
  width: 190px;
  height: 45px;
  padding: 12px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.main};
  margin-top: 30px;

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
`;

// 일정 없을 때
const NoScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  padding-bottom: 50px;
  flex: 1;
  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 16px;
    font-weight: 400;
  }
`;

const AddScheduleButton = styled.button`
  width: 190px;
  height: 45px;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  background-color: ${(props) => props.theme.color.white};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }
`;

const AddScheduleSuccess = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span:first-child {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 400;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.secondary};
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;
