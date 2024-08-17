import styled from "styled-components";
import CancelIcon from "../../assets/icons/CancelIcon";
import PrimaryButton from "./PrimaryButton";

interface Props {
  setModalOpen: (state: boolean) => void;
  allDelete?: () => void;
  title?: string;
  text?: string;
}

export default function Modal({
  setModalOpen,
  allDelete,
  title,
  text,
}: Props) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <ModalBackground onClick={closeModal}></ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <p>{title}</p>
          <CancelIcon onClick={closeModal} />
        </ModalHeader>
        <ModalBody>
          <p>{text}</p>
          <ModalButtonBox>
            <PrimaryButton text="아니오" secondary onClick={closeModal} />
            <PrimaryButton text="예" blue onClick={allDelete} />
          </ModalButtonBox>
        </ModalBody>
      </ModalContainer>
    </>
  );
}

const ModalBackground = styled.div`
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.div`
  z-index: 999;
  position: absolute;
  top: calc(50% - 115px);
  left: calc(50% - 160px);
  width: 320px;
  height: 230px;
  background-color: ${(props) => props.theme.color.background};
  border-radius: 30px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08),
    0px 10px 23px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 16px;
`;

const ModalBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 32px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-weight: 700;
    padding: 10px 0;
  }
`;

const ModalButtonBox = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  gap: 16px;
`;
