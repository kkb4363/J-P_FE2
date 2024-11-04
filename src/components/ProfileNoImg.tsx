import styled from "styled-components";
import ProfileIcon from "../assets/icons/ProfileIcon";

interface Props {
  width: string;
  height: string;
  onClick?: () => void;
}

export default function ProfileNoImg({ width, height, onClick }: Props) {
  return (
    <ProfileNoImgContainer $width={width} $height={height} onClick={onClick}>
      <ProfileIcon />
    </ProfileNoImgContainer>
  );
}

const ProfileNoImgContainer = styled.div<{ $width: string; $height: string }>`
  border-radius: 50%;
  width: ${(props) => props.$width && props.$width};
  height: ${(props) => props.$height && props.$height};
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.color.gray100};
`;
