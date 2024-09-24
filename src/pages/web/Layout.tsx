import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { scrollHidden } from "../../assets/styles/home.style";

const minWidth = "1440px";

export default function Layout() {
  return (
    <LayoutContainer>
      <Header>
        <HeaderLeft>
          <Logo>Logo</Logo>

          <HeaderTabRow>
            <span>홈</span>
            <span>일정</span>
            <span>리뷰</span>
          </HeaderTabRow>
        </HeaderLeft>

        <HeaderRight>
          <span>마이페이지</span>

          <LoginButton>로그인</LoginButton>
        </HeaderRight>
      </Header>

      <OutletBox>
        <Outlet />
      </OutletBox>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  background-color: ${(props) => props.theme.color.background};
`;

const Header = styled.div`
  width: 100%;
  min-width: ${minWidth};
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 0 100px;
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
  gap: 120px;
`;

const HeaderTabRow = styled.div`
  display: flex;
  align-items: center;
  gap: 44px;

  & > span {
    ${headerTextStyle}
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;

  & > span {
    ${headerTextStyle};
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

const OutletBox = styled.div`
  width: ${minWidth};
  margin: 0 auto;
  height: calc(100% - 90px);
  padding: 0 120px 80px 120px;
  overflow: auto;
  ${scrollHidden};
`;
