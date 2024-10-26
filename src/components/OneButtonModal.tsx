import React from "react";
import styled from "styled-components";
import CancelIcon from "../assets/icons/CancelIcon";
import { ModalOverlay, ModalWrapper } from "../assets/styles/modal.style";
import PrimaryButton from "./mobile/PrimaryButton";

interface Props {
  title?: string;
  buttonText: string;
  onClick: () => void;
  onClose?: () => void;
  noCloseBtn?: boolean;
  modalRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export default function OneButtonModal({
  title,
  buttonText,
  onClick,
  onClose,
  noCloseBtn = false,
  children,
}: Props) {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalWrapper>
        <ModalHeader>
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
          <ModalButtonBox>
            <PrimaryButton text={buttonText} blue onClick={onClick} />
          </ModalButtonBox>
        </ModalBody>
      </ModalWrapper>
    </>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-weight: 700;
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
