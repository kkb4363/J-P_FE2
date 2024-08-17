import styled from "styled-components";

interface Props {
  width?: string;
  height?: string;
  text: string;
  blue?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PrimaryButton({
  width = "100%",
  height = "50px",
  text,
  blue = false,
  onClick,
}: Props) {
  return (
    <PrimaryButtonContainer
      $width={width}
      $height={height}
      onClick={onClick}
      $blue={blue}
    >
      {text}
    </PrimaryButtonContainer>
  );
}

const PrimaryButtonContainer = styled.button<{
  $width: string;
  $height: string;
  $blue?: boolean;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: ${(props) =>
    props.$blue ? props.theme.color.secondary : props.theme.color.main};
  border-radius: 16px;
  color: ${(props) => props.theme.color.white};
  font-weight: 700;
`;
