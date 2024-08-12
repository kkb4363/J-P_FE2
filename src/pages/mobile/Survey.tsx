import styled from "styled-components";
import LogoutIcon from "../../icons/LogoutIcon";
import NicknameIcon from "../../icons/NicknameIcon";
import YellowButton from "./../../components/mobile/YelloButton";
import { useState } from "react";

type JPProps = "J" | "P";

export default function Survey() {
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState("");

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleJPSelect = (type: JPProps) => {
    setType(type);
  };

  const handleSubmit = () => {
    console.log(nickname);
    console.log(type);
  };

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
            <YellowButton text="시작하기" onClick={handleSubmit} />
          </SurveyButtonBox>
        </SurveyBody>
      </SurveyContainer>
    </>
  );
}

const SurveyContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
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
    font-family: Pretendard;
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
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  padding: 8px 23px;

  & > input {
    width: 100%;
    outline: none;
    font-family: Pretendard;
    font-size: 14px;

    &::placeholder {
      color: #b8b8b8;
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
  background-color: ${(props) => (props.isSelected ? "#e6e6e6" : "#fff")};
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  font-family: Pretendard;
  font-size: 14px;
`;

const SurveyButtonBox = styled.div`
  width: 100%;
  min-width: 280px;
  padding: 0 57px;
`;
