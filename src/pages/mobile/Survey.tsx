import styled from "styled-components";
import { useState } from "react";
import NicknameIcon from "../../assets/icons/NicknameIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import PrimaryButton from "../../components/mobile/PrimaryButton";

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
    // 닉네임이 중복되진 않았는지 & jp선택은 되어있는지 확인후
    // 이상 없으면 /home 페이지로 이동
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
