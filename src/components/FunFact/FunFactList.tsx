import ProtoTypes from "prop-types";

function FunFactList({ title }: any) {
  return (
    <li>
      <i className="fa-solid fa-check"></i>
      {title}
    </li>
  );
}

FunFactList.propTypes = {
  title: ProtoTypes.string.isRequired,
};

export default FunFactList;
