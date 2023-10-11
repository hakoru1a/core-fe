import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../apis/auth.api";
import userApi from "../../apis/user.api";
import WelcomeCard from "../../components/Cards/WelcomeCard";
import PropertyTextInput from "../../components/Form/PropertyTextInput";
import Preloader from "../../components/Loader";
import { setGlobalUser } from "../../redux/slice/user.slice";
import { setProfileToLS } from "../../utils/auth";
import { Schema, schema } from "../../utils/rules";
type FormData = Pick<Schema, "username" | "password">;
const registerSchema = schema.pick(["username", "password"]);

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormData) => authApi.login(data),
    onSuccess: async (res) => {
      const {
        data: { accessToken },
      } = res.data;
      if (accessToken) {
        const { data } = await userApi.getCurrentUser();
        setProfileToLS(data.data);
        dispatch(setGlobalUser(data.data));
        navigate("/");
      }
    },
    onError: (error: Error) => {
      console.log(`rolling back optimistic update with id ${error.message}`);
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <section
      className="ecom-wc ecom-wc__full ecom-bg-cover"
      // style={{ backgroundImage: "url('/img/credential-bg.svg')" }}
    >
      <div className="container-fluid">
        <div className="row">
          {isLoading ? (
            <Preloader />
          ) : (
            <div className="col-lg-6 col-12">
              <div className="ecom-wc__form">
                <div className="ecom-wc__form-inner">
                  <h3 className="ecom-wc__form-title ecom-wc__form-title__one">
                    Login
                    <span>
                      Your username address will not be published. Required
                      fields are marked *
                    </span>
                  </h3>
                  {/* Sign in Form  */}
                  <form
                    className="ecom-wc__form-main p-0"
                    action="index.html"
                    method="post"
                    onSubmit={onSubmit}
                  >
                    <PropertyTextInput
                      title="Username*"
                      name="username"
                      placeholder="demo3243@gmail.com"
                      type="text"
                      register={register}
                      errorMessage={errors.username?.message}
                    />
                    <PropertyTextInput
                      title="Password*"
                      name="password"
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      type="password"
                      register={register}
                      errorMessage={errors.password?.message}
                    />
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
                          <span>Sign In with Google</span>
                        </button>
                      </div>
                    </div>
                    {/* Form Group  */}
                    <div className="form-group mg-top-20">
                      <div className="ecom-wc__bottom">
                        <p className="ecom-wc__text">
                          Dont’t have an account ?{" "}
                          <Link to="/signup">Create Account</Link>
                        </p>
                      </div>
                    </div>
                  </form>
                  {/* End Sign in Form  */}
                </div>
              </div>
            </div>
          )}
          <WelcomeCard
            languages={["English", "Bengali", "Frances"]}
            links={[
              { link: "#", name: "Terms & Condition" },
              { link: "#", name: "Privacy Policy" },
              { link: "#", name: "Help" },
            ]}
            image="/img/man2.png"
            brunches="120"
            builtHouse="150k"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
