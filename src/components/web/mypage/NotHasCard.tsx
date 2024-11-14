import styled from "styled-components";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";

interface Props {
  text: string;
  btnText?: string;
  onClick?: () => void;
  noButton?: boolean;
  isMobile?: boolean;
}

export default function NotHasCard({
  text,
  btnText,
  onClick,
  noButton = false,
  isMobile = false,
}: Props) {
  return (
    <NotHasCardContainer>
      <NotHasCardBox $isMobile={isMobile}>
        <CalendarCheckIcon stroke="#b8b8b8" />
        <span>{text}</span>
      </NotHasCardBox>

      {!noButton && (
        <button onClick={onClick}>
          <PlusIcon stroke="white" />
          <span>{btnText}</span>
        </button>
      )}
    </NotHasCardContainer>
  );
}

const NotHasCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > button {
    margin: 75px auto;
    width: 103px;
    height: 44px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.color.main};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;

    & > span {
      color: ${(props) => props.theme.color.white};
      font-size: 14px;
      font-weight: 700;
    }
  }
`;

const NotHasCardBox = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  height: 80px;
  border-radius: 16px;
  background-color: ${(props) =>
    props.$isMobile ? props.theme.color.gray100 : props.theme.color.white};

  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: ${(props) => (props.$isMobile ? "12px" : "16px")};
  }

  & > svg {
    margin-top: -2.5px;
  }
`;
