import styled from "styled-components";

interface Props {
  title: string;
  handleClick: () => void;
}

export default function TitleMoreBox({ title, handleClick }: Props) {
  return (
    <TitleMoreBoxContainer>
      <InfoText>{title}</InfoText>
      <MoreText onClick={handleClick}>더보기</MoreText>
    </TitleMoreBoxContainer>
  );
}

const TitleMoreBoxContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 12px 0;
`;

const InfoText = styled.span`
  color: ${(props) => props.theme.color.gray900};
  font-size: 20px;
  font-weight: 700;
`;

const MoreText = styled.span`
  color: ${(props) => props.theme.color.gray300};
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
`;
