import styled from "styled-components";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";

interface Props {
  handleClick?: () => void;
}

export default function NoScheduleModal({ handleClick }: Props) {
  return (
    <NoScheduleModalContainer>
      <h1>내 여행 일정</h1>
      <div>
        <ScheduleIcon stroke="#b8b8b8" />
        일정이 없어요. 여행 일정을 등록해봐요!
      </div>
      <button onClick={handleClick}>내 일정 등록하기</button>
    </NoScheduleModalContainer>
  );
}

const NoScheduleModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }

  & > div {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.gray300};
    font-size: 16px;
  }

  & > button {
    width: 190px;
    height: 50px;
    padding: 12px 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.gray300};
    background-color: ${(props) => props.theme.color.white};

    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }
`;
