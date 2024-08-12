import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import Onboarding from "./Onboarding";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Onboarding />,
  },
  {
    path: "/home",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);
