import { ReactNode, useEffect, useState } from "react";
import { BottomSheet as SheetContainer } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import { useDisplayStore } from "../../store/display.store";

interface Props {
  children: ReactNode;
  minH?: number;
  maxH: number;
  isBlocking?: boolean; // overlay 여부
  isOpen?: boolean;
  isDismiss?: boolean; // bottom sheet 닫힐 지 여부
  handleClose?: () => void;
}

export default function BottomSheet({
  children,
  minH,
  maxH,
  isBlocking = false,
  isOpen = true,
  isDismiss = false,
  handleClose,
}: Props) {
  const [open, setOpen] = useState(false);

  const { setBottomSheetHeight } = useDisplayStore();

  const handleDismiss = () => {
    setOpen(false);
    if (handleClose) {
      handleClose();
    }
  };

  const setMinAndMax = (maxHeight: number) => {
    const arr = [];
    if (minH !== undefined) {
      arr.push(maxHeight / minH);
    }
    arr.push(maxHeight * maxH);

    return arr;
  };

  const setDefaultSnap = (maxHeight: number) => {
    //  최솟값이 undefined가 아닐 때 store에 저장 (height 계산 하기 위함)
    if (minH !== undefined) {
      setBottomSheetHeight(maxHeight / minH + 43);
    }

    return maxH * maxHeight;
  };

  useEffect(() => {
    if (isOpen) setOpen(true);
  }, [isOpen]);

  return (
    <SheetContainer
      blocking={isBlocking}
      open={open}
      snapPoints={({ maxHeight }) => setMinAndMax(maxHeight)}
      defaultSnap={({ maxHeight }) => setDefaultSnap(maxH * maxHeight)}
      onDismiss={isDismiss ? handleDismiss : undefined}
    >
      <Container>{children}</Container>
    </SheetContainer>
  );
}

const Container = styled.div`
  padding: 4px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
