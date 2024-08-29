import styled from "styled-components";
import { TravelCard, TravelHeader } from "./Travel";
import EditIcon from "../../../assets/icons/EditIcon";
import testImg from "../../../assets/images/testImg1.png";
import { useState } from "react";
import BottomSheet from "../../../components/mobile/BottomSheet";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";
import {
  AddScheduleBox,
  AddScheduleButton,
} from "../../../assets/styles/homeDetail.style";
import PlusIcon from "../../../assets/icons/PlusIcon";

export default function TravelLog() {
  const [isWrite, setIsWrite] = useState(false);

  return (
    <>
      <TravelLogHeader>
        <span>목록</span>

        <div onClick={() => setIsWrite(true)}>
          <EditIcon />
          <span>작성하기</span>
        </div>
      </TravelLogHeader>

      <TravelLogGridBox>
        <TravelLogCard>
          <p>제주</p>
          <span>3.21 ~ 3.24</span>
          <div>공개</div>
        </TravelLogCard>
        <TravelLogCard>
          <p>제주</p>
          <span>3.21 ~ 3.24</span>
          <div>공개</div>
        </TravelLogCard>
        <TravelLogCard>
          <p>제주</p>
          <span>3.21 ~ 3.24</span>
          <div>공개</div>
        </TravelLogCard>
      </TravelLogGridBox>

      <BottomSheet
        isBlocking={true}
        isDismiss={true}
        maxH={0.4}
        isOpen={isWrite}
        handleClose={() => setIsWrite(false)}
      >
        <WriteTravelogContainer>
          <h1>여행을 선택해주세요.</h1>
          <p>내 여행</p>
          {/* 여행 일정이 있을 때 */}
          <ScheduleBox>
            <WriteTravelLogCard $isActive={true}>
              <span>제주</span>
              <div>
                <CalendarCheckIcon />
                <span>12.29 ~ 12.23</span>
              </div>
              <span>
                <CheckOnlyIcon stroke="#6979f8" />
              </span>
            </WriteTravelLogCard>
            <WriteTravelLogCard $isActive={false}>
              <span>제주</span>
              <div>
                <CalendarCheckIcon />
                <span>12.29 ~ 12.23</span>
              </div>
              <span>
                <CheckOnlyIcon stroke="#e6e6e6" />
              </span>
            </WriteTravelLogCard>
          </ScheduleBox>

          {/* 여행 일정이 없을 때*/}
          {/* <>
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
          </> */}
        </WriteTravelogContainer>
      </BottomSheet>
    </>
  );
}

const TravelLogHeader = styled(TravelHeader)`
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    & > span {
      color: ${(props) => props.theme.color.gray900};
      font-size: 14px;
      font-weight: 700;
    }
  }
`;

export const TravelLogGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  padding: 16px 0 8px 0;
  gap: 16px;
`;

const TravelLogCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  position: relative;
  width: 100%;
  min-width: 150px;
  min-height: 130px;
  border-radius: 16px;

  gap: 12px;
  background: no-repeat center url(${testImg});
  background-size: cover;

  & > p {
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 600;
  }

  & > div {
    position: absolute;
    right: 6px;
    top: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 30px;

    color: ${(props) => props.theme.color.gray900};
    font-size: 10px;
    font-weight: 500;
    padding: 4px 8px;
  }
`;

const WriteTravelogContainer = styled.div`
  padding: 20px 8px 8px 8px;

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

const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  padding: 16px 0;
`;

const WriteTravelLogCard = styled(TravelCard)<{ $isActive: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray200};
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
