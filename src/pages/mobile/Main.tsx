import styled from "styled-components";
import { Outlet } from "react-router-dom";

import { footerTabs } from "../../utils/staticDatas";
import { TabProps, useDisplayStore } from "../../store/display.store";

export default function Main() {
  const { getTabs, setTabs } = useDisplayStore();

  return (
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
                onClick={() => setTabs(tab.label as TabProps)}
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

        <FooterBottom>
          <div />
        </FooterBottom>
      </Footer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  // Todo: mobile 화면 보호 적용 - 기범
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const OutletBox = styled.div`
  flex: 1;
  height: calc(100% - 80px);
  padding-bottom: 10px;
`;

const Footer = styled.div`
  height: 80px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-evenly;
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
    background-color: ${(props) => props.theme.color.black};
    border-radius: 100px;
  }
`;
