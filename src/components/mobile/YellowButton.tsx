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
    <YellowButtonContainer width={width} height={height} onClick={onClick}>
      {text}
    </YellowButtonContainer>
  );
}

const YellowButtonContainer = styled.button<{
  width: string;
  height: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.theme.color.main};
  border-radius: 16px;
  color: ${(props) => props.theme.color.white};
  font-weight: 700;
`;
