import styled from "styled-components";
import { motion } from "framer-motion";

import useBottomSheet, { MIN_Y } from "../../hooks/useBottomSheet";
import { ReactNode } from "react";
import { scrollHidden } from "../../assets/styles/home.style";

const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;

interface Props {
  children?: ReactNode;
  maxHeight: number;
}

function BottomSheet({ children, maxHeight }: Props) {
  const { sheet, content } = useBottomSheet({ maxHeight: maxHeight });

  return (
    <BottomSheetContainer ref={sheet}>
      <BottomSheetHeader />
      <BottomSheetContent ref={content}>{children}</BottomSheetContent>
    </BottomSheetContainer>
  );
}

export default BottomSheet;

const BottomSheetContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: calc(100% - 80px);
  left: 0;
  right: 0;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: ${BOTTOM_SHEET_HEIGHT}px;
  border-radius: 30px 30px 0px 0px;
  background: #fafafa;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08),
    0px 10px 23px 0px rgba(0, 0, 0, 0.08);

  transition: transform 400ms ease-out;
`;

const BottomSheetHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10px;

  &::before {
    content: "";
    border-radius: 3px;
    height: 6px;
    width: 60px;
    background-color: #b8b8b8;
  }
`;

const BottomSheetContent = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
  ${scrollHidden};
  height: calc(${BOTTOM_SHEET_HEIGHT}px - 80px);
  box-sizing: border-box;
  padding: 4px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
