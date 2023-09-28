import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import ErrorPage from "../components/Error";
import Property from "../pages/Property";
import PropertySingle from "../pages/PropertySingle/index.js";
import AddProperty from "../components/AddProperty";
import SubmitProperty from "../components/SubmitProperty";
import Dashboard from "../pages/Dashboard/index.js";
import NewsSingle from "../components/NewsSingle.jsx";
import News from "../components/News/index.js";
import AgentDetail from "../components/AgentDetail/index.js";
import OurAgents from "../components/OurAgents/index.js";
import AboutUs from "../components/About/index.js";
import Pricing from "../components/Pricing.jsx/index.js";
import PaymentMethod from "../components/PaymentMethod/index.js";
import Login from "../pages/Login/index.js";
import SignUp from "../pages/SignUp/index.js";
import Contact from "../pages/Contact/index.js";
import EditProperty from "../components/Edit Property/index.js";
import Faq from "../pages/Faq/index.js";

function useRouteElements() {
  const myRoutes = [
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
          path: "/property-single",
          element: <PropertySingle />,
        },
        {
          path: "/edit-property",
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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  return useRoutes(myRoutes);
}

export default useRouteElements;
