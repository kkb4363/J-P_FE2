import styled from "styled-components";

interface Props {
  width?: string;
  height?: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function YellowButton({
  width = "100%",
  height = "50px",
  text,
  onClick,
}: Props) {
  return (
    <YelloButtonContainer
      width={width}
      height={height}
      onClick={onClick}
    >
      {text}
    </YelloButtonContainer>
  );
}

const YelloButtonContainer = styled.button<{
  width: string;
  height: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #ffc814;
  border-radius: 16px;
  color: #fff;
  font-family: Pretendard;
  font-weight: 700;
`;
