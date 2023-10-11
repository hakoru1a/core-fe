import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  errorMessage?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  name: string;
  size?: string;
  title?: string;
  margin?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
}

function PropertyTextInputV2({
  size,
  title,
  name,
  placeholder,
  type,
  margin,
  register,
  errorMessage,
  value,
}: Props) {
  return (
    <div className={`${size && size} col-12 `}>
      {/* Single Form Element */}
      <div className="mg-top-20">
        <h4
          className="homec-submit-form__heading"
          style={{ marginBottom: margin }}
        >
          {title}
        </h4>
        <div className="form-group homec-form-input">
          <input
            type={type ? type : "text"}
            placeholder={placeholder}
            defaultValue={value}
            {...register(name)}
          />
          <span
            style={{
              color: "red",
            }}
          >
            {errorMessage}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyTextInputV2;
