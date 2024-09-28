import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import More from "./home/More";

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
    ],
  },
]);
