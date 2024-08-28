import styled from "styled-components";

interface Props {
  src: string;
  size?: string;
  fontSize?: string;
  nickname?: string;
  content?: string;
}

export default function CustomProfile({
  src,
  size,
  fontSize,
  nickname,
  content,
}: Props) {
  return (
    <RoundProfileContainer $size={size} $fontSize={fontSize}>
      <img src={src} />
      {nickname && <span>{nickname}</span>}
      {content && (
        <>
          <ColLine />
          <p>{content}</p>
        </>
      )}
    </RoundProfileContainer>
  );
}

const RoundProfileContainer = styled.div<{
  $size?: string;
  $fontSize?: string;
}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  & > img {
    width: ${({ $size }) => ($size ? $size : "24px")};
    height: ${({ $size }) => ($size ? $size : "24px")};
    border: 1px solid rgba(228, 228, 228, 0.8);
    border-radius: 300px;
  }

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : "14px")};
    line-height: 120%;
  }

  & > p {
    font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : "14px")};
    line-height: 120%;
    color: ${(props) => props.theme.color.gray500};
  }
`;

const ColLine = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${(props) => props.theme.color.gray300};
`;
