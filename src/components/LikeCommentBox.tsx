import styled from "styled-components";
import CommentIcon from "../assets/icons/CommentIcon";
import LikeIcon from "../assets/icons/LikeIcon";
import IconBox from "./IconBox";

interface Props {
  likeCnt: number;
  commentCnt: number;
  fillLike?: boolean;
  likeClick?: () => void;
}

export default function LikeCommentBox({ likeCnt, commentCnt, fillLike = false, likeClick }: Props) {
  return (
    <LikeCommentBoxContainer>
      <IconBox>
        <LikeIcon
          fill={fillLike ? "#FFC814" : "none"}
          onClick={likeClick}
        />
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
