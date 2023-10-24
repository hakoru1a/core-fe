import ProtoTypes from "prop-types";

function Breadcrumbs({
  title,
  children,
  titlePosition,
  background,
  overlay,
}: any) {
  return (
    <section
      className="breadcrumbs__content"
      style={{
        backgroundImage: background
          ? background
          : "url(https://cdn.pixabay.com/photo/2017/12/26/02/54/ho-chi-minh-3039579_1280.jpg)",
      }}
    >
      {overlay && <div className="homec-overlay"></div>}
      <div className="container">
        <div className="row">
          {/* Breadcrumb-Content */}
          <div className="col-12">
            <div className="breadcrumb-content">
              {titlePosition === "bottom" ? (
                <>
                  <ul className="breadcrumb__menu list-none">{children}</ul>
                  <h2 className="breadcrumb__title m-0">{title}</h2>
                </>
              ) : (
                <>
                  <h2 className="breadcrumb__title m-0">{title}</h2>{" "}
                  <ul className="breadcrumb__menu list-none">{children}</ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Breadcrumbs.propTypes = {
  title: ProtoTypes.string.isRequired,
  children: ProtoTypes.node.isRequired,
  titlePosition: ProtoTypes.string,
  background: ProtoTypes.string,
  overlay: ProtoTypes.bool,
};

export default Breadcrumbs;
