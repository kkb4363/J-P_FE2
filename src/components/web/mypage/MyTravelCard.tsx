import styled from "styled-components";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";

interface Props {
  title: string;
  startDate: string;
  endDate: string;
  isOpen: boolean;
  placeId?: string;
  width: string;
  height: string;
}

export default function MyTravelCard(props: Props) {
  const calculateTravelInfo = (start: string, end: string) => {
    const today = new Date();
    const startDay = new Date(start);
    const endDay = new Date(end);

    const nights = Math.floor(
      ((endDay as any) - (startDay as any)) / (1000 * 60 * 60 * 24)
    );
    const days = nights + 1;

    const daysUntilStart = Math.ceil(
      ((startDay as any) - (today as any)) / (1000 * 60 * 60 * 24)
    );

    const startString =
      props.startDate.split("-")[1] + "." + props.startDate.split("-").pop();
    const endString =
      props.endDate.split("-")[1] + "." + props.endDate.split("-").pop();

    return {
      nights,
      days,
      daysUntilStart,
      startString,
      endString,
    };
  };

  const handleDate = (day: number) => {
    const today = new Date();
    const endDate = new Date(props.endDate);

    if (endDate < today) {
      return "지난 여행";
    } else if (day !== 0) {
      return `다가오는 일정 D-${day}`;
    } else if (day === 0) {
      return "여행중";
    }
  };

  const travelInfo = calculateTravelInfo(props.startDate, props.endDate);

  return (
    <MyTravelCardContainer $width={props.width} $height={props.height}>
      <Header>
        <Tag>
          <span>{handleDate(travelInfo?.daysUntilStart)}</span>
        </Tag>

        <DateBox>
          <CalendarCheckIcon />
          <span>
            {travelInfo?.startString} ~{travelInfo?.endString}
          </span>
          <div />
          <span>
            {travelInfo?.nights}박 {travelInfo?.days}일 여행
          </span>
        </DateBox>
      </Header>

      <Footer>
        <p>{props.title}</p>
        <div>
          <CheckIcon stroke={props.isOpen ? "#6979f8" : "#4d4d4d"} />
          <span>{props.isOpen ? "공개" : "비공개"}</span>
        </div>
      </Footer>
    </MyTravelCardContainer>
  );
}

const MyTravelCardContainer = styled.div<{ $width: string; $height: string }>`
  width: ${(props) => props.$width && props.$width};
  height: ${(props) => props.$height && props.$height};
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.div`
  padding: 3px 12px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 12px;
  }
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  & > span:nth-child(2) {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.secondary};
    font-size: 12px;
  }

  & > div {
    height: 10px;
    width: 1.3px;
    background-color: ${(props) => props.theme.color.gray700};
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
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
