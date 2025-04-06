import { useEffect } from "react";
import { useAppSelector } from "./redux/hooks";
import AppNavbar from "./components/ui/AppNavbar";

function App() {
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
    <>
     <AppNavbar/>
    </>
  );
}

export default App;
