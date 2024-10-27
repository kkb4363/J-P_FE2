import styled from "styled-components";
import Container from "../../../components/web/Container";
import testImg from "../../../assets/images/testImg1.png";
import CameraIcon from "../../../assets/icons/CameraIcon";
import XIcon from "../../../assets/icons/XIcon";
import PrimaryButton from "../../../components/mobile/PrimaryButton";
import { useRef, useState } from "react";

export default function EditProfile() {
  const [imgSrc, setImgSrc] = useState(testImg);
  const [newImg, setNewImg] = useState(null);

  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setImgSrc(URL.createObjectURL(selectedFile));
      setNewImg(selectedFile);
    }
  };

  return (
    <Container>
      <h1>마이페이지</h1>

      <ProfileImgBox>
        <div>
          <img src={imgSrc} alt="profile" />
          <CameraIconBox onClick={() => imgRef.current?.click()}>
            <CameraIcon />
            <input
              hidden
              type="file"
              ref={imgRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </CameraIconBox>
        </div>
      </ProfileImgBox>

      <NickNameBox>
        <div>
          <input placeholder="닉네임" />
          <DeleteIconBox>
            <XIcon />
          </DeleteIconBox>
        </div>
      </NickNameBox>

      <SaveButtonBox>
        <PrimaryButton blue={true} text="저장" width="190px" height="45px" />
      </SaveButtonBox>
    </Container>
  );
}

const ProfileImgBox = styled.div`
  margin-top: 101px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid rgba(230, 230, 230, 0.6);
    position: relative;

    & > img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }
`;

const CameraIconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  bottom: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.gray200};
`;

const NickNameBox = styled.div`
  margin-top: 85px;
  display: flex;
  justify-content: center;
  align-content: center;

  & > div {
    width: 250px;
    position: relative;

    & > input {
      width: 100%;
      height: 100%;
      padding-bottom: 14px;
      background-color: inherit;
      border-bottom: 1px solid ${(props) => props.theme.color.gray200};
      outline: none;

      color: ${(props) => props.theme.color.gray900};
      font-size: 20px;
      font-weight: 700;
      text-align: center;
    }
  }
`;

const DeleteIconBox = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.gray200};
  cursor: pointer;
`;

const SaveButtonBox = styled.div`
  margin-top: 219px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
