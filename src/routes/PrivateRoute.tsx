import { selectedCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectedCurrentUser);
  const location = useLocation();
  console.log(location);

  if (!user) {
    return <Navigate to={"login"} />;
  }

  return children;
};

export default PrivateRoute;
