import { Suspense } from "react";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import AboutUs from "../components/About/index.js";
import AddProperty from "../components/AddProperty";
import AgentDetail from "../components/AgentDetail/index.js";
import EditProperty from "../components/Edit Property/index.js";
import ErrorPage from "../components/Error";
import News from "../components/News/index.js";
import NewsSingle from "../components/NewsSingle.jsx";
import OurAgents from "../components/OurAgents/index.js";
import PaymentMethod from "../components/PaymentMethod/index.js";
import Pricing from "../components/Pricing.jsx/index.js";
import SubmitProperty from "../components/SubmitProperty";
import MainLayout from "../layouts/MainLayout";
import ActiveAccount from "../pages/Active/index.js";
import Contact from "../pages/Contact/index.js";
import Dashboard from "../pages/Dashboard/index.js";
import Faq from "../pages/Faq/index.js";
import Home from "../pages/Home";
import Login from "../pages/Login/index.js";
import NotFound from "../pages/NotFound/NotFound";
import Property from "../pages/Property";
import PropertySingle from "../pages/PropertySingle/index.js";
import SignUp from "../pages/SignUp/index.js";
import { useAuth } from "./useAuth.js";

function RejectedRoute() {
  const user = useAuth();
  const isAuthenticated = user.id !== "";
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

function ProtectedRoute() {
  const user = useAuth();
  const isAuthenticated = user.id !== "";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function useRouteElements() {
  const myRoutes: RouteObject[] = [
    {
      element: <RejectedRoute />,
      children: [
        {
          path: "/login",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/property",
          element: <Property />,
        },
        {
          path: "/property/:id",
          element: <PropertySingle />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/edit-property/:id",
              element: <EditProperty />,
            },
            {
              path: "/add-property",
              element: <AddProperty />,
            },
            {
              path: "/submit-property",
              element: <SubmitProperty />,
            },

            {
              path: "/dashboard",
              element: <Dashboard />,
            },
          ],
        },
        {
          path: "/blog-single",
          element: <NewsSingle />,
        },
        {
          path: "/blog",
          element: <News />,
        },
        {
          path: "/agent-detail",
          element: <AgentDetail />,
        },
        {
          path: "/our-agent",
          element: <OurAgents />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/payment-method",
          element: <PaymentMethod />,
        },
        {
          path: "/faq",
          element: <Faq />,
        },
        {
          path: "/404",
          element: <ErrorPage />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },

    {
      path: "/active-account/:id/",
      element: <ActiveAccount />,
    },
  ];

  return useRoutes(myRoutes);
}

export default useRouteElements;
