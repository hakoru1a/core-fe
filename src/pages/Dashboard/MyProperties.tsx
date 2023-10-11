import { useQuery } from "@tanstack/react-query";
import propertyApi from "../../apis/property.api";
import DashboardPropertyCard from "../../components/Cards/DashboardPropertyCard";
import Preloader from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import Layout from "./Layout";

function MyProperties() {
  const user = useAuth();

  const { data, isFetching } = useQuery({
    queryFn: () => propertyApi.getMyProperies(user.id),
    queryKey: ["properties", "my-property"],
  });
  console.log(data);

  if (isFetching) {
    return <Preloader />;
  }
  return (
    <>
      <Layout title="My Properties">
        {data?.data.data?.map((property) => (
          <DashboardPropertyCard
            key={property.id}
            id={property.id}
            status={property.isActive ? "Active" : "DEACTIVE"}
            image="https://placehold.co/164x164"
            why={property.purpose}
            title={property.propertyName}
            location={property.address}
            rating={5}
            totalRating={10}
          />
        ))}
      </Layout>
    </>
  );
}

export default MyProperties;
