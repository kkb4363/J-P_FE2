import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Onboarding from "./Onboarding";
import TravelPlace from "./TravelPlace";
import City from "./City";
import More from "./More";
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
    path: "survey",
    element: <Survey />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "more",
        element: <More />,
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
