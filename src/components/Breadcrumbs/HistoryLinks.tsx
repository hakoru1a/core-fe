import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  text: string;
  isActive?: boolean;
}
function HistoryLinks({ link, text, isActive }: Props) {
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={link}>{text}</Link>
    </li>
  );
}

HistoryLinks.propTypes = {
  link: ProtoTypes.string.isRequired,
  text: ProtoTypes.string.isRequired,
  isActive: ProtoTypes.bool,
};

export default HistoryLinks;
