import { ReactNode, useEffect, useState } from "react";
import { BottomSheet as SheetContainer } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  minH?: number;
  maxH: number;
  isBlocking?: boolean;
  isOpen?: boolean;
  isDismiss?: boolean; // Bottom Sheet가 닫힐 지 여부
}

export default function BottomSheet({
  children,
  minH,
  maxH,
  isBlocking = false,
  isOpen = true,
  isDismiss = false,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleDismiss = () => {
    isDismiss ? setOpen(false) : undefined;
  };

  const minAndMax = (maxHeight: number) => {
    const arr = [];

    if (minH !== undefined) {
      arr.push(maxHeight / minH);
    }

    if (maxH !== undefined) {
      arr.push(maxHeight * maxH);
    }

    return arr;
  };

  useEffect(() => {
    if (isOpen) setOpen(true);
  }, []);

  return (
    <SheetContainer
      blocking={isBlocking}
      open={open}
      snapPoints={({ maxHeight }) => minAndMax(maxHeight)}
      defaultSnap={({ maxHeight }) => maxH * maxHeight}
      onDismiss={handleDismiss}
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
