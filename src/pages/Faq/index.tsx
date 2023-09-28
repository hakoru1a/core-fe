import { useEffect, useState } from "react";
import Preloader from "../../components/Loader";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import HistoryLinks from "../../components/Breadcrumbs/HistoryLinks";
import FaqSection from "./FaqSection";
import FeaturesV2 from "../../components/Features/FeaturesV2";
import FunFacts from "../../components/FunFact";
import DownloadApp from "../../components/DownloadApp";
import GoTopBtn from "../../components/Button/GoTopBtn";
import Footer from "../../components/Footer";

function Faq() {
  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
        <Header />
        <Breadcrumbs title="Faq's" titlePosition="bottom">
          <HistoryLinks link="/home" text="Home" />
          <HistoryLinks link="/faq" text="Faq's" isActive={true} />
        </Breadcrumbs>
        <FaqSection />
        <div className="mg-top-90">
          <FeaturesV2 />
          <FunFacts v2={true} />
        </div>
        <DownloadApp />
        <Footer />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default Faq;
