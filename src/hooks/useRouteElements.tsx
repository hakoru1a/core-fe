import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import { useRoutes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
function useRouteElements() {
  const myRoutes = [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  return useRoutes(myRoutes);
}

export default useRouteElements;
