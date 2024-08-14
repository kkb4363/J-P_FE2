import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import Onboarding from "./Onboarding";
import TravelPlace from "./TravelPlace";
import City from "./City";
import ThemePlace from "./ThemePlace";
import Survey from "./Survey";
import HomeDetails from "./HomeDetails";
import NearPlace from "./NearPlace";
import Search from "./Search";

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
        path: "survey",
        element: <Survey />,
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
      {
        path: "city/:placeId",
        element: <HomeDetails />,
      },
      {
        path: "nearby/:placeId",
        element: <NearPlace />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);
