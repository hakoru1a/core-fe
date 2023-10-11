function PropertyTextAreaV2({
  title,
  value,
  handleChange,
  name,
  placeHolder,
  sizeFull,
}: any) {
  return (
    <div className={sizeFull ? "col-12" : "col-lg-6 col-md-6 col-12 "}>
      {/* Single Form Element  */}
      <div className="mg-top-20">
        <h4 className="homec-submit-form__heading">{title}</h4>
        <div className="form-group homec-form-input">
          <textarea
            required
            placeholder={placeHolder}
            value={value}
            name={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyTextAreaV2;
