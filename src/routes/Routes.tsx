import Root from "@/components/layouts/Root";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: "products" },
      { path: "products/:id", element: <ProductDetails/> },
      { path: "about", element: "about" },
      { path: "contact", element: "contact" },
      { path: "dashboard", element: "dashboard" },
    ],
  },
]);
