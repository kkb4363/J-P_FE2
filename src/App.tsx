import { isMobile } from "react-device-detect";
import Mobile from "./pages/mobile/Mobile";
import Web from "./pages/web/Web";

function App() {
  if (isMobile) {
    return <Mobile />;
  }
  return <Web />;
}

export default App;
