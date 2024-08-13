import styled from "styled-components";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function MoreContainer({ title, children }: Props) {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <MoreBox>
      <MoreHeader>
        <div onClick={() => handleBackClick()}>
          <ArrowLeftIcon />
        </div>
        <p>{title}</p>
        <EmptyBox />
      </MoreHeader>
      <MoreBody>
        <MoreGridBox>{children}</MoreGridBox>
      </MoreBody>
    </MoreBox>
  );
}

const MoreBox = styled.div`
  height: 100%;
  padding: 16px;
  background-color: #fafafa;
`;

const MoreHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  & > p {
    font-family: Pretendard;
    font-weight: 700;
    font-size: 20px;
  }
`;

const EmptyBox = styled.div`
  width: 24px;
`;

const MoreBody = styled.div`
  height: calc(100% - 45px);
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
