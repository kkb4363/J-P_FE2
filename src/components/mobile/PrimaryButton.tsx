import styled from "styled-components";

interface Props {
  width?: string;
  height?: string;
  text: string;
  blue?: boolean;
  secondary?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export default function PrimaryButton({
  width = "100%",
  height = "45px",
  text,
  blue = false,
  secondary = false,
  onClick,
  isDisabled,
}: Props) {
  return (
    <PrimaryButtonContainer
      $width={width}
      $height={height}
      onClick={onClick}
      $blue={blue}
      $secondary={secondary}
      disabled={isDisabled}
    >
      {text}
    </PrimaryButtonContainer>
  );
}

const PrimaryButtonContainer = styled.button<{
  $width: string;
  $height: string;
  $blue?: boolean;
  $secondary?: boolean;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  padding: 0;
  background-color: ${(props) =>
    props.$blue
      ? props.theme.color.secondary
      : props.$secondary
      ? props.theme.color.white
      : props.theme.color.main};
  border-radius: 16px;
  color: ${(props) =>
    props.$secondary ? props.theme.color.gray700 : props.theme.color.white};
  font-weight: 700;
  font-size: 14px;
  border: 1px ${(props) => (props.$secondary ? "solid" : "none")}${(props) => props.theme.color.gray300};

  &:disabled {
    background-color: ${(props) => props.theme.color.gray200};
  }
`;
