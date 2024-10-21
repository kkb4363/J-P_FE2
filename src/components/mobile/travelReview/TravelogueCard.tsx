import styled from "styled-components";
import * as R from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../CustomProfile";
import HashtagsBox from "../../HashtagsBox";
import { testImageList, testLogTags } from "../../../utils/staticDatas";
import ImageView from "../../ImageView";
import LikeIcon from "../../../assets/icons/LikeIcon";
import { useNavigate } from "react-router-dom";
import testImg from "../../../assets/images/testImg2.png";
import LikeCommentBox from "../../LikeCommentBox";

export default function TravelogueCard() {
  const navigate = useNavigate();
  // [TODO]: api 연동해서 데이터 연결
  return (
    <TravelogueCardContainer>
      <R.ProfileHeader>
        <CustomProfile src={testImg} nickname="coco1202" content="24.2.3" />
      </R.ProfileHeader>
      <HashtagsBox hashTags={testLogTags} />
      <TravelogueTitleBox>
        <p>안동 혼자 뚜벅이 여행 떠나기</p>
        <span onClick={() => navigate(`/home/travelogue/123`)}>자세히보기</span>
      </TravelogueTitleBox>
      <ImageView
        src={testImg}
        alt="Travelogue"
        width="100%"
        height="191px"
        bottomText={`+${testImageList.length - 1}`}
      />
      <LikeCommentBox likeCnt={8} commentCnt={2} />
    </TravelogueCardContainer>
  );
}

const TravelogueCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  position: relative;

  &:first-child {
    padding: 0 0 16px;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.color.gray200};
  }
`;

const TravelogueTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 28.5px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    line-height: 120%;
  }
`;
