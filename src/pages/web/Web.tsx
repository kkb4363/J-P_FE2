import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function Web() {
  return <RouterProvider router={router} />;
}
