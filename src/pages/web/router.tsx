import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import More from "./home/More";
import SurrondingPlace from "./detail/SurrondingPlace";
import SurroundingMore from "./detail/SurroundingMore";
import MypageLayout from "./mypage/MypageLayout";
import MyReviews from "./mypage/MyReviews";
import MyLikes from "./mypage/MyLikes";
import MyTravel from "./mypage/MyTravel";
import MyTravelogue from "./mypage/MyTravelogue";

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
      {
        path: "mypage",
        element: <MypageLayout />,
        children: [
          {
            path: "",
            element: <MyReviews />,
          },
          {
            path: "likes",
            element: <MyLikes />,
          },
          {
            path: "travel",
            element: <MyTravel />,
          },
          {
            path: "travelogue",
            element: <MyTravelogue />,
          },
        ],
      },
    ],
  },
]);
