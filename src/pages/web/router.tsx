import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import More from "./home/More";
import SurrondingPlace from "./detail/SurrondingPlace";
import SurroundingMore from "./detail/SurroundingMore";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":placeId",
        element: <Detail />,
      },
      {
        path: "city/:placeId",
        element: <Detail />,
      },
      {
        path: "more",
        element: <More />,
      },
      {
        path: "surrounding/:lng/:lat",
        element: <SurrondingPlace />,
      },
      {
        path: "surroundingMore/:lng/:lat",
        element: <SurroundingMore />,
      },
    ],
  },
]);
