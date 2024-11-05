import React from "react";
import styled from "styled-components";
import CancelIcon from "../../assets/icons/CancelIcon";
import { ModalOverlay, ModalWrapper } from "../../assets/styles/modal.style";

interface Props {
  onClose?: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  noCloseBtn?: boolean;
}

export default function NoButtonModal({
  onClose,
  children,
  width,
  height,
  noCloseBtn = false,
}: Props) {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalWrapper $width={width} $height={height}>
        {!noCloseBtn && (
          <ModalHeader>
            <EmptyBox />
            <CancelIcon onClick={onClose} />
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalWrapper>
    </>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0;
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
  padding: 16px 32px 20px;
`;
