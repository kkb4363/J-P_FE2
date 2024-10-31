import styled from "styled-components";
import { useEffect, useState } from "react";
import NicknameIcon from "../../../assets/icons/NicknameIcon";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import PrimaryButton from "../../../components/PrimaryButton";
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
        `/login/oauth2/code/google?code=${code}&viewType=MOBILE`
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

  useEffect(() => {
    if (code) {
      handleGoogleLogin();
    } else {
      console.log("로그인 에러");
    }
  }, [code]);

  return (
    <>
      <SurveyContainer>
        <SurveyHeader>
          <LogoutIcon />
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
                  onClick={() => handleJPSelect("J" as JPProps)}
                >
                  J 형/계획형
                </SurveyTypeButton>
                <SurveyTypeButton
                  isSelected={type === ("P" as JPProps)}
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
    </>
  );
}

const SurveyContainer = styled.div`
  width: 100%;
  height: 100%;
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
  justify-content: space-evenly;
  align-items: center;
  gap: 34px;
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

const SurveyTypeButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 18px 0;
  white-space: nowrap;
  background-color: ${(props) =>
    props.isSelected ? props.theme.color.gray200 : props.theme.color.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  font-size: 14px;
`;

const SurveyButtonBox = styled.div`
  width: 100%;
  min-width: 280px;
  padding: 0 57px;
`;
