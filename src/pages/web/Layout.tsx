import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { scrollHidden } from "../../assets/styles/home.style";
import { useModalStore } from "../../store/modal.store";
import Header from "../../components/web/Header";
import StyledToast from "../../components/mobile/StyledToast";
import SearchBar from "../../components/web/search/SearchBar";
import SelectPlaceBar from "../../components/web/mypage/SelectPlaceBar";

interface Props {
  minWidth?: string;
}

export default function Layout({ minWidth = "1440px" }: Props) {
  const { getCurrentModal, setCurrentModal } = useModalStore();

  return (
    <LayoutContainer>
      <Header minWidth={minWidth} />

      {getCurrentModal() === "search" && (
        <>
          <SearchBar />
          <Overlay onClick={() => setCurrentModal("")} />
        </>
      )}

      {getCurrentModal() === "selectPlace" && (
        <>
          <SelectPlaceBar />
          <Overlay onClick={() => setCurrentModal("")} />
        </>
      )}

      <OutletBox $minWidth={minWidth}>
        <Outlet />
      </OutletBox>
      <StyledToast position="top-center" />
    </LayoutContainer>
  );
}

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  margin-top: 90px;
`;

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  background-color: ${(props) => props.theme.color.background};
`;

const OutletBox = styled.div<{ $minWidth: string }>`
  width: ${(props) => props.$minWidth && props.$minWidth};
  height: calc(100% - 90px);

  margin: 0 auto;
  padding: 0 120px 80px 120px;
  overflow-y: auto;
  overflow-x: hidden;
  ${scrollHidden};
`;
