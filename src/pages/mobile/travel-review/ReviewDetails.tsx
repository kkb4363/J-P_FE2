import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import StarIcon from "../../../assets/icons/StarIcon";
import * as R from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../../components/CustomProfile";
import IconBox from "../../../components/IconBox";
import ImageView from "../../../components/ImageView";
import LikeCommentBox from "../../../components/LikeCommentBox";
import CommentCard from "../../../components/mobile/CommentCard";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ImageSlider from "../../../components/mobile/ImageSlider";
import {
  getReviewDetail,
  setComment as setCommentApi,
  setLike,
} from "../../../service/axios";
import { CommentProps, ReviewDetailProps } from "../../../types/travelreview";

export default function ReviewDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusImgIdx, setFocusImgIdx] = useState(0);

  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [likeState, setLikeState] = useState({
    isLiked: false,
    likeCount: 0,
  });
  const [comment, setComment] = useState("");

  const [data, setData] = useState<ReviewDetailProps>({} as ReviewDetailProps);

  const requestApi = () => {
    setIsLoading(true);
    getReviewDetail(Number(reviewId)).then((res) => {
      setData(res?.data);
      setIsLoading(false);

      setLikeState({
        isLiked: res?.data?.isLiked,
        likeCount: res?.data?.likeCnt,
      });
    });
  };

  const handleImageClick = (index: number) => {
    navigate(`/home/review/${reviewId}/photo`, {
      state: {
        currentIndex: index,
        images: data?.fileInfos,
      }, // 이미지 인덱스와 목록을 state로 전달
    });
  };

  const handleLike = () => {
    if (reviewId) {
      setLike({ actionType: "LIKE", targetType: "REVIEW", id: reviewId }).then(
        (res) => {
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
        }
      );
    }
  };

  useEffect(() => {
    requestApi();
  }, [reviewId]);

  const handleCommentAdd = () => {
    if (comment) {
      setCommentApi({
        targetId: Number(reviewId),
        commentType: "REVIEW",
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
    <ReviewDetailContainer>
      <CustomHeader title="오대산 선재길" isPlace fontSize="16px" />
      {isLoading && <NoResultsText>로딩중...</NoResultsText>}
      {isModalOpen && (
        <ImageSlider
          imageList={data?.fileInfos}
          onClose={() => setIsModalOpen(false)}
          focusIndex={focusImgIdx}
        />
      )}
      {!isLoading && (
        <ReviewDetailsBody>
          <R.ProfileHeader>
            <CustomProfile
              src={data?.userCompactResDto?.profile}
              nickname={data?.userCompactResDto?.nickname}
              content={data?.createdAt}
            />
            <IconBox>
              <StarIcon />
              <span>{data?.star}</span>
            </IconBox>
          </R.ProfileHeader>
          <p>{data?.content}</p>
          <ReviewDetailsImageBox>
            {/* [TODO]: 이미지 api 연결해서 mapping, 4장 이상일 때 +1 표시 추가 */}
            {data?.fileInfos?.slice(0, 4).map((d, i) => (
              <ImageWrapper key={i}>
                <ImageView
                  src={d?.fileUrl}
                  alt="review img"
                  width="100%"
                  height="129px"
                  handleClick={() => {
                    setIsModalOpen(true);
                    setFocusImgIdx(i);
                  }}
                />
                {i === 3 && data?.fileInfos?.length > 4 && (
                  <ImageOverlay
                    $isActive={data?.fileInfos?.length > 4}
                    onClick={() => {
                      setIsModalOpen(true);
                      setFocusImgIdx(3);
                    }}
                  >
                    {data?.fileInfos.length > 4 && (
                      <span>{`+ ${data?.fileInfos?.length - 4}`}</span>
                    )}
                  </ImageOverlay>
                )}
              </ImageWrapper>
            ))}
          </ReviewDetailsImageBox>
          <LikeCommentBox
            likeCnt={likeState?.likeCount}
            commentCnt={data?.commentResDtoList?.length}
            fillLike={likeState?.isLiked}
            likeClick={handleLike}
          />
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
            {data?.commentResDtoList?.length == 0 && (
              <NoCommentBox>첫 댓글을 작성해주세요!</NoCommentBox>
            )}
            {data?.commentResDtoList?.length > 0 &&
              data?.commentResDtoList.map((item: CommentProps) => {
                return (
                  <CommentCard
                    isWeb={false}
                    key={item.id}
                    {...item}
                    setIsReply={setIsReplyAdded}
                  />
                );
              })}
          </R.CommentsBox>
        </ReviewDetailsBody>
      )}
    </ReviewDetailContainer>
  );
}

const ReviewDetailContainer = styled.div`
  height: 100%;
  min-width: 360px;
`;

const NoResultsText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  color: ${(props) => props.theme.color.gray300};
`;

const ReviewDetailsBody = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  overflow-y: auto;
  gap: 12px;

  & > p {
    font-size: 14px;
    color: ${(props) => props.theme.color.gray900};
  }
`;

const ReviewDetailsImageBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
`;

const NoCommentBox = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.gray100};
  color: ${(props) => props.theme.color.gray900};
  font-size: 14px;
  text-align: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block; /* Ensure the wrapper sizes to the image */
`;

const ImageOverlay = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$isActive && "rgba(0,0,0,0.5)"};
  z-index: 1;
  border-radius: 16px;

  display: grid;
  place-items: center;
  & > span {
    font-weight: 700;
    font-size: 12px;
    color: ${(props) => props.theme.color.white};
  }
`;
