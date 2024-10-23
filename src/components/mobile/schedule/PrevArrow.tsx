import styled from "styled-components";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";

export default function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <ArrowBox className="left" onClick={onClick}>
      <ArrowLeftIcon stroke="#6979F8" />
    </ArrowBox>
  );
}

export const ArrowBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
