import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import More from "./home/More";
import Survey from "./onboarding/Survey";
import HomeDetails from "./details/HomeDetails";
import NearPlace from "./details/NearPlace";
import Search from "./search/Search";
import Schedule from "./schedule/Schedule";
import Onboarding from "./onboarding/Onboarding";
import TravelMore from "./schedule/TravelMore";
import CreateSchedule from "./schedule/CreateSchedule";
import Calendar from "./schedule/Calendar";
import SelectCity from "./schedule/SelectCity";

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
    path: "createSchedule",
    element: <CreateSchedule />,
    children: [
      {
        path: "",
        element: <Calendar />,
      },
      {
        path: "city",
        element: <SelectCity />,
      },
    ],
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
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "travels",
        element: <TravelMore />,
      },
    ],
  },
]);
