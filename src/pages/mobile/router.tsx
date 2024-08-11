import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import Onboarding from "./Onboarding";
import Survey from "./Survey";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/survey",
        element: <Survey />,
      },
    ],
  },
]);
