import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import PropertyTextInput from "../../components/Form/PropertyTextInput";
import { ChangePasswordType } from "../../types/user.type";
import { Schema, schema } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../apis/user.api";
import { useAuth } from "../../hooks/useAuth";
import Preloader from "../../components/Loader";
import { toast } from "react-toastify";

export type FormData = Pick<
  Schema,
  "password" | "confirm_password" | "previousPassword"
>;
const changePasswordSchema = schema.pick([
  "password",
  "confirm_password",
  "previousPassword",
]);

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema),
  });
  const user = useAuth();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: ChangePasswordType) =>
      userApi.chagePassword(data, user.id),
    onSuccess: () => {
      toast.success("Cập nhật mật khẩu thành công");
    },
  });
  const onSubmit = handleSubmit((data) => {
    const myData: ChangePasswordType = {
      currentPassword: data.password,
      previousPassword: data.previousPassword,
    };
    mutate(myData);
  });
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className="col-lg-9 col-md-8 col-12 mg-top-30">
      <div className="homec-dashboard__inner homec-border">
        <div className="row">
          <div className="col-lg-7 col-12">
            <h3 className="ecom-wc__form-title homec-dashboard__password">
              Update your Password{" "}
              <span className="pd-btm-30">
                Your email address will not be published. Required fields are
                marked *
              </span>
            </h3>
            {/* Sign in Form */}
            <form
              className="ecom-wc__form-main p-0"
              action="index.html"
              method="post"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group homec-form-input">
                    <div className="form-group__input">
                      <PropertyTextInput
                        title="Pre-Password*"
                        margin="-10px"
                        name="previousPassword"
                        placeholder="********"
                        register={register}
                        type="password"
                        errorMessage={errors.previousPassword?.message}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group homec-form-input">
                    <div className="form-group__input">
                      <PropertyTextInput
                        title="Password*"
                        margin="-10px"
                        name="password"
                        placeholder="********"
                        register={register}
                        type="password"
                        errorMessage={errors.password?.message}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group homec-form-input">
                    <div className="form-group__input">
                      <PropertyTextInput
                        title="Confirm Pasword*"
                        placeholder="********"
                        margin="-10px"
                        name="confirm_password"
                        register={register}
                        type="password"
                        errorMessage={errors.confirm_password?.message}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Form Group */}
              <div className="form-group form-mg-top25">
                <div className="ecom-wc__button ecom-wc__button--bottom">
                  <button className="homec-btn homec-btn__second" type="submit">
                    <span>Update Password</span>
                  </button>
                </div>
              </div>
            </form>
            {/* End Sign in Form */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
