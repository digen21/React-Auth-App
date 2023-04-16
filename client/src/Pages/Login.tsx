import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { passwordPattern, emailPattern } from "@/Regex-Pattern/RegexPattern";
//@ts-ignore
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";

import "./style.css";
function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e: any) => {
    setPasswordInput(e.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = async (data: any) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      await axios
        .post("http://localhost:5000/auth/login", userData)
        .then((log) => {
          if (log.data.success) {
            toast.success(log.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.setItem("data", JSON.stringify(userData));
            navigate("/dash");
          } else {
            toast.error(log.data.message, {
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
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="row py-2 d-flex justify-content-center align-items-center p-5 --bgColor">
      <ToastContainer />
      <h2 className="text-center --head-text">Hi There, Welcome Back!</h2>
      <div className="col-md-6">
        <img src="/login.svg" alt="" width="450px" height="450px" />
      </div>
      <div className="col-md-4 py-5 mt-3">
        <div className="card p-3 bg-white --container">
          <h2 className="text-center py-4">Login</h2>
          <form
            action=""
            onSubmit={handleSubmit(loginSubmit)}
            className="mt-2 mx-4 "
          >
            <div className="form-group pb-4">
              <h6>Email</h6>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                  pattern: emailPattern,
                })}
                name="email"
              />

              {errors.email && (
                <p className="text-danger mt-1">Place Enter Correct Email!</p>
              )}
            </div>
            <h6>Password</h6>
            <div className="input-group pb-4">
              <input
                type={passwordType}
                className="form-control  shadow-none"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  pattern: passwordPattern,
                })}
                onChange={handlePasswordChange}
                value={passwordInput}
                name="password"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-primary shadow-none"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? <UilEyeSlash /> : <UilEye />}
                </button>
              </div>

              {errors.password && (
                <div>
                  <p className="text-danger mt-1">
                    Password should be of length 6-15!
                  </p>
                  <p className="text-danger mt-1">
                    Should contain at least one uppercase, lowercase, number &
                    special character!
                  </p>
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary w-50 p-2 mt-2 --submit-btn"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <Link to={"/register"} className="text-center m-4">
            Not Registered? Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
