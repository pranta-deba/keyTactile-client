import DashboardLayout from "@/components/layouts/DashboardLayout";
import Root from "@/components/layouts/Root";
import About from "@/pages/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Contact from "@/pages/Contact";
import AddBrand from "@/pages/Dashboard/AddBrand";
import AddProduct from "@/pages/Dashboard/AddProduct";
import BrandList from "@/pages/Dashboard/BrandList";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
import OrderList from "@/pages/Dashboard/OrderList";
import ProductList from "@/pages/Dashboard/ProductList";
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
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
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
    element: <DashboardLayout />,
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "order-list", element: <OrderList /> },
      { path: "product-list", element: <ProductList /> },
      { path: "brand-list", element: <BrandList /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "add-brand", element: <AddBrand /> },
    ],
  },
]);
