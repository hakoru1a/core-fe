import { useQuery } from "@tanstack/react-query";
import wishlistApi from "../../apis/wishlist.api";
import LatestPropertyCard from "../../components/Cards/LatestPropertyCard";
import Preloader from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import Layout from "./Layout";

function Saved() {
  const user = useAuth();
  const { data, isFetching } = useQuery({
    queryFn: () => wishlistApi.get(Number(user.id)),
    queryKey: ["wishlist", user.id],
  });

  if (isFetching) return <Preloader />;
  return (
    <Layout title="Saved">
      {data?.data?.data.map((property) => (
        <LatestPropertyCard
          id={property.id}
          key={property.id}
          img="https://placehold.co/350x220"
          isMyWishlist={true}
          // likeLink={property.likeLink}
          detailsLink={`/property/${property.id}`}
          agentName={property.customer?.fullname}
          agentImg="https://placehold.co/35x35"
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
        />
      ))}
    </Layout>
  );
}

export default Saved;
