import styled from "styled-components";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewDetailApiProps } from "../../../types/home.details";
import { LikeCommentBox } from "../../../assets/styles/home.style";
import { testImageList, testReviewItem } from "../../../utils/staticDatas";
import * as R from "../../../assets/styles/travelReview.style";
import ImageView from "../../../components/ImageView";
import MarkIcon from "../../../assets/icons/MarkIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import LikeIcon from "../../../assets/icons/LikeIcon";
import CommentIcon from "../../../assets/icons/CommentIcon";
import CommentCard from "../../../components/mobile/CommentCard";
import CustomProfile from "../../../components/CustomProfile";

export default function ReviewDetails() {
  const params = useParams();
  const [review, setReview] = useState<ReviewDetailApiProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [fillLike, setFillLike] = useState(false);
  const [comment, setComment] = useState("");
  const [commentCnt, setCommentCnt] = useState(-1);
  const navigate = useNavigate();

  const requestApi = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/review/${params?.reviewId}`);

      if (res.status === 200) {
        console.log(res);
        setReview(res.data);
        setCommentCnt(res.data.commentResDtoList.length);
      }
    } catch (error) {
      console.error("api error=", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWriteCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`${comment} submit`);
  };

  const handleImageClick = (index: number) => {
    navigate(`/review/${params.reviewId}/photo`, {
      state: { currentIndex: index, images: testImageList }, // 이미지 인덱스와 목록을 state로 전달
    });
  };

  useEffect(() => {
    //requestApi();
    setCommentCnt(1);
  }, [params.reviewId]);
  return (
    <div>
      {isLoading && <R.LoadingText>로딩중...</R.LoadingText>}
      {!isLoading && (
        <ReviewDetailsContainer>
          <ReviewDetailsHeader>리뷰</ReviewDetailsHeader>
          <ReviewDetailsBody>
            <ReviewPlaceBox>
              <MarkIcon stroke="#1A1A1A" />
              <h2>오대산 선재길</h2>
            </ReviewPlaceBox>
            <R.ProfileHeader>
              <CustomProfile
                src="/src/assets/images/testImg.png"
                nickname={review ? review.userCompactResDto.nickname : "yeeso"}
                content="24.2.3"
              />
              <R.IconBox>
                <StarIcon />
                <span>{review ? review.star : 4.8}</span>
              </R.IconBox>
            </R.ProfileHeader>
            <div>
              <ReviewContents $isTitle={true}>
                오대산 선재길에서 산책하기
              </ReviewContents>
              <ReviewContents>
                자연의 힐링을 동시에 누릴 수 있는 최고의 장소였어요! 산책로 따라
                걸으며 힐링을 만끽했어요! 자연의 힐링을 동시에 누릴 수 있는
                최고의 장소였어요! 산책로 따라 걸으며 힐링을 만끽했어요!
              </ReviewContents>
            </div>
            <ReviewDetailsImageBox>
              {testImageList.slice(0, 4).map((url, i) => (
                <ImageWrapper key={i} onClick={() => handleImageClick(i)}>
                  <ImageView
                    src={url}
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
            <LikeCommentBox>
              <R.IconBox>
                <LikeIcon
                  fill={fillLike ? "#FFC814" : "none"}
                  onClick={() => setFillLike((prev) => !prev)}
                />
                <span>{review ? review.likeCnt : 12}</span>
              </R.IconBox>
              <R.IconBox>
                <CommentIcon stroke="#808080" />
                <span>{review ? review.commentResDtoList.length : 1}</span>
              </R.IconBox>
            </LikeCommentBox>
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
              fill={true}
              fontsize="14px"
              onClick={handleWriteCommentSubmit}
            >
              등록
            </R.CommentWriteButton>
          </R.CommentInputBox>
          {/* {commentCnt == 0 && (
            <R.LoadingText>첫 댓글을 작성해주세요!</R.LoadingText>
          )}
          {commentCnt > 0 &&
            review?.commentResDtoList.map((item: commentResDto) => {
              return (
                <CommentCard
                  key={item.id}
                  content="좋은 리뷰네요!"
                  createdAt="24.2.3"
                  user={item.userCompactResDto}
                  replyList={item.replyList}
                />
              );
            })} */}
          <CommentBox>
            <CommentCard
              content={testReviewItem.content}
              createdAt={testReviewItem.createdAt}
              user={testReviewItem.userCompactResDto}
              replyList={[]}
              web
            />
          </CommentBox>
        </ReviewDetailsContainer>
      )}
    </div>
  );
}

const ReviewDetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 60px 15%;
`;

const ReviewDetailsHeader = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
`;

const ReviewDetailsBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
