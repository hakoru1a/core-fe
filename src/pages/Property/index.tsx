import { useEffect, useState } from "react";
import Preloader from "../../components/Loader";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import GoTopBtn from "../../components/Button/GoTopBtn";
import Footer from "../../components/Footer";
import HistoryLinks from "../../components/Breadcrumbs/HistoryLinks";
import PropertyGrid from "./PropertyGrid";

function Property() {
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
        <Breadcrumbs title="Latest Properties">
          <HistoryLinks link="home" text="Home" />
          <HistoryLinks
            link="property"
            text="Latest Properties"
            isActive={true}
          />
        </Breadcrumbs>
        <PropertyGrid />
        <Footer />
        <GoTopBtn />
      </>
    );
  }

  return component;
}

export default Property;
