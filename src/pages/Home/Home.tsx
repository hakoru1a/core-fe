import { useEffect, useState } from "react";
import About from "../../components/About/About";
import Agents from "../../components/Agents";
import GoTopBtn from "../../components/Button/GoTopBtn";
import DownloadApp from "../../components/DownloadApp";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HomecHero from "../../components/HomecHero";
import LatestProperty from "../../components/LatestProperty";
import Preloader from "../../components/Loader";
import PropertyListing from "../../components/PropertyListing";
import { useAuth } from "../../hooks/useAuth";
import { socket } from "../../socket";
import Blog from "../Blog";
import FaqSection from "../Faq/FaqSection";

function Home() {
  const [isLoading, setisLoading] = useState(true);
  const user = useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {
      !!user.id && socket.connect();
      socket.emit("init-user", { ...user, role: "CUSTOMER" });
      setisLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
      !!user.id && socket.disconnect();
    };
  }, [user]);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
        <Header />
        <HomecHero />
        <PropertyListing />
        <About />
        <LatestProperty />
        <Features />
        <Agents />
        <FaqSection />
        <DownloadApp />
        <Blog />
        <Footer />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default Home;
