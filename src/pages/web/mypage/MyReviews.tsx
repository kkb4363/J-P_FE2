import styled from "styled-components";
import testImg from "../../../assets/images/testImg.png";
import StarIcon from "../../../assets/icons/StarIcon";
import CommentIcon from "../../../assets/icons/CommentIcon";

export default function MyReviews() {
  return (
    <>
      <MyPageTitle>내 작성 리뷰 2</MyPageTitle>
      <SubTitle>전체</SubTitle>
      <ReviewCardRow>
        <ReviewCard>
          <ReviewCardTitleRow>
            <div>
              <img src={testImg} alt="user" />
              <p>arami10</p>
              <span>|</span>
              <span>24.4.12</span>
            </div>

            <span>수정</span>
          </ReviewCardTitleRow>

          <ReviewCardDetailCol>
            <p>전주 한옥마을, 벽화마을, 남부시장 먹방 여행</p>
            <span>
              오랜만에 한옥마을에서 힐링하고 갑니다~ 조용하고 조용하고
            </span>
          </ReviewCardDetailCol>

          <ReviewCardCommentRow>
            <StarIcon />
            <span>5.0</span>
            <CommentIcon />
            <span>5</span>
          </ReviewCardCommentRow>
        </ReviewCard>
      </ReviewCardRow>
    </>
  );
}

export const MyPageTitle = styled.h1`
  color: ${(props) => props.theme.color.gray900};
  font-size: 24px;
  font-weight: 700;
`;

const SubTitle = styled.h2`
  margin-top: 12px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.color.gray900};
  font-size: 20px;
  font-weight: 700;
`;

const ReviewCardRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ReviewCard = styled.div`
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

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 6px;

    & > img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }

    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 12px;
    }

    & > span {
      color: ${(props) => props.theme.color.gray300};
      font-size: 12px;
    }
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
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

const ReviewCardCommentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
  }
`;
