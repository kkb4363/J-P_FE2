import styled from "styled-components";
import CancelIcon from "../assets/icons/CancelIcon";
import PrimaryButton from "./PrimaryButton";
import { ModalOverlay, ModalWrapper } from "../assets/styles/modal.style";

interface Props {
  isMobile: boolean;
  width?: string;
  height?: string;
  text: string;
  onClick: () => void;
  onClose: () => void;
}

export default function TwoButtonsModal({
  isMobile,
  width,
  height,
  text,
  onClick,
  onClose,
}: Props) {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalWrapper $width={width} $height={height}>
        <ModalHeader>
          <CancelIcon onClick={onClose} />
        </ModalHeader>
        <ModalBody $isMobile={isMobile}>
          <p>{text}</p>
          <ModalButtonBox>
            <PrimaryButton text="아니오" secondary onClick={onClose} />
            <PrimaryButton text="예" blue onClick={onClick} />
          </ModalButtonBox>
        </ModalBody>
      </ModalWrapper>
    </>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  font-weight: 700;
`;

const ModalBody = styled.div<{ $isMobile: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isMobile }) =>
    $isMobile ? "15px 32px 40px" : "54px 49px 106px"};

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-weight: 700;
    padding: 10px 0;
    font-size: ${({ $isMobile }) => !$isMobile && "20px"};
  }
`;

const ModalButtonBox = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;
