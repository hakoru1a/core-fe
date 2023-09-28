import ProtoTypes from "prop-types";

interface TopbarBtnProps {
  link: string;
  img: string;
  text: string;
}

function TopbarBtn({ link, img, text }: TopbarBtnProps) {
  return (
    <li>
      <a href={link}>
        <img src={img} alt="#" />
        <span>{text}</span>
      </a>
    </li>
  );
}

TopbarBtn.propTypes = {
  link: ProtoTypes.string.isRequired,
  img: ProtoTypes.string.isRequired,
  text: ProtoTypes.string.isRequired,
  color: ProtoTypes.string,
};

export default TopbarBtn;
