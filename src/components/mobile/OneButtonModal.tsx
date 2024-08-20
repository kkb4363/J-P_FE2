import React from "react";
import styled from "styled-components";
import CancelIcon from "../../assets/icons/CancelIcon";
import PrimaryButton from "./PrimaryButton";
import { ModalOverlay, ModalWrapper } from "../../assets/styles/modal.style";

interface Props {
  title: string;
  buttonText: string;
  onClick: () => void;
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export default function OneButtonModal({
  title,
  buttonText,
  onClick,
  onClose,
  modalRef,
  children
}: Props) {
  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ModalHeader>
          <EmptyBox />
          <p>{title}</p>
          <CancelIcon onClick={onClose} />
        </ModalHeader>
        <ModalBody>
            {children}
          <ModalButtonBox>
            <PrimaryButton text={buttonText} blue onClick={onClick} />
          </ModalButtonBox>
        </ModalBody>
      </ModalWrapper>
    </ModalOverlay>
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

const ModalBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7px 32px 20px;
`;

const ModalButtonBox = styled.div`
  width: 70%;
`;
