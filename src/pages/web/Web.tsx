import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Web() {
  // const [cookies, _, removeCookie] = useCookies(["userToken"]);

  // useEffect(() => {
  //   if (!cookies?.userToken) {
  //     removeCookie("userToken");
  //   }
  // }, [cookies?.userToken]);

  return <RouterProvider router={router} />;
}
