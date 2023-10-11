import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import GoTopBtn from "../Button/GoTopBtn";
import DownloadApp from "../DownloadApp";
import Footer from "../Footer";
import PropertyFromEdit from "../Form/PropertyFromEdit";
import Header from "../Header";

function EditProperty() {
  const component = (
    <>
      <Header />
      <Breadcrumbs
        title="Edit Property"
        titlePosition="bottom"
        background="url(/img/bread-overlay.jpg)"
      >
        <HistoryLinks link="/home" text="Home" />
        <HistoryLinks
          link="/edit-property"
          text="Edit Property"
          isActive={true}
        />
      </Breadcrumbs>
      <PropertyFromEdit />
      <DownloadApp />
      <Footer />
      <GoTopBtn />
    </>
  );
  return component;
}

export default EditProperty;
