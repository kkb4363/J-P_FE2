import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
  handleClick?: () => void;
}

export default function CustomHeader({ title, children, handleClick }: Props) {
  const navigate = useNavigate();
  return (
    <CustomHeaderContainer>
      <div onClick={handleClick ? handleClick : () => navigate(-1)}>
        <ArrowLeftIcon />
      </div>
      <p>{title}</p>
      {children ? children : <EmptyBox />}
    </CustomHeaderContainer>
  );
}

const CustomHeaderContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0px 16px;

  & > p {
    font-weight: 700;
    font-size: 20px;
  }
`;

const EmptyBox = styled.div`
  width: 24px;
`;
