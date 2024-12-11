import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeartIcon from "../../../assets/icons/HeartIcon";
import * as R from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../../components/CustomProfile";
import HashtagsBox from "../../../components/HashtagsBox";
import ImageView from "../../../components/ImageView";
import LikeCommentBox from "../../../components/LikeCommentBox";
import CommentCard from "../../../components/mobile/CommentCard";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ImageSlider from "../../../components/mobile/ImageSlider";
import TraveloguePlaceBox from "../../../components/TraveloguePlaceBox";
import { getDiaryDetail } from "../../../service/axios";
import { TravelogDetailProps } from "../../../types/travelreview";
import { formatDayNights } from "../../../utils/dayNights";
import { testImageList, testLogTags } from "../../../utils/staticDatas";

export default function TravelogueDetails() {
  const { travelogueId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [diaryData, setDiaryData] = useState<TravelogDetailProps>();
  const [fillHeart, setFillHeart] = useState(false);
  const [fillLike, setFillLike] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { nights, days } = diaryData
    ? formatDayNights(diaryData.scheduleStartDate, diaryData.scheduleEndDate)
    : { nights: 0, days: 0 };

  const handleWriteCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`${comment} submit`);
  };

  const requestApi = async () => {
    setIsLoading(true);
    await getDiaryDetail(Number(travelogueId)).then((res) => {
      setDiaryData(res?.data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    requestApi();
  }, [travelogueId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {diaryData && (
        <TravelogueDetailsContainer>
          {isModalOpen && (
            <ImageSlider
              imageList={diaryData.fileInfos}
              onClose={() => setIsModalOpen(false)}
            />
          )}
          <CustomHeader title={diaryData.subject} fontSize="16px">
            <HeartBox onClick={() => setFillHeart((prev) => !prev)}>
              <HeartIcon
                fill={fillHeart ? "#FF5757" : "none"}
                stroke={fillHeart ? "#FF5757" : "#808080"}
              />
            </HeartBox>
          </CustomHeader>
          <TravelogueDetailsBody>
            <ImageView
              src={diaryData.fileInfos[0].fileUrl}
              alt="Travelogue"
              width="100%"
              height="191px"
              bottomText={
                diaryData.fileInfos.length > 1
                  ? `+${diaryData.fileInfos.length - 1}`
                  : undefined
              }
              pointer={true}
              handleClick={() => setIsModalOpen(true)}
            />
            <R.ProfileHeader>
              <CustomProfile
                src={diaryData.userCompactResDto.profile}
                nickname={diaryData.userCompactResDto.nickname}
                content={`${nights}박 ${days}일 여행`}
              />
              <LikeCommentBox
                likeCnt={12}
                commentCnt={8}
                fillLike={fillLike}
                likeClick={() => setFillLike((prev) => !prev)}
              />
            </R.ProfileHeader>
            <HashtagsBox hashTags={testLogTags} />
            <PlaceBox>
              <TraveloguePlaceBox place="안동 회화마을" />
              <TraveloguePlaceBox place="부용대" />
            </PlaceBox>

            <p>{diaryData.content}</p>
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

              {diaryData.commentResDtoList.map((comment, idx) => {
                return (
                  <CommentCard
                    key={idx}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    user={comment.userCompactResDto}
                    replyList={comment.replyList}
                  />
                );
              })}
            </R.CommentsBox>
          </TravelogueDetailsBody>
        </TravelogueDetailsContainer>
      )}
    </>
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
