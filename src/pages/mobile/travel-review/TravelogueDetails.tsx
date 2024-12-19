import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  getDiaryDetail,
  setComment as setCommentApi,
  setLike,
} from "../../../service/axios";
import { TravelogDetailProps } from "../../../types/travelreview";
import { formatDayNights } from "../../../utils/dayNights";
import { testLogTags } from "../../../utils/staticDatas";

export default function TravelogueDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { travelogueId } = useParams();
  const [diaryData, setDiaryData] = useState<TravelogDetailProps>();
  const [fillLike, setFillLike] = useState(false);
  const [fillHeart, setFillHeart] = useState(false);
  const [comment, setComment] = useState("");
  console.log(diaryData);
  const { nights, days } = diaryData
    ? formatDayNights(diaryData.scheduleStartDate, diaryData.scheduleEndDate)
    : { nights: 0, days: 0 };

  const handleImageClick = (index: number) => {
    navigate(`/home/travelogue/${travelogueId}/photo`, {
      state: { currentIndex: index, images: diaryData?.fileInfos },
    });
  };

  const requestApi = async () => {
    await getDiaryDetail(Number(travelogueId)).then((res) => {
      setDiaryData(res?.data);
    });
  };

  useEffect(() => {
    requestApi();
  }, [travelogueId]);

  const handleLike = () => {
    if (diaryData?.id) {
      setLike({
        actionType: "LIKE",
        targetType: "DIARY",
        id: diaryData.id + "",
      }).then((res) => {
        if (res) {
          console.log(res);
        }
      });
    }
  };

  const handleHeart = () => {
    if (diaryData?.id) {
      setLike({
        actionType: "BOOKMARK",
        targetType: "DIARY",
        id: diaryData.id + "",
      }).then((res) => {
        if (res) {
          console.log(res);
        }
      });
    }
  };

  const handleCommentAdd = () => {
    if (comment) {
      setCommentApi({
        targetId: Number(travelogueId),
        commentType: "DIARY",
        content: comment,
      }).then((res) => {
        if (res) {
          requestApi();
          setComment("");
        }
      });
    }
  };

  const [isReplyAdded, setIsReplyAdded] = useState(false);

  useEffect(() => {
    requestApi();
  }, [isReplyAdded]);

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
            <HeartBox onClick={handleHeart}>
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
                likeCnt={diaryData.likeCnt}
                commentCnt={diaryData.commentCnt}
                fillLike={fillLike}
                likeClick={handleLike}
              />
            </R.ProfileHeader>
            <HashtagsBox hashTags={testLogTags} />
            <PlaceBox>
              {/* <TraveloguePlaceBox place="안동 회화마을" />
              <TraveloguePlaceBox place="부용대" /> */}
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
                  $fill={true}
                  onClick={handleCommentAdd}
                >
                  등록
                </R.CommentWriteButton>
              </R.CommentInputBox>

              {diaryData.commentResDtoList.map((comment, idx) => {
                return (
                  <CommentCard
                    key={idx}
                    {...comment}
                    isReply={false}
                    setIsReply={setIsReplyAdded}
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
