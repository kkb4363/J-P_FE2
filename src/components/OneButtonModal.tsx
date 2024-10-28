import React from "react";
import styled from "styled-components";
import CancelIcon from "../assets/icons/CancelIcon";
import { ModalOverlay, ModalWrapper } from "../assets/styles/modal.style";
import PrimaryButton from "./PrimaryButton";

interface Props {
  title?: string;
  buttonText: string;
  onClick: () => void;
  onClose?: () => void;
  noCloseBtn?: boolean;
  noBtn?: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
  fontSize?: string;
}

export default function OneButtonModal({
  title,
  buttonText,
  onClick,
  onClose,
  noCloseBtn = false,
  noBtn = false,
  children,
  width,
  height,
  fontSize = "16px",
}: Props) {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalWrapper $width={width} $height={height}>
        <ModalHeader $fontSize={fontSize}>
          <EmptyBox />
          <p>{title}</p>
          {!noCloseBtn && (
            <CloseButton onClick={onClose}>
              <CancelIcon />
            </CloseButton>
          )}
        </ModalHeader>
        <ModalBody $noCloseBtn={noCloseBtn}>
          {children}
          {!noBtn && (
            <ModalButtonBox>
              <PrimaryButton text={buttonText} blue onClick={onClick} />
            </ModalButtonBox>
          )}
        </ModalBody>
      </ModalWrapper>
    </>
  );
}

const ModalHeader = styled.div<{ $fontSize: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  & > p {
    font-weight: 700;
    font-size: ${(props) => props.$fontSize && props.$fontSize};
  }
`;

const EmptyBox = styled.div`
  width: 22px;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const ModalBody = styled.div<{ $noCloseBtn: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $noCloseBtn }) => ($noCloseBtn ? "35px 0 51px" : "7px 0 20px")};
`;

const ModalButtonBox = styled.div`
  width: 190px;
`;
