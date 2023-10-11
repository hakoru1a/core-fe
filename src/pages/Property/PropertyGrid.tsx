import { useState } from "react";
import wishlistApi from "../../apis/wishlist.api";
import LatestPropertyCard from "../../components/Cards/LatestPropertyCard";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import { Property } from "../../types/property.type";
import PropertyBar from "./PropertyBar";
import Preloader from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

interface Props {
  data: Property[];
  currentPage?: number;
  totalPage: number;
  handelPage: (page: number | string) => void;
}

function PropertyGrid({ data, currentPage = 1, handelPage, totalPage }: Props) {
  //handle grid style

  const user = useAuth();
  const { data: wishlist, isFetching } = useQuery({
    queryFn: () => wishlistApi.get(Number(user.id)),
    queryKey: ["wishlist", user.id],
    enabled: !!user.id,
  });

  const [gridStyle, setGridStyle] = useState<string>("grid");
  const handleGridStyle = (style: string) => {
    setGridStyle(style);
  };
  if (isFetching) return <Preloader />;
  return (
    <section className="homec-propertys pd-top-80 pd-btm-80">
      <div className="container">
        <PropertyBar
          gridStyle={gridStyle}
          handleGridStyle={handleGridStyle}
          currentPage={currentPage}
          totalPage={totalPage}
        />
        <div className="row">
          <Sidebar />
          <div className="col-lg-8 col-12">
            <div className="tab-content" id="nav-tabContent">
              {/* <!-- Grid Tab --> */}
              <div
                className="tab-pane fade show active"
                id="homec-grid"
                role="tabpanel"
              >
                <div className="row">
                  {data?.map((property) => (
                    <LatestPropertyCard
                      id={property.id}
                      key={property.id}
                      isMyWishlist={wishlist?.data.data.some(
                        (wishlistProperty: Property) =>
                          wishlistProperty.id === property.id
                      )}
                      img="https://placehold.co/350x220"
                      // likeLink={property.likeLink}
                      detailsLink={`/property/${property.id}`}
                      agentName={property.customer?.fullname}
                      agentImg={
                        property.customer?.avatar ||
                        "https://placehold.co/35x35"
                      }
                      price={property.price}
                      period={property.rentPeriod}
                      whatFor={property.purpose}
                      // propertyLink={property.propertyLink}
                      name={property.propertyName}
                      address={property.address}
                      detailsList={[
                        {
                          img: "/img/room-icon.svg",
                          name: `${property.bed} Bed`,
                        },
                        {
                          img: "/img/bath-icon.svg",
                          name: `${property.bath} Bathroom`,
                        },
                        { img: "/img/size-icon.svg", name: "5x9 m2" },
                      ]}
                      classes={`${
                        gridStyle === "grid"
                          ? "col-md-6 col-12 mg-top-30"
                          : "col-12 mg-top-30"
                      } `}
                      view={gridStyle}
                    />
                  ))}
                </div>
                <Pagination
                  totalPage={totalPage}
                  handlePage={handelPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyGrid;
