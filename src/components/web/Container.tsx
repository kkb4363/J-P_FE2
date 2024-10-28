import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return <ContainerBox>{children}</ContainerBox>;
}

const ContainerBox = styled.div`
  padding: 65px 200px 0;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 32px;
    font-weight: 700;
  }
`;
