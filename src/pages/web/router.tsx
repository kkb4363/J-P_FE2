import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);
