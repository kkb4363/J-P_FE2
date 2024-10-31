import styled from "styled-components";
import { ExtendedContainer } from "./Onboarding";
import Header from "../../../components/web/Header";
import NicknameIcon from "../../../assets/icons/NicknameIcon";
import PrimaryButton from "../../../components/PrimaryButton";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Survey() {
  const navigate = useNavigate();
  const [_, setCookie] = useCookies(["userToken"]);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  // 개발환경 isDev=true , 빌드환경 isDev=false
  const handleGoogleLogin = async () => {
    try {
      const res = await axiosInstance.get(
        `/login/oauth2/code/google?code=${code}&isDev=true`
      );
      const accessToken = res.headers.authorization;
      setCookie("userToken", accessToken);

      if (res.status === 200) {
        res.data.isSignUp ? navigate("/home") : null;
      }
    } catch (err) {
      console.error("구글 로그인 에러=", err);
    }
  };

  useEffect(() => {
    if (code) {
      handleGoogleLogin();
    }
  }, [code]);

  return (
    <ExtendedContainer>
      <Header minWidth="1440px" />

      <SurveyBox>
        <p>닉네임을 입력해주세요.</p>

        <NameInput>
          <NicknameIcon />
          <input placeholder="닉네임을 입력해주세요." />
        </NameInput>

        <p>성향을 선택해주세요.</p>

        <SelectJPBoxRow>
          <SelectJPBox>
            <span>J형/계획형</span>
          </SelectJPBox>
          <SelectJPBox>
            <span>P형/즉흥형</span>
          </SelectJPBox>
        </SelectJPBoxRow>

        <PrimaryButton
          width="260px"
          height="50px"
          text="시작하기"
          onClick={() => {}}
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

const SelectJPBox = styled.button`
  width: 140px;
  height: 54px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.black};
    font-size: 16px;
    font-weight: 400;
  }

  &:hover {
    opacity: 0.6;
  }
`;
