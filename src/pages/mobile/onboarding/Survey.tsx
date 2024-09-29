import styled from "styled-components";
import { useEffect, useState } from "react";
import NicknameIcon from "../../../assets/icons/NicknameIcon";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import PrimaryButton from "../../../components/mobile/PrimaryButton";
import { axiosInstance, updateUser } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../store/user.store";

type JPProps = "J" | "P";

export default function Survey() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState("");
  const [_, setCookie] = useCookies(["userToken"]);
  const { setUserName, setUserType } = useUserStore();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleJPSelect = (type: JPProps) => {
    setType(type);
  };

  const handleSubmit = async () => {
    if (!!nickname && !!type) {
      updateUser({
        name: nickname,
        type: type as JPProps,
      }).then((res) => {
        if (res) {
          setUserName(nickname);
          setUserType(type as JPProps);
          navigate("/home");
        }
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await axiosInstance.get(
        `/login/oauth2/code/google?code=${code}`
      );
      const accessToken = res.headers.authorization;
      setCookie("userToken", accessToken);

      if (res.status === 200) {
        res.data.isSignUp ? navigate("/home") : null;
      }
    } catch (err) {
      console.error("구글 oauth 에러=", err);
    }
  };

  const handleGoogleLogout = () => { 

  }

  useEffect(() => {
    if (code) {
      handleGoogleLogin();
    } else {
      console.log("로그인 에러");
    }
  }, [code]);

  return (
    <SurveyContainer>
      <SurveyHeader>
        <div onClick={handleGoogleLogout}>
          <LogoutIcon />
        </div>
      </SurveyHeader>
      <SurveyBody>
        <SurveyBox>
          <SurveyInputBox>
            <p>닉네임을 입력해주세요.</p>
            <SurveyNicknameInput>
              <NicknameIcon />
              <input
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={handleNicknameChange}
              />
            </SurveyNicknameInput>
          </SurveyInputBox>
          <SurveyInputBox>
            <p>성향을 선택해주세요.</p>
            <SurveyTypeBox>
              <SurveyTypeButton
                isSelected={type === ("J" as JPProps)}
                type={type as JPProps}
                onClick={() => handleJPSelect("J" as JPProps)}
              >
                J 형/계획형
              </SurveyTypeButton>
              <SurveyTypeButton
                isSelected={type === ("P" as JPProps)}
                type={type as JPProps}
                onClick={() => handleJPSelect("P" as JPProps)}
              >
                P 형/즉흥형
              </SurveyTypeButton>
            </SurveyTypeBox>
          </SurveyInputBox>
        </SurveyBox>
        <SurveyButtonBox>
          <PrimaryButton text="시작하기" onClick={handleSubmit} />
        </SurveyButtonBox>
      </SurveyBody>
    </SurveyContainer>
  );
}

const SurveyContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SurveyHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  padding: 0 22px;
`;

const SurveyBody = styled.div`
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 150px;
  margin-bottom: 50px;
`;

const SurveyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SurveyInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding: 0 47px;
  gap: 24px;

  & > p {
    font-weight: 700;
    white-space: nowrap;
  }
`;

const SurveyNicknameInput = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  padding: 8px 23px;

  & > input {
    width: 100%;
    outline: none;
    font-size: 14px;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
    }
  }
`;

const SurveyTypeBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 7px;
`;

const SurveyTypeButton = styled.button<{ isSelected: boolean; type: JPProps }>`
  width: 100%;
  padding: 16px 0;
  white-space: nowrap;
  background-color: ${(props) =>
    props.isSelected
      ? props.type === "J"
        ? props.theme.color.main
        : props.theme.color.secondary
      : props.theme.color.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  font-size: 14px;
  color: ${(props) => props.isSelected && props.theme.color.white};
`;

const SurveyButtonBox = styled.div`
  width: 100%;
  min-width: 280px;
  padding: 0 57px;
`;
