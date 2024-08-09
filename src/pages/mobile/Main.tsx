import styled from "styled-components";

import { footerTabs } from "../../utils/staticDatas";
import { TabProps, useDisplayStore } from "../../store/display.store";
import { Outlet } from "react-router-dom";

export default function Main() {
  // onboading page vs home page
  const { getTabs, setTabs } = useDisplayStore();

  return (
    <MainContainer>
      <Outlet />

      <Footer>
        <FooterRow>
          {footerTabs.map((tab, idx) => {
            const isCurrentTab = getTabs() === tab.label;
            return (
              <FooterTab
                key={idx}
                onClick={() => setTabs(tab.label as TabProps)}
              >
                <tab.icon stroke={isCurrentTab ? "#ffc814" : "#4D4D4D"} />
                <span style={{ color: isCurrentTab ? "#ffc814" : "#666" }}>
                  {tab.label}
                </span>
              </FooterTab>
            );
          })}
        </FooterRow>

        <FooterBottom>
          <div />
        </FooterBottom>
      </Footer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  // Todo: mobile 화면 보호 적용
  padding: 4px 18px 18px 18px;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  height: 80px;
  width: 100%;
  background-color: #fafafa;
`;

const FooterRow = styled.div`
  display: flex;
  height: calc(100% - 30px);
`;

const FooterTab = styled.div`
  display: flex;
  width: 75px;
  height: 50px;
  padding-top: 8px;
  flex-direction: column;
  align-items: center;

  & > span {
    text-align: center;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }
`;

const FooterBottom = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 17px 0 8px 0;

  & > div {
    width: 135px;
    height: 5px;
    background-color: #000;
    border-radius: 100px;
  }
`;
