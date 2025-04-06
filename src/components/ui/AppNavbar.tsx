import { Keyboard, Menu, ShoppingCart, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Button } from "./button";

const AppNavbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = 3; // Fake cart data

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Keyboard className="h-6 w-6" />
            <span className="font-bold text-xl">KeyboardHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/products" active={location.pathname === "/products"}>
              Products
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              About
            </NavLink>
            <NavLink to="/contact" active={location.pathname === "/contact"}>
              Contact
            </NavLink>
            <NavLink
              to="/dashboard"
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-4 pb-6">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/products" active={location.pathname === "/products"}>
              Products
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              About
            </NavLink>
            <NavLink to="/contact" active={location.pathname === "/contact"}>
              Contact
            </NavLink>
            <NavLink
              to="/dashboard"
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
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

export default AppNavbar;
