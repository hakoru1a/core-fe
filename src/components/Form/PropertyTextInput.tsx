import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  errorMessage?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  name: string;
  size?: string;
  title: string;
  margin?: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
}

function PropertyTextInput({
  size,
  title,
  name,
  placeholder,
  type,
  margin,
  rules,
  register,
  errorMessage,
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
            {...register(name, rules)}
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

export default PropertyTextInput;
