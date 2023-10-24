import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import useRouteElements from "./hooks/useRouteElements";

function App() {
  const routeElements = useRouteElements();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  );
}

export default App;
