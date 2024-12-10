import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import More from "./home/More";
import SurroundingMore from "./detail/SurroundingMore";
import MypageLayout from "./mypage/MypageLayout";
import MyReviews from "./mypage/MyReviews";
import MyLikes from "./mypage/MyLikes";
import MyTravel from "./mypage/MyTravel";
import MyTravelogue from "./mypage/MyTravelogue";
import TravelReview from "./travel-review/TravelReview";
import ReviewDetails from "./travel-review/ReviewDetails";
import Search from "./search/Search";
import ImageViewer from "./travel-review/ImageViewer";
import Schedule from "./schedule/Schedule";
import TravelogueDetails from "./travel-review/TravelogueDetails";
import ScheduleDetails from "./schedule/ScheduleDetails";
import CreateSchedule from "./schedule/CreateSchedule";
import CreatePlace from "./schedule/CreatePlace";
import EditProfile from "./mypage/EditProfile";
import WriteTravelouge from "./mypage/WriteTravelouge";
import WriteReview from "./mypage/WriteReview";
import Survey from "./onboarding/Survey";
import Onboarding from "./onboarding/Onboarding";
import ErrorPage from "./ErrorPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Onboarding />,
    errorElement: <ErrorPage />,
  },
  {
    path: "survey",
    element: <Survey />,
  },
  {
    path: "home",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "details/:placeId",
        element: <Detail />,
      },
      {
        path: "more",
        element: <More />,
      },
      {
        path: "surroundingMore/:lng/:lat",
        element: <SurroundingMore />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "schedule/details/:scheduleId",
        element: <ScheduleDetails />,
      },
      {
        path: "createSchedule",
        element: <CreateSchedule />,
      },
      {
        path: "createPlace",
        element: <CreatePlace />,
      },
      {
        path: "travelReview",
        element: <TravelReview />,
      },
      {
        path: "review/:reviewId",
        element: <ReviewDetails />,
      },
      {
        path: "review/:reviewId/photo",
        element: <ImageViewer />,
      },
      {
        path: "travelogue/:travelogueId",
        element: <TravelogueDetails />,
      },
      {
        path: "travelogue/:travelogueId/photo",
        element: <ImageViewer />,
      },
      {
        path: "mypage",
        element: <MypageLayout />,
        children: [
          {
            path: "reviews",
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
      {
        path: "edit",
        element: <EditProfile />,
      },
      {
        path: "writeTravelogue/:id",
        element: <WriteTravelouge />,
      },
      {
        path: "writeReview",
        element: <WriteReview />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);
