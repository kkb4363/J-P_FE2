import styled from "styled-components";
import { ReactNode } from "react";
import CustomHeader from "./CustomHeader";

interface Props {
  title: string;
  children: ReactNode;
}

export default function MoreContainer({ title, children }: Props) {
  return (
    <MoreBox>
      <CustomHeader title={title} />
      <MoreBody>
        <MoreGridBox>{children}</MoreGridBox>
      </MoreBody>
    </MoreBox>
  );
}

const MoreBox = styled.div`
  height: 100%;
`;

const MoreBody = styled.div`
  height: calc(100% - 50px);
  padding: 16px;
  display: flex;
  justify-content: flex-start;
`;

const MoreGridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-content: start;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
