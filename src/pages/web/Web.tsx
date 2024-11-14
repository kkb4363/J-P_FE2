import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { refreshToken } from "../../service/axios";
import { useUserStore } from "../../store/user.store";

export default function Web() {
  // cookie 재발급 기능
  // const [cookies, _] = useCookies(["userToken"]);
  // const { getTokenExpiryTime } = useUserStore();

  // useEffect(() => {
  //   if (!!cookies?.userToken) {
  //     const remainTime =
  //       new Date(getTokenExpiryTime()).getTime() - new Date().getTime();

  //     // 5분
  //     if (remainTime <= 28 * 60 * 1000) {
  //       console.log("refresh");
  //       refreshToken().then((res) => {
  //         console.log(res);
  //       });
  //     }
  //   }
  // }, [cookies?.userToken]);

  return <RouterProvider router={router} />;
}
