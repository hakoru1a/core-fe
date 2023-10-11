import { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomecHero from "../../components/HomecHero";
import PropertyListing from "../../components/PropertyListing";
import Preloader from "../../components/Loader";
import About from "../../components/About/About";
import LatestProperty from "../../components/LatestProperty";
import Features from "../../components/Features";
import Agents from "../../components/Agents";
import DownloadApp from "../../components/DownloadApp";
import Footer from "../../components/Footer";
import GoTopBtn from "../../components/Button/GoTopBtn";
import Blog from "../Blog";
import FaqSection from "../Faq/FaqSection";
import TimeTable from "../../components/Form/TimeTable";

function Home() {
  const [isLoading, setisLoadingg] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoadingg(false);
    }, 1000);
  }, []);

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
        <TimeTable />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default Home;
