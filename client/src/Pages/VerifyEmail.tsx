import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  console.log("--->", token);

  const verifyToken = async () => {
    try {
      await axios
        .post("http://localhost:5000/auth/verify-mail", {
          token: token,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {}, 3000);
          } else {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });

      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div className="container mx-auto d-flex justify-content-center align-items-center flex-column">
      <Link className="btn btn-dark mt-5 mb-0" to={"/"}>
        Go To Login Page
      </Link>
      <img
        src="/loginpage.svg"
        className="mt-5"
        style={{ height: "500px", width: "500px" }}
      />
      <ToastContainer />
    </div>
  );
}

export default VerifyEmail;
