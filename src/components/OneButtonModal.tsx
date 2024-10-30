import React from "react";
import styled from "styled-components";
import CancelIcon from "../assets/icons/CancelIcon";
import { ModalOverlay, ModalWrapper } from "../assets/styles/modal.style";
import PrimaryButton from "./PrimaryButton";

interface Props {
  isMobile: boolean;
  width?: string;
  height?: string;
  title?: string;
  buttonText: string;
  onClick: () => void;
  onClose?: () => void;
  noCloseBtn?: boolean;
  noBtn?: boolean;
  children: React.ReactNode;
}

export default function OneButtonModal({
  isMobile,
  width,
  height,
  title,
  buttonText,
  onClick,
  onClose,
  noCloseBtn = false,
  noBtn = false,
  children,
}: Props) {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalWrapper $width={width} $height={height}>
        <ModalHeader $isMobile={isMobile}>
          <EmptyBox />
          <p>{title}</p>
          {!noCloseBtn && (
            <CloseButton onClick={onClose}>
              <CancelIcon />
            </CloseButton>
          )}
        </ModalHeader>
        <ModalBody $isMobile={isMobile}>{children}</ModalBody>
        {!noBtn && (
          <ModalButtonBox $noCloseBtn={noCloseBtn} $isMobile={isMobile}>
            <PrimaryButton text={buttonText} blue onClick={onClick} />
          </ModalButtonBox>
        )}
      </ModalWrapper>
    </>
  );
}

const ModalHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isMobile }) => ($isMobile ? "16px 16px 0" : "36px 36px 0")};

  & > p {
    font-weight: 700;
    font-size: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
  }
`;

const EmptyBox = styled.div`
  width: 22px;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const ModalBody = styled.div<{ $isMobile: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ModalButtonBox = styled.div<{ $noCloseBtn: boolean; $isMobile: boolean }>`
  width: 190px;
  align-self: center;
  margin-bottom: ${({ $noCloseBtn, $isMobile }) =>
    $noCloseBtn ? ($isMobile ? "51px" : "106px") : $isMobile ? "17px" : "46px"};
`;
