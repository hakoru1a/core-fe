import { useAuth } from "../../hooks/useAuth";
import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import GoTopBtn from "../Button/GoTopBtn";
import PropertyAddCard from "../Cards/PropertyAddCard";
import DownloadApp from "../DownloadApp";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect } from "react";
import { toast } from "react-toastify";
function AddProperty() {
  const user = useAuth();
  useEffect(() => {
    if (user.times === 0) toast.error("Bạn đã hết lượt");
  }, [user.times]);
  let component = undefined;
  {
    component = (
      <>
        <Header />
        <Breadcrumbs title="Add Property" titlePosition="bottom">
          <HistoryLinks link="/home" text="Home" />
          <HistoryLinks
            link="/add-property"
            text="Add Property"
            isActive={true}
          />
        </Breadcrumbs>

        <section className="homec-error pd-top-90 pd-btm-120">
          <div className="container">
            <div className="row">
              <PropertyAddCard
                img="/img/property-rent.png"
                why="Rent"
                link="/submit-property?purpose=for-rent"
                isExceed={user.times === 0}
              />
              <PropertyAddCard
                img="/img/property-sale.png"
                why="Sale"
                link="/submit-property?purpose=for-sale"
                btn="second"
                isExceed={user.times === 0}
              />
            </div>
          </div>
        </section>

        <DownloadApp />
        <Footer />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default AddProperty;
