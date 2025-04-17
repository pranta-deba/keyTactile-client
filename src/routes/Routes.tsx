import DashboardLayout from "@/components/layouts/DashboardLayout";
import Root from "@/components/layouts/Root";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "about", element: "about" },
      { path: "contact", element: "contact" },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    errorElement: <Error />,
    children: [
      {path: "", element: <DashboardLayout />},
    ],
  },
]);
