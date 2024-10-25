import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeartIcon from "../../../assets/icons/HeartIcon";
import * as R from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../../components/CustomProfile";
import HashtagsBox from "../../../components/HashtagsBox";
import LikeCommentBox from "../../../components/LikeCommentBox";
import LoadingText from "../../../components/LoadingText";
import CommentCard from "../../../components/mobile/CommentCard";
import TraveloguePlaceBox from "../../../components/TraveloguePlaceBox";
import ImageView from "../../../components/web/ImageView";
import {
	testImageList,
	testLogContents1,
	testLogContents2,
	testLogContents3,
	testLogTags,
	testReviewItem,
} from "../../../utils/staticDatas";
import Container from "../../../components/web/Container";

export default function TravelogueDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [fillLike, setFillLike] = useState(false);
  const [fillHeart, setFillHeart] = useState(false);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const handleHeartClick = () => {
    setFillHeart((prev) => !prev);
  };

  const handleWriteCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`${comment} submit`);
  };

  const handleImageClick = (index: number) => {
    navigate(`/travelogue/1/photo`, {
      state: { currentIndex: index, images: testImageList }, // 이미지 인덱스와 목록을 state로 전달
    });
  };

  return (
    <div>
      {isLoading && <LoadingText text="로딩중..." />}
      {!isLoading && (
        <Container>
          <TravelogueDetailsTitle>
            <div />
            <h1>안동 혼자 뚜벅이 여행 떠나기</h1>
            <HeartBox onClick={handleHeartClick}>
              <HeartIcon
                fill={fillHeart ? "#FF5757" : "none"}
                stroke={fillHeart ? "#FF5757" : "#808080"}
              />
            </HeartBox>
          </TravelogueDetailsTitle>
          <TravelogueDetailsBody>
            <DetailsHeader>
              <ProfileLikeCommentBox>
                <CustomProfile
                  src="/src/assets/images/testImg.png"
                  nickname="coco1202"
                  content="24.2.3"
                />
                <LikeCommentBox
                  likeCnt={12}
                  commentCnt={8}
                  fillLike={fillLike}
                  likeClick={() => setFillLike((prev) => !prev)}
                />
              </ProfileLikeCommentBox>
              <HashtagsBox hashTags={testLogTags} />
            </DetailsHeader>
            <ImageView
              width="100%"
              height="385px"
              bottomText="+ 3"
              alt="여행기 사진"
              src="/src/assets/images/testImg.png"
              pointer={true}
              handleClick={() => handleImageClick(0)}
            />
            <p dangerouslySetInnerHTML={{ __html: testLogContents1 }} />
            <PlaceBox>
              <TraveloguePlaceBox place="안동 회화마을" />
              <TraveloguePlaceBox place="부용대" />
            </PlaceBox>
            <p dangerouslySetInnerHTML={{ __html: testLogContents2 }} />
            <TraveloguePlaceBox place="월영교" />
            <p>{testLogContents3}</p>
          </TravelogueDetailsBody>
          <RowLine />
          <CommentHeader>댓글</CommentHeader>
          <R.CommentInputBox>
            <CommentInput>
              <input
                type="text"
                placeholder="댓글을 작성해주세요."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
            </CommentInput>
            <R.CommentWriteButton
              type="submit"
              fill={true}
              fontsize="14px"
              onClick={handleWriteCommentSubmit}
            >
              등록
            </R.CommentWriteButton>
          </R.CommentInputBox>
          <CommentBox>
            <CommentCard
              content={testReviewItem.content}
              createdAt={testReviewItem.createdAt}
              user={testReviewItem.userCompactResDto}
              replyList={[]}
              web
            />
          </CommentBox>
        </Container>
      )}
    </div>
  );
}

const TravelogueDetailsTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: 32px;
  }

  & > h1 {
    font-weight: 700;
    font-size: 24px;
  }
`;

const HeartBox = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 99px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
  display: grid;
  place-content: center;
`;

const TravelogueDetailsBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  gap: 24px;

  & > p {
    line-height: 140%;
    font-size: 14px;
  }
`;

const DetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProfileLikeCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlaceBox = styled.div`
  display: flex;
  gap: 8px;
`;

const RowLine = styled.div`
  background-color: ${(props) => props.theme.color.gray200};
  padding: 0.5px 0;
  margin: 24px 0;
`;

const CommentHeader = styled.p`
  margin: 20px 10px;
`;

const CommentInput = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.gray900};
  padding: 12.5px 30px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  & > input {
    width: 100%;
    outline: none;
    font-size: 14px;
    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
      font-size: 14px;
    }
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
`;
