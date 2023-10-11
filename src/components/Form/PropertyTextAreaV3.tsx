import { UseFormRegisterReturn } from "react-hook-form";
// interface Props {
//   title: string;
//   name: string;
//   register: UseFormRegister<any>;
//   rest?: any;
// }
function PropertyTextAreaV3({ title, name, register }: any) {
  const obj: UseFormRegisterReturn<any> = { ...register(name) };

  return (
    <div className="mg-top-20">
      <h4 className="homec-submit-form__heading">{title}</h4>
      <div className="form-group homec-form-input">
        <textarea {...obj} />
      </div>
    </div>
  );
}

export default PropertyTextAreaV3;
