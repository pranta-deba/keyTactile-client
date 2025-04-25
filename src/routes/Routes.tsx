import DashboardLayout from "@/components/layouts/DashboardLayout";
import Root from "@/components/layouts/Root";
import About from "@/pages/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Booking from "@/pages/Booking";
import Cart from "@/pages/Cart";
import Contact from "@/pages/Contact";
import AddBrand from "@/pages/Dashboard/AddBrand";
import AddProduct from "@/pages/Dashboard/AddProduct";
import BrandList from "@/pages/Dashboard/BrandList";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
import OrderList from "@/pages/Dashboard/OrderList";
import ProductList from "@/pages/Dashboard/ProductList";
import UpdateBrand from "@/pages/Dashboard/UpdateBrand";
import UpdateProduct from "@/pages/Dashboard/UpdateProduct";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
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
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <DashboardHome />
          </AdminRoute>
        ),
      },
      {
        path: "order-list",
        element: (
          <AdminRoute>
            <OrderList />
          </AdminRoute>
        ),
      },
      {
        path: "product-list",
        element: (
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        ),
      },
      {
        path: "brand-list",
        element: (
          <AdminRoute>
            <BrandList />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "add-brand",
        element: (
          <AdminRoute>
            <AddBrand />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "update-brand/:id",
        element: (
          <AdminRoute>
            <UpdateBrand />
          </AdminRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <AdminRoute>
            <UpdateProduct />{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);
