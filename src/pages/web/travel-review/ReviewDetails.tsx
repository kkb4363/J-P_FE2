import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MarkIcon from "../../../assets/icons/MarkIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import * as R from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../../components/CustomProfile";
import IconBox from "../../../components/IconBox";
import ImageView from "../../../components/ImageView";
import LikeCommentBox from "../../../components/LikeCommentBox";
import LoadingText from "../../../components/LoadingText";
import CommentCard from "../../../components/mobile/CommentCard";
import Container from "../../../components/web/Container";
import {
  getReviewDetail,
  setComment as setCommentApi,
  setLike,
} from "../../../service/axios";
import { CommentProps, ReviewDetailProps } from "../../../types/travelreview";
import { testImageList } from "../../../utils/staticDatas";

export default function ReviewDetails() {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fillLike, setFillLike] = useState(false);
  const [comment, setComment] = useState("");

  const [data, setData] = useState<ReviewDetailProps>({} as ReviewDetailProps);

  const requestApi = async () => {
    setIsLoading(true);
    await getReviewDetail(Number(reviewId)).then((res) => {
      setData(res?.data);
      setIsLoading(false);
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
          if (res) {
            console.log(res);
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
    <div>
      {isLoading && <LoadingText text="로딩중..." />}
      {!isLoading && (
        <Container>
          <h1>리뷰</h1>
          <ReviewDetailsBody>
            <ReviewPlaceBox>
              <MarkIcon stroke="#1A1A1A" />
              <h2>{data?.subject}</h2>
            </ReviewPlaceBox>
            <R.ProfileHeader>
              <CustomProfile
                src="/src/assets/images/testImg.png"
                nickname={data?.userCompactResDto?.nickname}
                content={data?.createdAt}
              />
              <IconBox>
                <StarIcon />
                <span>{data?.star}</span>
              </IconBox>
            </R.ProfileHeader>
            <div>
              <ReviewContents>{data?.content}</ReviewContents>
            </div>
            <ReviewDetailsImageBox>
              {data?.fileInfos?.slice(0, 4).map((f, i) => (
                <ImageWrapper key={i} onClick={() => handleImageClick(i)}>
                  <ImageView
                    src={f.fileUrl}
                    alt="review img"
                    width="100%"
                    height="225px"
                  />
                  {i === 3 && (
                    <ImageOverlay>
                      <span>{`+ ${testImageList.length - 3}`}</span>
                    </ImageOverlay>
                  )}
                </ImageWrapper>
              ))}
            </ReviewDetailsImageBox>
            <LikeCommentBox
              likeCnt={data?.likeCnt}
              commentCnt={data?.commentResDtoList?.length}
              fillLike={fillLike}
              likeClick={handleLike}
            />
          </ReviewDetailsBody>
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

          {data?.commentResDtoList?.length !== 0 &&
            data?.commentResDtoList?.map((review: CommentProps) => (
              <CommentCard
                key={review.id}
                {...review}
                setIsReply={setIsReplyAdded}
              />
            ))}
        </Container>
      )}
    </div>
  );
}

const ReviewDetailsBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
  padding: 24px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
`;

const ReviewPlaceBox = styled.div`
  display: flex;
  gap: 5px;
`;

const ReviewContents = styled.p<{ $isTitle?: boolean }>`
  font-weight: ${({ $isTitle }) => $isTitle && 700};
  line-height: 140%;
`;

const ReviewDetailsImageBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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

const CommentHeader = styled.p`
  margin: 16px 8px;
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
