import styled from "styled-components";
import ImageView from "../../ImageView";
import HashtagsBox from "../../HashtagsBox";
import CustomProfile from "../../CustomProfile";
import testImg from "../../../assets/images/testImg.png";
import LikeCommentBox from "./../../LikeCommentBox";

interface Props {
  isReviewCard: boolean;
}

export default function TravelogueCard({ isReviewCard }: Props) {
  return (
    <TravelogueCardContainer>
      <ImageView
        src={testImg}
        alt={"소금산 출렁다리"}
        width="85px"
        height="89px"
      />

      <ReviewTextCol>
        {isReviewCard ? (
          <span>
            오대산 선재길에서 산책하기 자연의 힐링을 동시에 누릴 수 있는
          </span>
        ) : (
          <>
            <HashtagsBox hashTags={["안동", "2박3일"]} />
            <p>안동 혼자 뚜벅이 여행 떠나기</p>
          </>
        )}

        <ReviewProfileRow>
          <CustomProfile src={testImg} nickname="coco1202" fontSize="12px" />

          <ReviewLikeCommentRow>
            <LikeCommentBox isReview={isReviewCard} likeCnt={26} commentCnt={16} />
          </ReviewLikeCommentRow>
        </ReviewProfileRow>
      </ReviewTextCol>
    </TravelogueCardContainer>
  );
}

const TravelogueCardContainer = styled.div`
  display: flex;
  gap: 10px;
  min-width: 380px;
  width: 95%;
  height: 130px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  padding: 21px 12px;
`;

const ReviewTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;

  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    width: 100%;
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
