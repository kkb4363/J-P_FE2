import testImg from "../../../assets/images/testImg.png";
import styled from "styled-components";
import LikeCommentBox from "../../LikeCommentBox";
import CustomProfile from "../../CustomProfile";

export default function ReviewCard() {
  return (
    <ReviewCardContainer>
      <ReviewCardTitleRow>
        <CustomProfile src={testImg} nickname="arami10" content="24.4.12" />
        <span>수정</span>
      </ReviewCardTitleRow>

      <ReviewCardDetailCol>
        <p>전주 한옥마을, 벽화마을, 남부시장 먹방 여행</p>
        <span>오랜만에 한옥마을에서 힐링하고 갑니다~ 조용하고 조용하고</span>
      </ReviewCardDetailCol>
      <LikeCommentBox commentCnt={1} likeCnt={5} />
    </ReviewCardContainer>
  );
}

const ReviewCardContainer = styled.div`
  width: 320px;
  height: 140px;
  border-radius: 16px;
  padding: 16px 14px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewCardTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    cursor: pointer;
  }
`;

const ReviewCardDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
