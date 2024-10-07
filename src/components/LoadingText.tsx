import styled from "styled-components";

interface Props {
  text?: string;
}
export default function LoadingText({ text = "로딩중..." }: Props) {
  return <Text>{text}</Text>;
}

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  color: ${(props) => props.theme.color.gray300};
`;
