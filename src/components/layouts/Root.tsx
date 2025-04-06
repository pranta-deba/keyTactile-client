import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import AppNavbar from "../ui/AppNavbar";
import { Outlet } from "react-router-dom";
import AppFooter from "../ui/AppFooter";

const Root = () => {
  const currentTheme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(currentTheme);
    }
  }, [currentTheme]);

  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-grow mt-[64px] mb-10">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};
export default Root;
