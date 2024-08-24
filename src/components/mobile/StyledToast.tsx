import { ToastContainer } from "react-toastify";
import styled from "styled-components";

type PositionType =
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

interface Props {
  position?: PositionType;
}

export default function StyledToast({ position = "bottom-center" }: Props) {
  return (
    <StyledToastContainer
      position={position}
      hideProgressBar={true}
      autoClose={6000}
      closeButton={false}
      $isBottom={position.includes("bottom")}
    />
  );
}

const StyledToastContainer = styled(ToastContainer)<{ $isBottom: boolean }>`
  .Toastify__toast {
    background-color: ${(props) => props.theme.color.gray100};
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.08),
      0px 4px 10px 0px rgba(0, 0, 0, 0.08);
    opacity: 0.9;
    border-radius: 16px;
    width: 95%;
    margin: 0 auto;
    // footer 높이 위에 배치
    bottom: ${({ $isBottom }) => $isBottom && "70px"};
  }
`;
