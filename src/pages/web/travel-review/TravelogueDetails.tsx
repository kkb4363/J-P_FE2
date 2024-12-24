import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HeartIcon from "../../../assets/icons/HeartIcon";
import * as R from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../../components/CustomProfile";
import HashtagsBox from "../../../components/HashtagsBox";
import LikeCommentBox from "../../../components/LikeCommentBox";
import CommentCard from "../../../components/mobile/CommentCard";
import TraveloguePlaceBox from "../../../components/TraveloguePlaceBox";
import Container from "../../../components/web/Container";
import ImageView from "../../../components/web/ImageView";
import {
  getDiaryDetail,
  setComment as setCommentApi,
  setLike,
} from "../../../service/axios";
import { TravelogDetailProps } from "../../../types/travelreview";
import { formatDayNights } from "../../../utils/dayNights";
import { testLogTags } from "../../../utils/staticDatas";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function TravelogueDetails() {
  const navigate = useNavigate();
  const { travelogueId } = useParams();
  const [diaryData, setDiaryData] = useState<TravelogDetailProps>();
  const [comment, setComment] = useState("");

  const [likeState, setLikeState] = useState({
    isLiked: false,
    likeCount: 0,
  });

  const [isBookMarked, setIsBookMarked] = useState(false);

  const { nights, days } = diaryData
    ? formatDayNights(diaryData.scheduleStartDate, diaryData.scheduleEndDate)
    : { nights: 0, days: 0 };

  const handleImageClick = (index: number) => {
    navigate(`/home/travelogue/${travelogueId}/photo`, {
      state: { currentIndex: index, images: diaryData?.fileInfos },
    });
  };

  const requestApi = () => {
    getDiaryDetail(Number(travelogueId)).then((res) => {
      if (res) {
        setDiaryData(res?.data);

        setLikeState({
          isLiked: res?.data?.isLiked,
          likeCount: res?.data?.likeCnt,
        });

        setIsBookMarked(res?.data?.isBookmarked);
      }
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
        if (res?.data) {
          setLikeState((p) => ({
            isLiked: true,
            likeCount: p.likeCount + 1,
          }));
        } else {
          setLikeState((p) => ({
            isLiked: false,
            likeCount: p.likeCount - 1,
          }));
        }
      });
    }
  };

  const handleHeart = () => {
    if (!cookies.get("userToken"))
      return toast(<span>로그인이 필요합니다.</span>);

    if (diaryData?.id) {
      setLike({
        actionType: "BOOKMARK",
        targetType: "DIARY",
        id: diaryData.id + "",
      }).then((res) => {
        if (res?.data) {
          setIsBookMarked(true);
          toast(<span>내 찜 목록에 추가되었습니다</span>);
        } else {
          setIsBookMarked(false);
          toast(<span>내 찜 목록에서 삭제되었습니다</span>);
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
    <div>
      {diaryData && (
        <Container>
          <TravelogueDetailsTitle>
            <div />
            <h1>{diaryData.subject}</h1>
            <HeartBox onClick={handleHeart}>
              <HeartIcon
                fill={isBookMarked ? "#FF5757" : "none"}
                stroke={isBookMarked ? "#FF5757" : "#808080"}
              />
            </HeartBox>
          </TravelogueDetailsTitle>
          <TravelogueDetailsBody>
            <DetailsHeader>
              <ProfileLikeCommentBox>
                <CustomProfile
                  src={diaryData.userCompactResDto.profile}
                  nickname={diaryData.userCompactResDto.nickname}
                  content={`${nights}박 ${days}일 여행`}
                />
                <LikeCommentBox
                  likeCnt={likeState?.likeCount}
                  commentCnt={diaryData.commentCnt}
                  fillLike={likeState?.isLiked}
                  likeClick={handleLike}
                />
              </ProfileLikeCommentBox>
              <HashtagsBox hashTags={testLogTags} />
            </DetailsHeader>
            <ImageView
              width="100%"
              height="385px"
              bottomText={
                diaryData.fileInfos.length > 1
                  ? `+${diaryData.fileInfos.length - 1}`
                  : undefined
              }
              alt="여행기 사진"
              src={diaryData.fileInfos[0].fileUrl}
              pointer={true}
              handleClick={() => handleImageClick(0)}
            />
            <PlaceBox>
              <TraveloguePlaceBox place="안동 회화마을" />
              <TraveloguePlaceBox place="부용대" />
            </PlaceBox>
            <p>{diaryData.content}</p>
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
              $fill={true}
              $fontSize="14px"
              onClick={handleCommentAdd}
            >
              등록
            </R.CommentWriteButton>
          </R.CommentInputBox>
          <CommentBox>
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
