import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function IconBox({ children }: Props) {
  return <IconBoxContainer>{children}</IconBoxContainer>;
}

export const IconBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray500};
    line-height: normal;
  }
`;
