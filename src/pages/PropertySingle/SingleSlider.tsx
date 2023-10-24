import { responsiveSmallAgentsSlider } from "../../utils/responsiveSlider";
import ImageCard from "../../components/Cards/ImageCard";
import Carousel from "react-multi-carousel";
import { Media } from "../../types/property.type";

interface Props {
  images: Media[];
  address: string;
  title: string;
}

function SingleSlider({ images, address, title }: Props) {
  return (
    <Carousel
      responsive={responsiveSmallAgentsSlider}
      infinite={true}
      autoPlay={true}
      showDots={false}
      customTransition="linear .5"
      autoPlaySpeed={3000}
      removeArrowOnDeviceType={[
        "superLargeDesktop",
        "desktop",
        "tablet",
        "mobile",
      ]}
    >
      <ImageCard
        price="3,976"
        duration="Month"
        title={title}
        text={address || "TPHCM"}
        img={images?.[0]?.url || "https://placehold.co/1170x600"}
      />
    </Carousel>
  );
}

export default SingleSlider;
