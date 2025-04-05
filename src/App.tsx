import { useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { Button } from "./components/ui/button";
import { useAppSelector } from "./redux/hooks";

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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="">
        <Button>Click me</Button>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </>
  );
}

export default App;
