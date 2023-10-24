import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import propertyApi from "../../apis/property.api";
import Breadcrumbs from "../../components/Breadcrumbs";
import HistoryLinks from "../../components/Breadcrumbs/HistoryLinks";
import GoTopBtn from "../../components/Button/GoTopBtn";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Preloader from "../../components/Loader";
import { Media } from "../../types/property.type";
import PropertyDetails from "./PropertyDetails";
import SingleSlider from "./SingleSlider";
import ThumbnailsSlider from "./ThumbnilsSlider";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCurrentProperty } from "../../redux/slice/property.slice";
function PropertySingle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useQuery({
    queryFn: () => propertyApi.getDetailPropery(Number(id)),
    queryKey: ["property", "detail", id],
    onSuccess: (res) => {
      console.log(res.data.data);
      dispatch(setCurrentProperty(res.data.data));
    },
    onError: (err) => {
      console.log(err);
      if (err) {
        navigate("/property");
        // toast.error("Trang này không tồn tại");
      }
    },
  });
  const getImagesFromMedia = () => {
    return data?.data.data.medias?.filter((item: Media) =>
      item.mediaType?.includes("image")
    );
  };
  const images = getImagesFromMedia();

  let component = undefined;
  if (isFetching) {
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
        <section className="pd-top-80 pd-btm-80">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <SingleSlider
                  images={images}
                  title={data?.data.data.propertyName}
                  address={data?.data.data.address}
                />
                <ThumbnailsSlider images={images} />
              </div>
            </div>
          </div>
        </section>
        <PropertyDetails data={data?.data?.data} />
        <Footer />
        <GoTopBtn />
      </>
    );
  }

  return component;
}

export default PropertySingle;
