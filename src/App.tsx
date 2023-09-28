import { ToastContainer } from "react-toastify";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import useRouteElements from "./hooks/useRouteElements";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
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
