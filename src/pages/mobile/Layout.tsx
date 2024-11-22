import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { footerTabs } from "../../utils/staticDatas";
import { TabType, useDisplayStore } from "../../store/display.store";
import { useEffect } from "react";
import StyledToast from "../../components/mobile/StyledToast";

export default function Layout() {
  const { getTabs, setTabs } = useDisplayStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentTab = footerTabs.find(
      (tab) => tab.route === location.pathname
    );
    if (currentTab) {
      setTabs(currentTab.label as TabType);
    }
  }, [location.pathname, setTabs]);

  const handleFooterClick = (label: string, route: string) => {
    if (route === "/home/search") {
      navigate(route);
    } else {
      navigate(route, { replace: true });
    }
    setTabs(label as TabType);
  };

  return (
    <>
      <MainContainer>
        <OutletBox>
          <Outlet />
        </OutletBox>

        <Footer>
          <FooterRow>
            {footerTabs.map((tab, idx) => {
              const isCurrentTab = getTabs() === tab.label;
              return (
                <FooterTab
                  key={idx}
                  onClick={() => handleFooterClick(tab.label, tab.route)}
                >
                  <tab.icon stroke={isCurrentTab ? "#ffc814" : "#4D4D4D"} />
                  <span
                    style={{
                      color: isCurrentTab ? "#ffc814" : "#666",
                    }}
                  >
                    {tab.label}
                  </span>
                </FooterTab>
              );
            })}
          </FooterRow>
        </Footer>
        <StyledToast />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const OutletBox = styled.main`
  flex: 1;
  height: calc(100% - 80px);
  padding-bottom: 10px;
`;

const Footer = styled.footer`
  height: 60px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const FooterRow = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const FooterTab = styled.li`
  display: flex;
  width: 75px;
  padding-top: 8px;
  flex-direction: column;
  align-items: center;

  & > span {
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    line-height: 20px;
  }
`;
