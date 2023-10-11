import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../../apis/auth.api";
import WelcomeCard from "../../components/Cards/WelcomeCard";
import PropertyTextInput from "../../components/Form/PropertyTextInput";
import Preloader from "../../components/Loader";
import { Schema, UserSchema, schema, userSchema } from "../../utils/rules";

export type FormData = Pick<
  Schema,
  "email" | "password" | "confirm_password" | "username"
> &
  Pick<UserSchema, "fullname" | "phone">;
const registerSchema = schema.pick([
  "email",
  "password",
  "confirm_password",
  "username",
]);
export type RegisterForm = Omit<FormData, "confirm_password">;
const us = userSchema.pick(["fullname", "phone"]);
const combinedSchema = registerSchema.concat(us);

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(combinedSchema),
  });
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: RegisterForm) => authApi.register(data),
    onSuccess: (data) => {
      toast.success("Kiểm tra email để kích hoạt tài khoản", {
        autoClose: false,
      });
      navigate("/");
      console.log(data);
    },
  });
  // const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    mutate(data);
    // navigate("/");
  });

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <section
        className="ecom-wc ecom-wc__full ecom-bg-cover"
        // style={{ backgroundImage: "url('/img/credential-bg.svg')" }}
      >
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 col-12">
              <div className="ecom-wc__form">
                <div className="ecom-wc__form-inner">
                  <h3 className="ecom-wc__form-title ecom-wc__form-title__one">
                    Dont’t have an account ? Create Account
                    <span>
                      Your email address will not be published. Required fields
                      are marked *
                    </span>
                  </h3>
                  {/* Sign in Form  */}
                  <form
                    className="ecom-wc__form-main p-0  "
                    action="index.html"
                    method="post"
                    onSubmit={onSubmit}
                  >
                    <div className="row">
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Email*"
                        placeholder="Jhon@gmail.com"
                        margin="-10px"
                        name="email"
                        register={register}
                        type="email"
                        errorMessage={errors.email?.message}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Username*"
                        placeholder="Jhon"
                        margin="-10px"
                        name="username"
                        register={register}
                        type="text"
                        errorMessage={errors.username?.message}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Fullname*"
                        placeholder="Jhon"
                        margin="-10px"
                        name="fullname"
                        register={register}
                        type="text"
                        errorMessage={errors.fullname?.message}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Phone*"
                        placeholder="03344xxxx"
                        margin="-10px"
                        name="phone"
                        register={register}
                        type="text"
                        errorMessage={errors.phone?.message}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Password*"
                        margin="-10px"
                        name="password"
                        placeholder="********"
                        register={register}
                        type="password"
                        errorMessage={errors.password?.message}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Confirm Pasword*"
                        placeholder="********"
                        margin="-10px"
                        name="confirm_password"
                        register={register}
                        type="password"
                        errorMessage={errors.confirm_password?.message}
                      />
                    </div>
                    <div className="form-group form-mg-top-30">
                      <div className="ecom-wc__button ecom-wc__button--bottom">
                        <button
                          className="homec-btn homec-btn__second"
                          type="submit"
                        >
                          <span>Login</span>
                        </button>
                        <button
                          className="homec-btn homec-btn__second homec-btn__social"
                          type="submit"
                        >
                          <span className="ntfmax-wc__btn-icon">
                            <img src="/img/google.svg" alt="#" />
                          </span>
                          <span>Sign Up with Google</span>
                        </button>
                      </div>
                    </div>
                    {/* Form Group  */}
                    <div className="form-group mg-top-20">
                      <div className="ecom-wc__bottom">
                        <p className="ecom-wc__text">
                          Already have an account ?
                          <Link to="/login">Login</Link>
                        </p>
                      </div>
                    </div>
                  </form>
                  {/* End Sign in Form  */}
                </div>
              </div>
            </div>
            <WelcomeCard
              languages={["English", "Bengali", "Frances"]}
              links={[
                { link: "#", name: "Terms & Condition" },
                { link: "#", name: "Privacy Policy" },
                { link: "#", name: "Help" },
              ]}
              image="/img/man.png"
              brunches="120"
              builtHouse="150k"
            />
          </div>
        </div>
      </section>
    );
  }
  return component;
}

export default SignUp;
