import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PencilIcon from "../../assets/icons/PencilIcon";
import ReplyIcon from "../../assets/icons/ReplyIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import * as R from "../../assets/styles/travelReview.style";
import { CommentProps } from "../../types/travelreview";
import CustomProfile from "../CustomProfile";
import IconBox from "../IconBox";
import TwoButtonsModal from "../TwoButtonsModal";
import {
  deleteComment,
  setCommentReply,
  updateComment,
} from "../../service/axios";

export default function CommentCard(
  props: CommentProps & { isReply?: boolean; setIsReply?: any; isWeb?: boolean }
) {
  const { isReply = false, setIsReply, isWeb } = props;

  const [writeReply, setWriteReply] = useState(
    () => props?.replyList?.length > 0
  );
  const [reply, setReply] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(props?.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasReplies = props?.replyList?.length > 0;

  useEffect(() => {
    if (edit && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [edit, content]);

  const handleEditClick = () => {
    setWriteReply(false);
    setEdit(true);
  };

  const handleEditSubmit = (type: "comment" | "reply") => {
    if (props?.id) {
      updateComment({
        type: type,
        id: props.id,
        content: content,
      }).then(() => {
        setEdit(false);
      });
    }
  };

  const handleDeleteClick = () => {
    if (props?.id) {
      deleteComment({
        type: props?.isReply ? "reply" : "comment",
        id: props.id,
      }).then((res) => {
        if (res) {
          setIsReply((prev: any) => !prev);
        }
      });
      setDeleteModal(false);
    }
  };

  const handleReplyAdd = () => {
    if (reply) {
      setCommentReply({ commentId: props.id + "", content: reply }).then(
        (res) => {
          if (res) {
            setIsReply((prev: any) => !prev);
            setReply("");
          }
        }
      );
    }
  };

  const renderEditAndDeleteIcons = (type: "comment" | "reply") => {
    return edit ? (
      <p onClick={() => handleEditSubmit(type)}>저장</p>
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
    );
  };

  return (
    <>
      <CommentCardContainer $reply={isReply} $edit={edit} $web={false}>
        <CustomProfile
          src={props?.userCompactResDto?.profile || ""}
          nickname={props?.userCompactResDto?.nickname}
          content={props?.createdAt}
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
                    {hasReplies ? (
                      <span>{props?.replyList.length}</span>
                    ) : (
                      <span onClick={() => setWriteReply((prev) => !prev)}>
                        답글달기
                      </span>
                    )}
                  </>
                )}
              </IconBox>
              <CommentEditIconBox>
                {renderEditAndDeleteIcons("comment")}
              </CommentEditIconBox>
            </CommentFooter>
            {props?.replyList?.map((item: CommentProps) => (
              <CommentCard
                key={item.id}
                {...item}
                isReply={true}
                setIsReply={setIsReply}
              />
            ))}
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
              $fill={Boolean(reply)}
              $fontSize="14px"
              onClick={handleReplyAdd}
              disabled={!reply}
            >
              등록
            </R.CommentWriteButton>
          </R.CommentInputBox>
        )}
        {isReply && (
          <CommentEditIconBox>
            {renderEditAndDeleteIcons("reply")}
          </CommentEditIconBox>
        )}
      </CommentCardContainer>
      {deleteModal && (
        <TwoButtonsModal
          isMobile={false}
          width="470px"
          height="390px"
          text="댓글을 삭제할까요?"
          onClick={handleDeleteClick}
          onClose={() => setDeleteModal(false)}
        />
      )}
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

  margin-top: 8px;
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

  & > p {
    color: ${(props) => props.theme.color.secondary};
    cursor: pointer;
  }

  & > svg {
    cursor: pointer;
  }

  & > div > svg {
    cursor: pointer;
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
