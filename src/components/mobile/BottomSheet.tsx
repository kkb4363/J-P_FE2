import { ReactNode } from "react";
import { BottomSheet as SheetContainer } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  minH: number;
  maxH: number;
}

export default function BottomSheet({ children, minH, maxH }: Props) {
  return (
    <SheetContainer
      blocking={false}
      open={true}
      // 첫번 째 -> 최소 높이 , 두번 째 -> 최대 높이
      snapPoints={({ maxHeight }) => [maxHeight / minH, maxHeight * maxH]}
      defaultSnap={({ maxHeight }) => maxH * maxHeight}
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
