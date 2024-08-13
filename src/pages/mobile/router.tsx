import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import Onboarding from "./Onboarding";
import TravelPlace from "./TravelPlace";
import City from "./City";
import ThemePlace from "./ThemePlace";
import HomeDetails from "./HomeDetails";

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
      {
        path: "travel-place",
        element: <TravelPlace />,
      },
      {
        path: "city",
        element: <City />,
      },
      {
        path: "theme-place",
        element: <ThemePlace />,
      },
      {
        path: ":placeId",
        element: <HomeDetails />,
      },
    ],
  },
]);
