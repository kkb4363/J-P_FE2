import styled from "styled-components";
import { ExtendedContainer } from "./Onboarding";
import Header from "../../../components/web/Header";
import NicknameIcon from "../../../assets/icons/NicknameIcon";
import PrimaryButton from "../../../components/PrimaryButton";
import { Cookies, useCookies } from "react-cookie";
import {
  axiosInstance,
  getMyProfile,
  updateUser,
} from "../../../service/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { UserType, useUserStore } from "../../../store/user.store";
const cookies = new Cookies();

export default function Survey() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const [_, setCookie] = useCookies(["userToken"]);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const nickNameRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("");

  const handleJPSelect = (type: string) => {
    setType(type);
  };

  const handleSubmit = async () => {
    if (nickNameRef.current && !!nickNameRef.current.value && !!type) {
      updateUser({
        name: nickNameRef.current.value,
        type: type as "J" | "P",
      }).then((res) => {
        if (res && nickNameRef.current) {
          userStore.setUserName(nickNameRef.current.value);
          userStore.setUserType(type as "J" | "P");
          navigate("/home");
        }
      });
    }
  };

  // 개발환경 isDev=true , 빌드환경 isDev=false
  const handleGoogleLogin = async () => {
    try {
      const res = await axiosInstance.get(
        `/login/oauth2/code/google?code=${code}&isDev=true`
      );
      const accessToken = res.headers.authorization;
      const tokenExpiryTime = new Date(Date.now() + 60 * 200 * 1000);

      setCookie("userToken", accessToken, {
        expires: tokenExpiryTime,
      });
      userStore.setTokenExpiryTime(tokenExpiryTime);

      if (res.status === 200) {
        if (res.data.isSignUp) {
          setUserProfile();
          navigate("/home");
        } else {
          return;
        }
      }
    } catch (err) {
      console.error("구글 로그인 에러=", err);
    }
  };

  const setUserProfile = () => {
    getMyProfile().then((res) => {
      userStore.setUserName(res?.data.nickname);
      userStore.setUserType(res?.data.mbti as UserType);
      userStore.setUserProfile(res?.data.profile);
    });
  };

  useEffect(() => {
    if (code) {
      handleGoogleLogin();
    }
  }, [code]);

  useEffect(() => {
    if (!!cookies.get("userToken") && !!userStore.getUserName()) {
      navigate("/home");
    }
  }, [cookies, userStore.getUserName()]);

  return (
    <ExtendedContainer>
      <Header minWidth="1440px" />

      <SurveyBox>
        <p>닉네임을 입력해주세요.</p>

        <NameInput>
          <NicknameIcon />
          <input placeholder="닉네임을 입력해주세요." ref={nickNameRef} />
        </NameInput>

        <p>성향을 선택해주세요.</p>

        <SelectJPBoxRow>
          <SelectJPBox
            $isSelected={type === "J"}
            onClick={() => handleJPSelect("J")}
          >
            <span>J형/계획형</span>
          </SelectJPBox>
          <SelectJPBox
            $isSelected={type === "P"}
            onClick={() => handleJPSelect("P")}
          >
            <span>P형/즉흥형</span>
          </SelectJPBox>
        </SelectJPBoxRow>

        <PrimaryButton
          width="260px"
          height="50px"
          text="시작하기"
          onClick={handleSubmit}
        />
      </SurveyBox>
    </ExtendedContainer>
  );
}

const SurveyBox = styled.div`
  width: 100%;
  min-width: 1440px;
  min-height: calc(712px - 90px);
  height: calc(100% - 90px);
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;

  & > p {
    margin-bottom: 50px;
    color: ${(props) => props.theme.color.gray900};
    font-size: 20px;
    font-weight: 700;
  }
`;

const NameInput = styled.div`
  width: 370px;
  height: 50px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 23px;
  margin-bottom: 124px;

  & > input {
    outline: none;
    color: ${(props) => props.theme.color.gray300};
    font-size: 16px;
  }
`;

const SelectJPBoxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;

  margin-bottom: 117px;
`;

const SelectJPBox = styled.button<{ $isSelected: boolean }>`
  width: 140px;
  height: 54px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) =>
    props.$isSelected ? props.theme.color.gray200 : props.theme.color.white};

  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.black};
    font-size: 16px;
    font-weight: 400;
  }
`;
