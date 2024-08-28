import styled from "styled-components";
import * as R from "../../assets/styles/travelReview.style";
import CustomProfile from "./CustomProfile";
import { commentResDto, userCompactResDto } from "../../types/res.dto";
import ReplyIcon from "../../assets/icons/ReplyIcon";
import { useEffect, useState } from "react";

interface Props {
  isReply?: boolean;
  content: string;
  createdAt: string;
  user: userCompactResDto;
  replyList?: commentResDto[];
}

export default function CommentCard({
  isReply = false,
  content,
  createdAt,
  user,
  replyList,
}: Props) {
  const [writeReply, setWriteReply] = useState(false);
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (replyList && replyList?.length > 0) {
      setWriteReply(true);
    }
  }, [replyList?.length]);

  const handleWriteReplySubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`${reply} submit`);
  };
  console.log();

  return (
    <CommentCardContainer>
      <CustomProfile
        src="/src/assets/images/testImg.png"
        nickname={user.nickname}
        content={createdAt}
      />
      <p>{content}</p>
      {!isReply && (
        <>
          <R.IconBox>
            <ReplyIcon />
            {replyList && replyList.length > 0 ? (
              <span>{replyList && replyList.length}</span>
            ) : (
              <span onClick={() => setWriteReply((prev) => !prev)}>
                답글달기
              </span>
            )}
          </R.IconBox>
          {replyList &&
            replyList.map((item: commentResDto) => {
              return (
                <CommentCard
                  key={item.id}
                  isReply={true}
                  content={item.content}
                  createdAt="23.2.4"
                  user={item.userCompactResDto}
                />
              );
            })}
        </>
      )}
      {!isReply && writeReply && (
        <R.CommentInputBox>
          <R.CommentInput>
            <input
              type="text"
              placeholder="답글을 작성해주세요."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </R.CommentInput>
          <R.CommentWriteButton
            type="submit"
            onClick={handleWriteReplySubmit}
            fill={false}
          >
            등록
          </R.CommentWriteButton>
        </R.CommentInputBox>
      )}
    </CommentCardContainer>
  );
}

const CommentCardContainer = styled.div<{ reply?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 9px;
  padding: 16px;
  font-size: 12px;
  color: ${(props) => props.theme.color.gray900};
  background-color: ${(props) =>
    props.reply ? props.theme.color.background : props.theme.color.gray100};
  border-radius: 16px;

  & > p {
    font-size: 14px;
  }
`;
