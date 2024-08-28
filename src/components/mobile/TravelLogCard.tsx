import styled from "styled-components";
import * as R from "../../assets/styles/travelReview.style";
import CustomProfile from "./CustomProfile";
import HashtagsBox from "./HashtagsBox";
import { testImageList, testLogTags } from "../../utils/staticDatas";
import ImageView from "./ImageView";
import CommentIcon from "../../assets/icons/CommentIcon";
import LikeIcon from "../../assets/icons/LikeIcon";
import { useNavigate } from "react-router-dom";

export default function TravelLogCard() {
	const navigate = useNavigate();
	// [TODO]: api 연동해서 데이터 연결
	return (
    <TravelLogCardContainer>
      <R.ProfileHeader>
        <CustomProfile
          src="/src/assets/images/testImg.png"
          nickname="coco1202"
          content="24.2.3"
        />
      </R.ProfileHeader>
      <HashtagsBox hashTags={testLogTags} />
      <TravelLogTitleBox>
        <p>안동 혼자 뚜벅이 여행 떠나기</p>
        <span onClick={() => navigate(`/home/travel-log/123`)}>자세히보기</span>
      </TravelLogTitleBox>
      <ImageView
        src={testImageList[0]}
        alt="travelLog"
        width="100%"
        height="191px"
        bottomText={`+${testImageList.length - 1}`}
      />
      <R.LikeCommentBox>
        <R.IconBox>
          <LikeIcon />
          <span>8</span>
        </R.IconBox>
        <R.IconBox>
          <CommentIcon stroke="#808080" />
          <span>2</span>
        </R.IconBox>
      </R.LikeCommentBox>
    </TravelLogCardContainer>
  );
}

const TravelLogCardContainer = styled.div`
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

const TravelLogTitleBox = styled.div`
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
