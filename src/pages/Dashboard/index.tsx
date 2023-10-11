import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import HistoryLinks from "../../components/Breadcrumbs/HistoryLinks";
import GoTopBtn from "../../components/Button/GoTopBtn";
import DownloadApp from "../../components/DownloadApp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Preloader from "../../components/Loader";
import ChangePassword from "./ChangePassword";
import InvoiceTable from "./InvoiceTable";
import MyProperties from "./MyProperties";
import PersonalInfo from "./PersonalInfo";
import Reviews from "./Reviews";
import Saved from "./Saved";
import Sidebar from "./Sidebar";
import TimeTable from "../../components/Form/TimeTable";

function Dashboard() {
  // Inner navigation
  const [activeComponent, setActiveComponent] = useState("My Properties");
  const navigate = useNavigate();

  // navigate to logout
  useEffect(() => {
    if (activeComponent === "Logout") {
      navigate("/");
    }
  }, [activeComponent, navigate]);

  // loading handle

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
        <Breadcrumbs
          title={activeComponent}
          titlePosition="bottom"
          overlay={true}
        >
          <HistoryLinks link="/home" text="Home" />
          <HistoryLinks link="/dashboard" text="Dashboard" isActive={true} />
        </Breadcrumbs>
        <section className="homec-dashboard pd-top-100 pd-btm-100 homec-bg-third-color">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="homec-dashboard__middle">
                  <div className="row">
                    <Sidebar
                      activeComponent={activeComponent}
                      setComponent={setActiveComponent}
                    />
                    {activeComponent === "My Properties" && <MyProperties />}
                    {activeComponent === "Invoice" && <InvoiceTable />}
                    {activeComponent === "Personals Info" && <PersonalInfo />}
                    {activeComponent === "Saved" && <Saved />}
                    {activeComponent === "Reviews" && <Reviews />}
                    {activeComponent === "My Time" && <TimeTable />}
                    {activeComponent === "Change Password" && (
                      <ChangePassword />
                    )}
                  </div>
                </div>
              </div>
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

export default Dashboard;
