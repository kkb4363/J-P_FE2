import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

export const ModalWrapper = styled.div`
  background-color: ${(props) => props.theme.color.background};
  border-radius: 30px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08),
    0px 10px 23px 0px rgba(0, 0, 0, 0.08);
  position: relative;
  width: 320px;
  height: 230px;
  display: flex;
  flex-direction: column;
`;
