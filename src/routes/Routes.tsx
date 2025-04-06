import Root from "@/components/layouts/Root";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: "products" },
      { path: "about", element: "about" },
      { path: "contact", element: "contact" },
    ],
  },
]);
