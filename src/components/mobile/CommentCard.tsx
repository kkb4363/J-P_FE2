import styled from "styled-components";
import * as R from "../../assets/styles/travelReview.style";
import CustomProfile from "./CustomProfile";
import { commentResDto, userCompactResDto } from "../../types/res.dto";
import ReplyIcon from "../../assets/icons/ReplyIcon";
import { useEffect, useRef, useState } from "react";
import PencilIcon from "../../assets/icons/PencilIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import TwoButtonsModal from "./TwoButtonsModal";
import IconBox from "../IconBox";

interface Props {
  isReply?: boolean;
  web?: boolean;
  content: string;
  createdAt: string;
  user: userCompactResDto;
  replyList?: commentResDto[];
}

export default function CommentCard({
  isReply = false,
  web = false,
  content: oldContent,
  createdAt,
  user,
  replyList,
}: Props) {
  const [writeReply, setWriteReply] = useState(false);
  const [reply, setReply] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(oldContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (replyList && replyList?.length > 0) {
      setWriteReply(true);
    }
  }, [replyList?.length]);

  const handleWriteReplySubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`${reply} submit`);
  };
  const handleEditClick = () => {
    setWriteReply(false);
    setEdit(true);
  };

  const handleDeleteClick = () => {
    setDeleteModal(false);
  };

  const AutoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 맞게 조절
    }
  };

  useEffect(() => {
    AutoResizeTextarea();
  }, [edit]);

  return (
    <>
      {deleteModal && (
        <TwoButtonsModal
          text="댓글을 삭제할까요?"
          onClick={handleDeleteClick}
          onClose={() => setDeleteModal(false)}
        />
      )}
      <CommentCardContainer $reply={isReply} $edit={edit} $web={web}>
        <CustomProfile
          src="/src/assets/images/testImg.png"
          nickname={user.nickname}
          content={createdAt}
        />
        <ContentBox>
          {edit ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <p>{content}</p>
          )}
        </ContentBox>
        {!isReply && (
          <>
            <CommentFooter>
              <IconBox>
                {!edit && (
                  <>
                    <ReplyIcon />
                    {replyList && replyList.length > 0 ? (
                      <span>{replyList && replyList.length}</span>
                    ) : (
                      <span onClick={() => setWriteReply((prev) => !prev)}>
                        답글달기
                      </span>
                    )}
                  </>
                )}
              </IconBox>

              <CommentEditIconBox>
                {edit ? (
                  <p onClick={() => setEdit(false)}>저장</p>
                ) : (
                  <>
                    <div onClick={handleEditClick}>
                      <PencilIcon />
                    </div>
                    <div onClick={() => setDeleteModal(true)}>
                      <TrashIcon
                        stroke="#808080"
                        strokeWidth={1.8}
                        width={16}
                        height={16}
                      />
                    </div>
                  </>
                )}
              </CommentEditIconBox>
            </CommentFooter>
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
            <CommentInput>
              <input
                type="text"
                placeholder="답글을 작성해주세요."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </CommentInput>
            <R.CommentWriteButton
              type="submit"
              fill={false}
              fontsize="14px"
              onClick={handleWriteReplySubmit}
            >
              등록
            </R.CommentWriteButton>
          </R.CommentInputBox>
        )}
        {isReply && (
          <>
            <CommentEditIconBox>
              <PencilIcon />
              <TrashIcon
                stroke="#808080"
                strokeWidth={1.8}
                width={16}
                height={16}
              />
            </CommentEditIconBox>
          </>
        )}
      </CommentCardContainer>
    </>
  );
}

const CommentCardContainer = styled.div<{
  $reply?: boolean;
  $edit?: boolean;
  $web: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  padding: ${({ $web }) => ($web ? "24px" : "16px")};
  font-size: 12px;
  color: ${(props) => props.theme.color.gray900};
  background-color: ${(props) =>
    props.$edit
      ? props.theme.color.white
      : props.$reply
      ? props.theme.color.background
      : props.theme.color.gray100};
  border-radius: 16px;
  box-shadow: ${(props) =>
    props.$edit && `0 0 0 1px ${props.theme.color.gray200} inset`};
`;

const ContentBox = styled.div`
  & > p {
    font-size: 14px;
    line-height: 140%;
  }

  & > textarea {
    padding: 0;
    outline: none;
    border: none;
    width: 100%;
    resize: none;
    line-height: 140%;
    font-size: 14px;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 19px;
`;

const CommentEditIconBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
  cursor: pointer;

  & > p {
    color: ${(props) => props.theme.color.secondary};
  }
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
