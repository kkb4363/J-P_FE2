import styled from "styled-components";
import SearchIcon from "../../assets/icons/SearchIcon";

interface Props {
  height?: string;
  width?: string;
  text: string;
  // ref
  // callback or onClick
}

export default function CustomInput({
  height = "45px",
  width = "100%",
  text,
}: Props) {
  return (
    <CustomInputContainer $height={height} $width={width}>
      <SearchIcon />

      <input placeholder={text} />
    </CustomInputContainer>
  );
}

const CustomInputContainer = styled.div<{ $height: string; $width: string }>`
  height: ${({ $height }) => $height && $height};
  width: ${({ $width }) => $width && $width};
  padding: 16px 30px 16px 22px;
  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 30px;
  border: 0.8px solid #e6e6e6;
  background: #fff;
  box-shadow: 0px 4px 15px 0px rgba(26, 26, 26, 0.05);

  & > input {
    outline: none;
    width: 100%;
    color: #1a1a1a;
    font-family: Pretendard;
    text-transform: capitalize;

    &::placeholder {
      color: #b8b8b8;
      font-family: Pretendard;
      font-size: 14px;
    }
  }
`;
