import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../store/user.store";
import { refreshToken } from "../../service/axios";

export default function Mobile() {
  // cookie 재발급 기능
  // const [cookies, _] = useCookies(["userToken"]);
  // const { getTokenExpiryTime } = useUserStore();

  // useEffect(() => {
  //   if (!!cookies?.userToken) {
  //     const remainTime =
  //       new Date(getTokenExpiryTime()).getTime() - new Date().getTime();

  //     // 5분
  //     if (remainTime <= 5 * 60 * 1000) {
  //       console.log("refresh");
  //       refreshToken().then((res) => {
  //         console.log(res);
  //       });
  //     }
  //   }
  // }, [cookies?.userToken]);

  return <RouterProvider router={router} />;
}
