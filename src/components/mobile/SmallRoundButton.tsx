import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  add?: boolean;
  del?: boolean;
  hashtag?: boolean;
  children: ReactNode;
}

export default function SmallRoundButton({
  add,
  del,
  hashtag,
  children,
}: Props) {
  return (
    <SmallRoundButtonContainer $add={add} $del={del} $hashtag={hashtag}>
      {children}
    </SmallRoundButtonContainer>
  );
}

const SmallRoundButtonContainer = styled.button<{
  $add?: boolean;
  $del?: boolean;
  $hashtag?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-weight: ${(props) => (props.$add ? "700" : "400")};
  padding: ${(props) => (props.$add ? "8px 12px" : "7px 12px")};
  font-size: 14px;
  border-radius: 30px;
  border: 1px solid
    ${(props) =>
      props.$del
        ? props.theme.color.gray200
        : props.$hashtag
        ? props.theme.color.secondary
        : props.theme.color.gray700};
  color: ${(props) =>
    props.$del
      ? props.theme.color.gray900
      : props.$hashtag
      ? props.theme.color.secondary
      : props.theme.color.gray700};
  background-color: ${(props) =>
    props.$hashtag
      ? props.theme.color.secondaryLight
      : props.theme.color.white};
`;
