import styled from "styled-components";
import ImageView from "../../ImageView";
import testImg from "../../../assets/images/testImg2.png";
import HashtagsBox from "../../HashtagsBox";
import CustomProfile from "../../CustomProfile";
import LikeCommentBox from "./../../LikeCommentBox";

export default function TravelogueCard() {
  return (
    <TravelogueCardContainer>
      <ImageView
        src={testImg}
        alt={"소금산 출렁다리"}
        width="85px"
        height="80px"
      />

      <ReviewTextCol>
        <HashtagsBox hashTags={["안동", "2박3일"]} />
        <p>안동 혼자 뚜벅이 여행 떠나기</p>

        <ReviewProfileRow>
          <CustomProfile src={testImg} nickname="coco1202" fontSize="12px" />

          <ReviewLikeCommentRow>
            <LikeCommentBox isReview={false} likeCnt={26} commentCnt={16} />
          </ReviewLikeCommentRow>
        </ReviewProfileRow>
      </ReviewTextCol>
    </TravelogueCardContainer>
  );
}

const TravelogueCardContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ReviewTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;

  & > span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
    line-height: 140%;
  }
`;

const ReviewProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewLikeCommentRow = styled.div`
  display: flex;
  gap: 8px;
`;
