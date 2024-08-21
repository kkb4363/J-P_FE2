import React from "react";
import styled from "styled-components";
import CancelIcon from "../../assets/icons/CancelIcon";
import PrimaryButton from "./PrimaryButton";
import { ModalOverlay, ModalWrapper } from "../../assets/styles/modal.style";

interface Props {
  text: string;
  onClick: () => void;
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

export default function TwoButtonsModal({
  text,
  onClick,
  onClose,
  modalRef,
}: Props) {
  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ModalHeader>
          <CancelIcon onClick={onClose} />
        </ModalHeader>
				<ModalBody>
					<p>{text}</p>
          <ModalButtonBox>
            <PrimaryButton text="아니오" secondary onClick={onClose} />
            <PrimaryButton text="예" blue onClick={onClick} />
          </ModalButtonBox>
        </ModalBody>
      </ModalWrapper>
    </ModalOverlay>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  font-weight: 700;
`;

const ModalBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px 32px 40px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-weight: 700;
    padding: 10px 0;
  }
`;

const ModalButtonBox = styled.div`
  width: 100%;
	display: flex;
	gap: 16px;
`;
