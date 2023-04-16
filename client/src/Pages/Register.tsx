import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
//@ts-ignore
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { toast, ToastContainer } from "react-toastify";
import { emailPattern, passwordPattern } from "@/Regex-Pattern/RegexPattern";

import "./style.css";

function Register() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (data.password === data.cpassword) {
        const userData = {
          username: data.username,
          email: data.email,
          password: data.password,
        };

        await axios
          .post("http://localhost:5000/auth/register", userData)
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
      } else {
        alert("Password Doesn't Match");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="row py-2 d-flex justify-content-center align-items-center p-5 --bgColor">
      <h2 className="text-center --head-text">Hi There, Register Here!</h2>
      <div className="col-md-6">
        <img src="/register.svg" alt="" width="600px" height="600px" />
      </div>
      <div className="col-md-4 max-auto py-5 mt-3">
        <div className="card p-3 bg-white --container">
          <h2 className="text-center pt-2">Register</h2>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 mx-4 p-3"
          >
            <div className="form-group pb-4">
              <h6>Username</h6>
              <input
                type="text"
                className="form-control p-0"
                placeholder="Username"
                autoFocus
                {...register("username", { required: true, minLength: 4 })}
                name={"username"}
              />
              {errors.username && (
                <p className="text-danger mt-1">
                  Username Must be more than 4 character!
                </p>
              )}
            </div>
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
                name={"email"}
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
                name={"password"}
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
            <div className="form-group pb-4">
              <h6>Confirm Password</h6>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
                {...register("cpassword", {
                  required: true,
                  pattern: passwordPattern,
                })}
                name={"cpassword"}
              />
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
                Sign Up
              </button>
            </div>
          </form>
          <Link to={"/"} className="text-center mb-4">
            Already a Member? Click Here
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
