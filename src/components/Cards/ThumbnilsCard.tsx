import ProtoTypes from "prop-types";

function ThumbnilsCard({ img }: { img: string }) {
  return (
    <div style={{ margin: "10px" }}>
      <div className="single-thumbs">
        <img src={img} alt="thumbs" />
      </div>
    </div>
  );
}

ThumbnilsCard.propTypes = {
  img: ProtoTypes.string.isRequired,
};

export default ThumbnilsCard;
