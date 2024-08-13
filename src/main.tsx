import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./assets/fonts/font.css";

// const loadGoogleMaps = (callback: () => void) => {
//   const script = document.createElement("script");
//   script.src = `https://maps.googleapis.com/maps/api/js?key=${
//     import.meta.env.VITE_GOOGLE_API_KEY
//   }&callback=initMap`;
//   script.async = true;
//   script.defer = true;
//   script.onload = callback;
//   document.head.appendChild(script);
// };

// loadGoogleMaps(() => {
//   console.log("google maps loaded!!!");
// });

// (window as any).initMap = function () {
//   // google map 초기화 코드 관련
//   console.log("google maps init!!!");
// };

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
