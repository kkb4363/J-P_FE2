import styled from "styled-components";
import CheckIcon from "../../../assets/icons/CheckIcon";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import testImg from "../../../assets/images/testImg2.png";
export default function ScheduleCard() {
  return (
    <ScheduleCardContainer>
      <img src={testImg} alt="이미지없음" />
      <ScheduleCardTextCol>
        <div>
          <p>남해 여행</p>
          <span>D-day 8</span>
        </div>
        <p>
          <CalendarCheckIcon />
          4.17 ~ 4.19
        </p>
      </ScheduleCardTextCol>

      <ScheduleCardCheckBox>
        <CheckIcon />
        <span>공개</span>
      </ScheduleCardCheckBox>
    </ScheduleCardContainer>
  );
}

const ScheduleCardContainer = styled.div`
  width: 400px;
  height: 143px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  padding: 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > img {
    width: 102px;
    height: 100px;
    border-radius: 16px;
    object-fit: cover;
  }
`;

const ScheduleCardTextCol = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  padding-left: 23px;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 3px;
    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 20px;
      font-weight: 700;
    }

    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 12px;
    }
  }

  & > p {
    display: flex;
    gap: 3px;
    color: ${(props) => props.theme.color.gray700};
    font-size: 16px;
  }
`;

const ScheduleCardCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }
`;
