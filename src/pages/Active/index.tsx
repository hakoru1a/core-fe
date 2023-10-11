import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import authApi from "../../apis/auth.api";
import "./style.css";
function ActiveAccount() {
  const { id } = useParams();
  const { status } = useQuery({
    queryFn: () => authApi.activeAccount(id),
    queryKey: ["active", id],
  });

  return (
    <div className="tick-animation">
      {status === "success" && (
        <div className="wrapper">
          <div>
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />{" "}
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <Link
            style={{
              textDecoration: "none",
              marginLeft: "20px",
              color: "#000",
              fontSize: "25px",
            }}
            to={"/login"}
            target="_blank"
          >
            Đã active thành công
            <br></br>
            <i
              style={{
                marginLeft: "6px",
              }}
              className="fa-solid fa-diamond-turn-right"
            ></i>
            Hãy bắt đầu đăng nhập lại
          </Link>
        </div>
      )}
    </div>
  );
}

export default ActiveAccount;
