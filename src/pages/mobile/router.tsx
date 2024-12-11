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
import Calendar from "./schedule/Calendar";
import SelectCity from "./schedule/SelectCity";
import ScheduleLayout from "./schedule/ScheduleLayout";
import Details from "./schedule/Details";
import AddPlaceLayout from "./addPlace/AddPlaceLayout";
import ListView from "./addPlace/ListView";
import Mapview from "./addPlace/Mapview";
import TravelReview from "./travel-review/TravelReview";
import ReviewDetails from "./travel-review/ReviewDetails";
import Reviews from "./details/Reviews";
import MyPageLayout from "./mypage/MyPageLayout";
import Travel from "./mypage/Travel";
import Review from "./mypage/Review";
import Likes from "./mypage/Likes";
import EditProfile from "./mypage/EditProfile";
import WriteReview from "./mypage/WriteReview";
import SelectPlace from "./mypage/SelectPlace";
import Travelogue from "./mypage/Travelogue";
import TravelogueDetails from "./travel-review/TravelogueDetails";
import ErrorPage from "./ErrorPage";
import Setting from "./mypage/Setting";
import WriteTravelogue from "./mypage/WriteTravelogue";

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
    path: "nearby/:placeId",
    element: <NearPlace />,
  },
  {
    path: "schedule",
    element: <ScheduleLayout />,
    children: [
      {
        path: "",
        element: <Calendar />,
      },
      {
        path: "city",
        element: <SelectCity />,
      },
      {
        path: "details/:scheduleId",
        element: <Details />,
      },
    ],
  },
  {
    path: "addPlace",
    element: <AddPlaceLayout />,
    children: [
      {
        path: "",
        element: <ListView />,
      },
      {
        path: "map",
        element: <Mapview />,
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
        path: "reviews/:placeId",
        element: <Reviews />,
      },
      {
        path: "search",
        element: <Search />,
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
        path: "travelogue/:travelogueId",
        element: <TravelogueDetails />,
      },
      {
        path: "mypage",
        element: <MyPageLayout />,
        children: [
          {
            path: "",
            element: <Travel />,
          },
          {
            path: "Travelogue",
            element: <Travelogue />,
          },
          {
            path: "review",
            element: <Review />,
          },
          {
            path: "likes",
            element: <Likes />,
          },
        ],
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "travels",
        element: <TravelMore />,
      },
      {
        path: "editProfile",
        element: <EditProfile />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "writeTravelogue/:id",
        element: <WriteTravelogue />,
      },
    ],
  },

  {
    path: "writeReview",
    element: <WriteReview />,
  },

  {
    path: "selectPlace",
    element: <SelectPlace />,
  },
]);
