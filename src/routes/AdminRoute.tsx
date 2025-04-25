import { selectedCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectedCurrentUser) || {};
  const location = useLocation();

  if (user && user?.role === "admin") {
    return children;
  }

  if (user && user?.role === "user") {
    return <Navigate to={"/"} state={location.pathname} replace={true} />;
  }

  return <Navigate to={"/login"} state={location.pathname} replace={true} />;
};

export default AdminRoute;
