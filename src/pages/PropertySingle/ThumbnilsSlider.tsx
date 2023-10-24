import Carousel from "react-multi-carousel";
import ThumbnilsCard from "../../components/Cards/ThumbnilsCard";
import { responsiveLogoSlider2 } from "../../utils/responsiveSlider";
import ButtonGroup from "../../components/CustomDot/CustomArrow";
import { Media } from "../../types/property.type";
interface Props {
  images: Media[];
}
function ThumbnailsSlider({ images }: Props) {
  return (
    <div className="mg-top-10">
      <Carousel
        responsive={responsiveLogoSlider2}
        showDots={false}
        infinite={true}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
      >
        {Array(10)
          .fill(0)
          .map((_, index: number) => {
            return (
              <ThumbnilsCard
                img={images?.[index]?.url || "https://placehold.co/270x180"}
              />
            );
          })}
      </Carousel>
    </div>
  );
}

export default ThumbnailsSlider;
