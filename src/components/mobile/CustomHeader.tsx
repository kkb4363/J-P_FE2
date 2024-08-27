import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import { ReactNode } from "react";
import MarkIcon from "../../assets/icons/MarkIcon";

interface Props {
  isPlace?: boolean;
  title: string;
  children?: ReactNode;
  handleClick?: () => void;
  hidePrevIcon?: boolean;
}

export default function CustomHeader({
  isPlace = false,
  title,
  children,
  handleClick,
  hidePrevIcon,
}: Props) {
  const navigate = useNavigate();
  return (
    <CustomHeaderContainer>
      {hidePrevIcon ? (
        <EmptyBox />
      ) : (
        <div onClick={handleClick ? handleClick : () => navigate(-1)}>
          <ArrowLeftIcon />
        </div>
      )}

      <Title>
        {isPlace && <MarkIcon />}
        {title}
      </Title>

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
  position: relative;
`;

const EmptyBox = styled.div`
  width: 24px;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
`;
