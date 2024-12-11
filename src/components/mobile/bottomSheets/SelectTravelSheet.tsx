import styled from "styled-components";
import BottomSheet from "../BottomSheet";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";
import { TravelCard } from "../../../pages/mobile/mypage/Travel";
import {
  AddScheduleBox,
  AddScheduleButton,
} from "../../../assets/styles/homeDetail.style";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getScheduleList } from "../../../service/axios";
import { ScheduleApiProps } from "../../../types/schedule";
import { scrollHidden } from "../../../assets/styles/home.style";
import PrimaryButton from "../../PrimaryButton";
import PlusIcon from "../../../assets/icons/PlusIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectTravelSheet({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState<ScheduleApiProps[]>([]);
  const [scheduleId, setScheduleId] = useState<number>(0);

  useEffect(() => {
    getScheduleList().then((res) => {
      setSchedules(res?.data.data);
    });
  }, []);

  console.log(schedules);

  return (
    <BottomSheet
      isBlocking={true}
      isDismiss={true}
      maxH={0.4}
      isOpen={isOpen}
      handleClose={onClose}
    >
      <SelectScheduleSheetContainer>
        {schedules?.length !== 0 ? (
          <>
            <h1>여행을 선택해주세요.</h1>
            <p>내 여행</p>

            <ScheduleCardCol>
              {schedules?.map((s: ScheduleApiProps) => (
                <ScheduleCard
                  key={s.id}
                  $isActive={scheduleId === s.id}
                  onClick={() => setScheduleId(s.id)}
                >
                  <span>{s.title.split("여행")[0]}</span>
                  <div>
                    <CalendarCheckIcon />
                    <span>12.29 ~ 12.23</span>
                  </div>
                </ScheduleCard>
              ))}
            </ScheduleCardCol>
            <SubmitBtnBox>
              <PrimaryButton
                text="다음"
                blue={true}
                width="190px"
                onClick={() => navigate(`/home/writeTravelogue/${scheduleId}`)}
              />
            </SubmitBtnBox>
          </>
        ) : (
          <>
            <NoScheduleBox>
              <p>
                <CalendarCheckIcon stroke="#b8b8b8" />
                일정이 없어요.
              </p>
              <span>새로운 여행 일정을 추가해주세요.</span>
            </NoScheduleBox>
            <NoScheduleAddBox>
              <AddScheduleButton>
                <PlusIcon stroke="#fff" />
                <span>일정 생성</span>
              </AddScheduleButton>
            </NoScheduleAddBox>
          </>
        )}
      </SelectScheduleSheetContainer>
    </BottomSheet>
  );
}

const SelectScheduleSheetContainer = styled.div`
  padding: 20px 8px 0 8px;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }
`;

const ScheduleCardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  padding: 8px 0;
  max-height: 140px;

  overflow-y: scroll;
  ${scrollHidden};
`;

const ScheduleCard = styled(TravelCard)<{ $isActive: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray200};

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
  }
`;

const NoScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 36px;

  & > p {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    font-weight: 400;
  }
`;

const NoScheduleAddBox = styled(AddScheduleBox)`
  position: absolute;
  padding: 0;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: 0 auto;
`;

const SubmitBtnBox = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
