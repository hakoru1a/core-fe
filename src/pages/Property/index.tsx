import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import propertyApi from "../../apis/property.api";
import Breadcrumbs from "../../components/Breadcrumbs";
import HistoryLinks from "../../components/Breadcrumbs/HistoryLinks";
import GoTopBtn from "../../components/Button/GoTopBtn";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Preloader from "../../components/Loader";
import useQueryParams from "../../hooks/useQueryParams";
import PropertyGrid from "./PropertyGrid";

function Property() {
  const params = useQueryParams();
  const { data, isFetching } = useQuery({
    queryFn: () => propertyApi.getProperies(params),
    queryKey: ["properties", params],
  });

  //handle page
  const [currentPage, setCurrentPage] = useState<any>(params?.page || 1);

  let component = undefined;
  if (isFetching) {
    component = <Preloader />;
  } else {
    const totalPage = data?.data.data.totalPages || 1;
    const handelPage = (page: string | number) => {
      if (page === "prev") {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else if (page === "next") {
        if (currentPage < totalPage) {
          setCurrentPage(currentPage + 1);
        }
      } else {
        setCurrentPage(page);
      }
    };
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
        <PropertyGrid
          data={data?.data.data.content || []}
          currentPage={Number(params?.page || 1)}
          handelPage={handelPage}
          totalPage={totalPage}
        />
        <Footer />
        <GoTopBtn />
      </>
    );
  }

  return component;
}

export default Property;
