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
import { deleteComment, setCommentReply } from "../../service/axios";

export default function CommentCard(
  props: CommentProps & { isReply?: boolean; setIsReply?: any; isWeb?: boolean }
) {
  const { isReply = false, setIsReply, isWeb } = props;

  const [writeReply, setWriteReply] = useState(false);
  const [reply, setReply] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(props?.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (props?.replyList && props?.replyList?.length > 0) {
      setWriteReply(true);
    }
  }, [props?.replyList?.length]);

  const handleWriteReplySubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`${reply} submit`);
  };
  const handleEditClick = () => {
    setWriteReply(false);
    setEdit(true);
  };

  const handleDeleteClick = () => {
    deleteComment({ commentId: props?.id }).then((res) => {
      if (res) {
        setIsReply((p: any) => !p);
      }
    });
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

  const handleReplyAdd = () => {
    if (reply) {
      setCommentReply({ commentId: props.id + "", content: reply }).then(
        (res) => {
          if (res) {
            console.log(res);
            setIsReply((p: any) => !p);
          }
        }
      );
    }
  };

  return (
    <>
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
      <CommentCardContainer $reply={isReply} $edit={edit} $web={false}>
        <CustomProfile
          src={
            props?.userCompactResDto?.profile
              ? props?.userCompactResDto?.profile
              : ""
          }
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
                    {props?.replyList && props?.replyList.length > 0 ? (
                      <span>{props?.replyList && props?.replyList.length}</span>
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
            {props?.replyList &&
              props?.replyList.map((item: CommentProps) => {
                return <CommentCard key={item.id} {...item} isReply={true} />;
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
              $fill={false}
              $fontSize="14px"
              onClick={handleReplyAdd}
            >
              등록
            </R.CommentWriteButton>
          </R.CommentInputBox>
        )}
        {/* {isReply && (
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
        )} */}
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
