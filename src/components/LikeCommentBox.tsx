import styled from "styled-components";
import CommentIcon from "../assets/icons/CommentIcon";
import LikeIcon from "../assets/icons/LikeIcon";
import IconBox from "./IconBox";
import HeartIcon from "../assets/icons/HeartIcon";

interface Props {
  commentCnt: number;
  isReview?: boolean;
  likeCnt?: number;
  fillLike?: boolean;
  likeClick?: () => void;
}

export default function LikeCommentBox({
  isReview = true,
  likeCnt,
  commentCnt,
  fillLike = false,
  likeClick,
}: Props) {
  return (
    <LikeCommentBoxContainer>
      <IconBox>
        {isReview ? (
          <LikeIcon fill={fillLike ? "#FFC814" : "none"} onClick={likeClick} />
        ) : (
          <HeartIcon />
        )}
        <span>{likeCnt}</span>
      </IconBox>
      <IconBox>
        <CommentIcon />
        <span>{commentCnt}</span>
      </IconBox>
    </LikeCommentBoxContainer>
  );
}

export const LikeCommentBoxContainer = styled.div`
  display: flex;
  gap: 6px;
`;
