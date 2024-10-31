import styled, { css } from "styled-components";
import { webHeaderTabs } from "../../utils/staticDatas";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../store/modal.store";
import SearchIcon from "../../assets/icons/SearchIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../../utils/axios";
import { useEffect } from "react";

interface Props {
  minWidth: string;
}

export default function Header({ minWidth }: Props) {
  const navigate = useNavigate();
  const { getCurrentModal, setCurrentModal } = useModalStore();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const [_, setCookie] = useCookies(["userToken"]);

  const handleSearch = () => {
    if (getCurrentModal() === "search") {
      return setCurrentModal("");
    } else {
      return setCurrentModal("search");
    }
  };

  const handleTab = (route: string) => {
    navigate(route);
    setCurrentModal("");
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile+email&response_type=code&client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=http://localhost:3000/`;
  };

  const handleGoogleApi = async () => {
    try {
      const res = await axiosInstance.get(
        `/login/oauth2/code/google?code=${code}&viewType=PC`
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
      handleGoogleApi();
    } else {
      console.log("로그인 에러");
    }
  }, [code]);

  return (
    <HeaderContainer $minWidth={minWidth}>
      <HeaderLeft>
        <Logo>Logo</Logo>

        <HeaderTabRow>
          {webHeaderTabs.map((tab) => (
            <span onClick={() => handleTab(tab.route)} key={tab.label}>
              {tab.label}
            </span>
          ))}
        </HeaderTabRow>
      </HeaderLeft>

      <HeaderRight>
        <div onClick={handleSearch}>
          <SearchIcon />
        </div>

        <div onClick={() => handleTab("/mypage/travel")}>
          <ProfileIcon />
        </div>

        <LoginButton onClick={handleGoogleLogin}>로그인</LoginButton>
      </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<{ $minWidth: string }>`
  width: 100%;
  min-width: ${(props) => props.$minWidth && props.$minWidth};
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 0 120px;
  background-color: ${(props) => props.theme.color.white};
`;

const Logo = styled.div``;

const headerTextStyle = css`
  color: ${(props) => props.theme.color.gray900};
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 200px;
`;

const HeaderTabRow = styled.div`
  display: flex;
  align-items: center;
  gap: 89px;

  & > span {
    ${headerTextStyle}
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;

  & > div {
    cursor: pointer;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 50px;
  border-radius: 16px;

  background: ${(props) => props.theme.color.main};
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 700;

  &:hover {
    background-color: ${(props) => props.theme.color.mainHover};
  }
`;
