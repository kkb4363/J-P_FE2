import styled from "styled-components";
import SearchIcon from "../../assets/icons/SearchIcon";
import React from "react";
import CancelIcon from "../../assets/icons/CancelIcon";

interface Props {
  height?: string;
  width?: string;
  text: string;
  value: string;
  del?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onkeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // ref
  // callback or onClick
}

export default function CustomInput({
  height = "45px",
  width = "100%",
  text,
  value,
  del,
  onChange,
  onSubmit,
  onClick,
  onDelete,
  onkeydown,
}: Props) {
  return (
    <CustomInputContainer $height={height} $width={width}>
      <SearchIcon />
      <form onSubmit={onSubmit}>
        <input
          placeholder={text}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onkeydown}
        />
      </form>
      {del ? (
        <TextDeleteButton onClick={onDelete}>
          <CancelIcon stroke="#FFFFFF" />
        </TextDeleteButton>
      ) : (
        <EmptyBox />
      )}
    </CustomInputContainer>
  );
}

const CustomInputContainer = styled.div<{ $height: string; $width: string }>`
  height: ${({ $height }) => $height && $height};
  width: ${({ $width }) => $width && $width};
  padding: 10.5px 30px 10.5px 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 30px;
  border: 0.8px solid ${(props) => props.theme.color.gray200};
  background: ${(props) => props.theme.color.white};
  box-shadow: 0px 4px 15px 0px rgba(26, 26, 26, 0.05);

  & > form {
    width: 100%;
  }

  & > form > input {
    outline: none;
    width: 100%;
    color: ${(props) => props.theme.color.gray900};

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
      font-size: 14px;
    }
  }
`;

const TextDeleteButton = styled.button`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  background-color: ${(props) => props.theme.color.gray200};
`;

const EmptyBox = styled.div`
  width: 22px;
  height: 22px;
`;
