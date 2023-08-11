import { useState } from "react";
import "./style.css";
function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  console.log(isLogin);

  return (
    <div
      id="container"
      className={`container ${isLogin ? "sign-in" : "sign-up"}`}
    >
      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user" />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send" />
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt" />
                <input type="password" placeholder="Password" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt" />
                <input type="password" placeholder="Confirm password" />
              </div>
              <button>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <button onClick={() => setIsLogin(true)} className="pointer">
                  Sign in here
                </button>
              </p>
            </div>
          </div>
          <div className="form-wrapper">
            <div className="social-list align-items-center sign-up">
              <div className="align-items-center facebook-bg">
                <i className="bx bxl-facebook" />
              </div>
              <div className="align-items-center google-bg">
                <i className="bx bxl-google" />
              </div>
              <div className="align-items-center twitter-bg">
                <i className="bx bxl-twitter" />
              </div>
              <div className="align-items-center insta-bg">
                <i className="bx bxl-instagram-alt" />
              </div>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user" />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt" />
                <input type="password" placeholder="Password" />
              </div>
              <button>Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <button onClick={() => setIsLogin(false)} className="pointer">
                  Sign up here
                </button>
              </p>
            </div>
          </div>
          <div className="form-wrapper">
            <div className="social-list align-items-center sign-in">
              <div className="align-items-center facebook-bg">
                <i className="bx bxl-facebook" />
              </div>
              <div className="align-items-center google-bg">
                <i className="bx bxl-google" />
              </div>
              <div className="align-items-center twitter-bg">
                <i className="bx bxl-twitter" />
              </div>
              <div className="align-items-center insta-bg">
                <i className="bx bxl-instagram-alt" />
              </div>
            </div>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome back</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
              obcaecati, accusantium molestias, laborum, aspernatur deserunt
              officia voluptatum tempora dicta quo ab ullam. Assumenda enim
              harum minima possimus dignissimos deserunt rem.
            </p>
          </div>
          <div className="img sign-in">
            <img
              src="../../../public/undraw_different_love_a3rg.svg"
              alt="welcome"
            />
          </div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up">
            <img
              src=".../../../public/undraw_different_love_a3rg.svg"
              alt="welcome"
            />
          </div>
          <div className="text sign-up">
            <h2>Join with us</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
              obcaecati, accusantium molestias, laborum, aspernatur deserunt
              officia voluptatum tempora dicta quo ab ullam. Assumenda enim
              harum minima possimus dignissimos deserunt rem.
            </p>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
}

export default Login;
