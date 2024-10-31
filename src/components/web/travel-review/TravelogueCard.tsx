import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { reviewApiProps } from "../../../types/home";
import { testImageList, testLogTags } from "../../../utils/staticDatas";
import TwoImageBox from "./TwoImageBox";
import LikeCommentBox from "../../LikeCommentBox";
import CustomProfile from "../../CustomProfile";

interface Props {
  item: reviewApiProps;
}

export default function TravelogueCard({ item }: Props) {
  const navigate = useNavigate();
  return (
    <TravelogueCardContainer
      onClick={() => navigate(`/home/travelogue/${item.id}`)}
    >
      <Tags>
        {testLogTags.map((tag, idx) => (
          <Tag key={idx}>{`#${tag}`}</Tag>
        ))}
      </Tags>
      <TravelogueBody>
        <CustomProfile
          src="/src/assets/images/testImg.png"
          nickname={item.userCompactResDto.nickname}
          content="24.2.3"
        />
        <Title>안동 혼자 뚜벅이 여행 떠나기</Title>
        <span>자세히 보기</span>
      </TravelogueBody>
      <TwoImageBox images={testImageList} />
      <LikeCommentBox likeCnt={item.likeCnt} commentCnt={item.commentCnt} />
    </TravelogueCardContainer>
  );
}

const TravelogueCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 46px 41px;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.div`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray700};
  border-radius: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.color.gray700};
  white-space: nowrap;
`;

const TravelogueBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > span {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray300};
  }
`;

const Title = styled.p`
  font-weight: 700;
  line-height: 140%;
  color: ${(props) => props.theme.color.gray900};
`;
