import styled from "styled-components";
import CheckIcon from "../../../assets/icons/CheckIcon";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import MarkIcon from "../../../assets/icons/MarkIcon";

interface Props {
  endDate: string;
  startDate: string;
  isOpen: boolean;
  title: string;
  placeId: string;
}

export default function ScheduleCard(props: Props) {
  const start = new Date(props.startDate);
  const end = new Date(props.endDate);

  const nightCnt = (end - start) / (1000 * 60 * 60 * 24);

  return (
    <ScheduleCardContainer>
      <CardHeader>
        <CalendarCheckIcon />
        <span>
          {start.getMonth() + 1}.{start.getDate()} ~ {end.getMonth() + 1}.
          {end.getDate()}
        </span>
        <div>|</div>
        <p>
          {nightCnt}박 {nightCnt + 1}일 여행
        </p>
      </CardHeader>

      <CardTitle>
        <p>{props.title}</p>
        <div>
          <CheckIcon />
          <span>{props.isOpen ? "공개" : "비공개"}</span>
        </div>
      </CardTitle>

      <CardTagRow>
        {/* 3개까지만 보이게끔 */}
        <CardTag>
          <MarkIcon stroke="#6979f8" />
          <span>금산 보리암</span>
        </CardTag>
        <CardTag>
          <MarkIcon stroke="#6979f8" />
          <span>금산 보리암</span>
        </CardTag>
      </CardTagRow>
    </ScheduleCardContainer>
  );
}

const ScheduleCardContainer = styled.div`
  width: 343px;
  height: 124px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  & > span {
    color: ${(props) => props.theme.color.gray700};
  }

  & > div {
    color: ${(props) => props.theme.color.gray400};
  }

  & > p {
    color: ${(props) => props.theme.color.secondary};
  }
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }

  & > div {
    display: flex;
    align-items: center;

    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 12px;
    }
  }
`;

const CardTagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardTag = styled.div`
  display: flex;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.gray700};
  }
`;
