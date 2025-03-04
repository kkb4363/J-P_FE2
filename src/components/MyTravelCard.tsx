import styled from "styled-components";
import CalendarCheckIcon from "../assets/icons/CalendarCheckIcon";
import CheckIcon from "../assets/icons/CheckIcon";
import { formatDayNights } from "../utils/dayNights";

interface Props {
  title: string;
  startDate: string;
  endDate: string;
  isOpen: boolean;
  width: string;
  height: string;
  isSelect: boolean;
  handleClick?: () => void;
}

export default function MyTravelCard(props: Props) {
  const travelInfo = formatDayNights(props.startDate, props.endDate);

  const handleDate = () => {
    const today = new Date();
    const endDate = new Date(props.endDate);
    const startDate = new Date(props.startDate);

    endDate.setHours(23, 59, 59, 999);

    if (endDate < today) {
      return "지난 여행";
    }

    if (startDate > today) {
      const diffDays = Math.ceil(
        (startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `다가오는 일정 D-${diffDays}`;
    }

    return "여행 중";
  };

  return (
    <MyTravelCardContainer
      $width={props.width}
      $height={props.height}
      $isSelect={props.isSelect}
      onClick={props.handleClick}
    >
      <Header>
        <Tag>
          <span>{handleDate()}</span>
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

const MyTravelCardContainer = styled.article<{
  $width: string;
  $height: string;
  $isSelect: boolean;
}>`
  width: ${(props) => props.$width && props.$width};
  height: ${(props) => props.$height && props.$height};
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid
    ${(props) =>
      props.$isSelect
        ? props.theme.color.secondary
        : props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.section`
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

const DateBox = styled.section`
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

const Footer = styled.footer`
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
