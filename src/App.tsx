import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Toaster } from "sonner";
import { useEffect } from "react";
import Aos from "aos";

const App = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
