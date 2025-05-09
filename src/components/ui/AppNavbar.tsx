import { Keyboard, Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Button } from "./button";
import AppNavLink from "./AppNavLink";
import { navItems } from "@/constants/navbar.items";
import { useAppSelector } from "@/redux/hooks";
import { selectedCurrentUser } from "@/redux/features/auth/authSlice";
import AppProfileDropdown from "./AppProfileDropdown";
import { selectedCarts } from "@/redux/features/cart/cartSlice";

const AppNavbar = () => {
  const user = useAppSelector(selectedCurrentUser);
  const carts = useAppSelector(selectedCarts);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link to="/" className="flex items-center space-x-1">
            <Keyboard className="h-6 w-6" />
            <span className="font-bold text-xl">KeyTactile</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ label, to }) => (
              <AppNavLink key={label} to={to} active={location.pathname === to}>
                {label}
              </AppNavLink>
            ))}

            {user?.role === "user" && (
              <AppNavLink
                to={"Booking"}
                active={location.pathname === "/booking"}
              >
                Booking
              </AppNavLink>
            )}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
            {user?.role === "user" && (
              <>
                <Link to="/cart">
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative cursor-pointer size-8"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {carts?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {carts?.length}
                      </span>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {/* Sing in */}
            {!user && (
              <Button className="cursor-pointer">
                <Link to={"/login"}>Sign in</Link>
              </Button>
            )}
            {/* Profile avatar */}
            {user && <AppProfileDropdown user={user} />}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
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
            {navItems.map(({ label, to }) => (
              <AppNavLink key={label} to={to} active={location.pathname === to}>
                {label}
              </AppNavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
