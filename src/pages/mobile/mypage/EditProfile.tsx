import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import CameraIcon from "../../../assets/icons/CameraIcon";
import XIcon from "../../../assets/icons/XIcon";
import { useUserStore } from "../../../store/user.store";
import useImageUploadHook from "../../../hooks/useImageUpload";
import useProfileEditHook from "../../../hooks/useProfileEdit";
import ProfileNoImg from "../../../components/ProfileNoImg";

export default function EditProfile() {
  const userStore = useUserStore();
  const { imgRef, imgSrc, newImg, handleImageChange, handleClick } =
    useImageUploadHook();

  const {
    newNameRef,
    canSubmit,
    handleNameChange,
    handleNameDelete,
    handleSubmit,
  } = useProfileEditHook({
    newImg: newImg,
  });

  return (
    <>
      <CustomHeader title="프로필 수정" />

      <EditProfileContainer>
        <ImgBox>
          {userStore.getUserProfile() || imgSrc ? (
            <img src={imgSrc || userStore.getUserProfile()} alt="profile" />
          ) : (
            <ProfileNoImg width="80px" height="80px" />
          )}
          <CameraIconBox onClick={handleClick}>
            <CameraIcon />
            <input
              hidden
              type="file"
              ref={imgRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </CameraIconBox>
        </ImgBox>

        <NicknameInputBox>
          <input
            ref={newNameRef}
            onChange={handleNameChange}
            type="text"
            defaultValue={userStore.getUserName()}
          />

          <XIconBox onClick={handleNameDelete}>
            <XIcon />
          </XIconBox>
        </NicknameInputBox>

        <SaveButtonBox>
          <button onClick={handleSubmit} disabled={!canSubmit}>
            저장
          </button>
        </SaveButtonBox>
      </EditProfileContainer>
    </>
  );
}

const EditProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 60px);
`;

const ImgBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: 16px 0 48px 0;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const CameraIconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: ${(props) => props.theme.color.gray200};
`;

const NicknameInputBox = styled.div`
  min-width: 250px;
  width: 60%;
  height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray200};

  & > input {
    background-color: transparent;
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    &:focus {
      outline: none;
    }
  }
`;

const XIconBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
`;

const SaveButtonBox = styled.div`
  flex: 1;
  padding-bottom: 30px;
  display: flex;
  align-items: flex-end;

  & > button {
    width: 190px;
    height: 45px;
    padding: 12px 94px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;

    background-color: ${(props) => props.theme.color.secondary};
    border-radius: 16px;

    &:disabled {
      background-color: ${(props) => props.theme.color.gray200};
    }
  }
`;
