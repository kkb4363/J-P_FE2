import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function Mobile() {
  return <RouterProvider router={router} />;
}
