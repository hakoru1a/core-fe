import "../../app.css";
export const CustomDot = ({ ...rest }: any) => {
  const { next, active } = rest;
  return (
    <button
      className={active ? "carusole-dot-active" : "carusole-dot"}
      aria-label="active img"
      onClick={() => next()}
    ></button>
  );
};
