import { ReactNode } from "react";
import { Link } from "react-router-dom";

const AppNavLink = ({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: ReactNode;
}) => {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
};

export default AppNavLink;
