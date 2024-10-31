import styled from "styled-components";
import bgImg from "../../../assets/images/onboardingWeb.png";
import Header from "../../../components/web/Header";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile+email&response_type=code&client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=http://localhost:3000/survey`;
  };

  return (
    <ExtendedContainer>
      <Header minWidth="1440px" />
      <BackgroundBox>
        <OnboardingBox>
          <h1>
            여행을 더 즐겁게, <br /> 함께 계획하고 공유해요!
          </h1>

          <p>더 특별한 나만의 여행기를 만들어요.</p>

          <GoogleLoginButton onClick={handleGoogleLogin}>
            <GoogleIcon />
            <span>구글 계정으로 시작하기</span>
          </GoogleLoginButton>

          <span onClick={() => navigate("home")}>
            서비스 둘러보기 <ArrowRightIcon />
          </span>
        </OnboardingBox>
      </BackgroundBox>
    </ExtendedContainer>
  );
}

export const ExtendedContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

const BackgroundBox = styled.div`
  width: 100%;
  min-width: 1440px;
  min-height: calc(712px - 90px);
  height: calc(100% - 90px);
  overflow: auto;
  background: url(${bgImg});
  background-size: cover;
  background-position: center;

  @media screen and (min-width: 1440px) {
    padding-left: 200px;
  }
`;

const OnboardingBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 161px 0 189px 207px;

  & > h1 {
    color: ${(props) => props.theme.color.white};
    font-size: 24px;
    font-weight: 700;
    line-height: 140%;
    margin-bottom: 12px;
  }

  & > p {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 100px;
  }

  & > span {
    margin-top: 95px;
    width: 263px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
  }
`;

const GoogleLoginButton = styled.button`
  width: 263px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }

  &:hover {
    opacity: 0.9;
  }
`;
