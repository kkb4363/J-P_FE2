import styled from "styled-components";
import img from "../../assets/images/onboarding.png";
import GoogleIcon from "./../../icons/GoogleIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function Onboarding() {
  return (
    <>
      <OnboardingContainer>
        <OnBoardingTopBox>
          <OnboardingTitle>
            여행을 더 즐겁게, <br /> 함께 계획하고 공유해요!
            <span>더 특별한 나만의 여행기를 만들어요.</span>
          </OnboardingTitle>
        </OnBoardingTopBox>
        <OnBoardingBottomBox>
          <GoogleLoginButton>
            <GoogleIcon />
            <p>구글 계정으로 시작하기</p>
          </GoogleLoginButton>
          <JustLookButton>
            <p>서비스 둘러보기</p> <ArrowRightIcon />
          </JustLookButton>
        </OnBoardingBottomBox>
      </OnboardingContainer>
    </>
  );
}

const OnboardingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const OnBoardingTopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 2.5;
  margin-top: 32px;
`;

const OnBoardingBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const OnboardingTitle = styled.p<{ subtitle?: boolean }>`
  width: 226px;
  font-size: 24px;
  font-weight: 700;
  font-family: Pretendard;
  line-height: 140%;
  color: #fff;
  flex-shrink: 0;

  & > span {
    font-size: 14px;
    font-weight: 500;
    padding-top: 12px;
  }
`;

const GoogleLoginButton = styled.div`
  width: 263px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #fff;
  padding: 14px;
  gap: 12px;
  border-radius: 16px;
  cursor: pointer;

  & > p {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
  }
`;

const JustLookButton = styled.div`
  width: 120px;
  flex-shrink: 0;
  display: flex;
  gap: 8px;
  margin-top: 49px;
  cursor: pointer;

  & > p {
    font-family: Pretendard;
    color: #fff;
  }
`;
