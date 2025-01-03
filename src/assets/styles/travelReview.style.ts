import styled from "styled-components";

export const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1px;
`;

export const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > p {
    font-size: 14px;
    color: ${(props) => props.theme.color.gray900};
    margin: 5px 0 0 8px;
  }
`;

export const CommentInputBox = styled.div`
  width: 100%;
  display: flex;
  gap: 6px;
`;

export const CommentInput = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.gray900};
  padding: 9px 22px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  & > input {
    width: 100%;
    outline: none;
    font-size: 12px;
    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
      font-size: 12px;
    }
  }
`;

export const CommentWriteButton = styled.button<{
  $fill: boolean;
  $fontSize?: string;
}>`
  background-color: ${(props) =>
    props.$fill ? props.theme.color.main : props.theme.color.white};
  color: ${(props) =>
    props.$fill ? props.theme.color.white : props.theme.color.gray300};
  border: 1px solid ${(props) => !props.$fill && props.theme.color.gray200};
  white-space: nowrap;
  border-radius: 30px;
  padding: 8.5px 17px;
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : "12px")};

  &:active {
    opacity: ${(props) => props.$fill && 0.5};
    background-color: ${(props) => !props.$fill && props.theme.color.gray100};
  }
`;
