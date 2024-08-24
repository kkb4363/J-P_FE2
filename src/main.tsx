import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./assets/fonts/font.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/styles/theme.ts";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
