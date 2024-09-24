import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Detail from "./detail/Detail";

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
    ],
  },
]);
