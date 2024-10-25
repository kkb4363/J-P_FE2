import { useState } from "react";
import styled from "styled-components";
import HeartIcon from "../../../assets/icons/HeartIcon";
import testImg from "../../../assets/images/testImg1.png";
import * as R from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../../components/CustomProfile";
import HashtagsBox from "../../../components/HashtagsBox";
import ImageView from "../../../components/ImageView";
import LikeCommentBox from "../../../components/LikeCommentBox";
import CommentCard from "../../../components/mobile/CommentCard";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ImageSlider from "../../../components/mobile/ImageSlider";
import TraveloguePlaceBox from "../../../components/TraveloguePlaceBox";
import {
  testImageList,
  testLogContents1,
  testLogContents2,
  testLogContents3,
  testLogTags,
  testUserDto,
} from "../../../utils/staticDatas";

export default function TravelogueDetails() {
  const [fillHeart, setFillHeart] = useState(false);
  const [fillLike, setFillLike] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWriteCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`${comment} submit`);
  };

  return (
    <TravelogueDetailsContainer>
      {isModalOpen && (
        <ImageSlider
          imageList={testImageList}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <CustomHeader title="안동 혼자 뚜벅이 여행 떠나기" fontSize="16px">
        <HeartBox onClick={() => setFillHeart((prev) => !prev)}>
          <HeartIcon
            fill={fillHeart ? "#FF5757" : "none"}
            stroke={fillHeart ? "#FF5757" : "#808080"}
          />
        </HeartBox>
      </CustomHeader>
      <TravelogueDetailsBody>
        <ImageView
          src={testImg}
          alt="Travelogue"
          width="100%"
          height="191px"
          bottomText={`+${testImageList.length - 1}`}
          pointer={true}
          handleClick={() => setIsModalOpen(true)}
        />
        <R.ProfileHeader>
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
        </R.ProfileHeader>
        <HashtagsBox hashTags={testLogTags} />
        <p dangerouslySetInnerHTML={{ __html: testLogContents1 }} />
        <PlaceBox>
          <TraveloguePlaceBox place="안동 회화마을" />
          <TraveloguePlaceBox place="부용대" />
        </PlaceBox>
        <p dangerouslySetInnerHTML={{ __html: testLogContents2 }} />
        <TraveloguePlaceBox place="월영교" />
        <p>{testLogContents3}</p>
        <RowLine />
        <R.CommentsBox>
          <p>댓글</p>
          <R.CommentInputBox>
            <R.CommentInput>
              <input
                type="text"
                placeholder="댓글을 작성해주세요."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
            </R.CommentInput>
            <R.CommentWriteButton
              type="submit"
              fill={true}
              onClick={handleWriteCommentSubmit}
            >
              등록
            </R.CommentWriteButton>
          </R.CommentInputBox>

          <CommentCard
            content="좋은 리뷰네요!"
            createdAt="24.2.3"
            user={testUserDto}
            replyList={[]}
          />
        </R.CommentsBox>
      </TravelogueDetailsBody>
    </TravelogueDetailsContainer>
  );
}

const TravelogueDetailsContainer = styled.div`
  height: 100%;
  min-height: 360px;
`;

const HeartBox = styled.div`
  background-color: ${(props) => props.theme.color.white};
  border-radius: 99px;
  padding: 8px 9px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
`;

const TravelogueDetailsBody = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  padding: 0 16px 8px;
  overflow-y: auto;
  gap: 12px;

  & > p {
    font-size: 14px;
    color: ${(props) => props.theme.color.gray900};
    line-height: 140%;
  }
`;

const PlaceBox = styled.div`
  display: flex;
  gap: 8px;
`;

const RowLine = styled.div`
  background-color: ${(props) => props.theme.color.gray200};
  padding: 0.5px 0;
  margin: 5px 0;
`;
