import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";
import HistoryLinks from "../../components/Breadcrumbs/HistoryLinks";
import GoTopBtn from "../../components/Button/GoTopBtn";
import DownloadApp from "../../components/DownloadApp";
import Footer from "../../components/Footer";
import TimeTable from "../../components/Form/TimeTable";
import Header from "../../components/Header";
import Preloader from "../../components/Loader";
import { setGlobalUser } from "../../redux/slice/user.slice";
import { clearLS } from "../../utils/auth";
import ChangePassword from "./ChangePassword";
import InvoiceTable from "./InvoiceTable";
import MyProperties from "./MyProperties";
import PersonalInfo from "./PersonalInfo";
import Saved from "./Saved";
import Sidebar from "./Sidebar";
import { socket } from "../../socket";
function Dashboard() {
  // Inner navigation
  const [activeComponent, setActiveComponent] = useState("My Properties");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // navigate to logout
  useEffect(() => {
    if (activeComponent === "Logout") {
      clearLS();
      dispatch(
        setGlobalUser({
          id: "",
          email: "",
          fullname: "",
          date_of_birth: "",
          avatar: "",
          address: "",
          phone: "",
          occupation: "",
          times: 0,
        })
      );
      navigate("/");
      socket.disconnect();
      toast.success("Logout thành công");
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
