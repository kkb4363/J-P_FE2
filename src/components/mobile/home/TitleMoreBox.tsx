import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type MoreProps = "TRAVEL_PLACE" | "CITY" | "THEME";

interface Props {
  title: string;
  moreType: MoreProps;
}

export default function TitleMoreBox({ title, moreType }: Props) {
  const navigate = useNavigate();

  const handleMore = (type: MoreProps) => {
    navigate("more", {
      state: {
        type: type,
      },
    });
  };

  return (
    <InfoRow>
      <InfoText>{title}</InfoText>
      <MoreText onClick={() => handleMore(moreType)}>더보기</MoreText>
    </InfoRow>
  );
}

const InfoRow = styled.div`
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
