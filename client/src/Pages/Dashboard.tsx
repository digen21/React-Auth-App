import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "@/Regex-Pattern/RegexPattern";
//@ts-ignore
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { toast, ToastContainer } from "react-toastify";
import "./dash.css";

interface IUser {
  id: string;
  username: string;
  email: string;
}

function Dashboard() {
  const [name, setName] = useState<IUser | any>(null);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setIsShown((current) => !current);
  };

  const loadData = async () => {
    try {
      const token = await JSON.parse(localStorage.getItem("data") as string);
      const res = await axios.get("http://localhost:5000/auth/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setName(res.data.data);
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
      curPassword: "",
    },
  });

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handlePasswordChange = (e: any) => {
    setPasswordInput(e.target.value);
  };

  const updateSubmit = async (data: any) => {
    try {
      if (data.password === data.cpassword) {
        const userData = {
          username: data.username,
          email: data.email,
          curPassword: data.curPassword,
          password: data.password,
        };

        await axios
          .post("http://localhost:5000/auth/update", userData)
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
      }
    } catch (error) {
      alert(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("data");
    navigate("/");
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-success p-2 w-100 d-flex justify-content-between">
        <h2 className="text-center">Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <div className=" d-flex justify-content-center mt-5">
        <div className="card p-3">
          <div className="media">
            <img
              src="/man.png"
              className="mr-3"
              style={{ height: "80px", width: "80px" }}
            />
            <div className="media-body">
              <h5 className="mt-2 mb-0">{name?.username}</h5>
              <div className="d-flex flex-row justify-content-between align-text-center">
                <small className="text-muted">{name?.email}</small>
                <h2
                  className="btn btn-primary mr-2 px-2 --update-btn"
                  style={{ fontSize: ".6rem" }}
                  onClick={handleClick}
                >
                  Update Profile
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShown && (
        <div className="card p-3 bg-white d-flex justify-content-center align-items-center">
          <form
            action=""
            className="mt-5 mx-4 "
            onSubmit={handleSubmit(updateSubmit)}
          >
            <div className="form-group">
              <h5>Name</h5>
              <input
                type="text"
                value={name?.username || ""}
                className="form-control"
                placeholder="Username"
                autoFocus
                {...register("username", { required: true, minLength: 4 })}
                name={"username"}
                readOnly
              />
            </div>
            <div className="form-group mt-4 ">
              <h5>Email</h5>
              <input
                type="email"
                value={name?.email || ""}
                className="form-control"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                  pattern: emailPattern,
                })}
                readOnly
              />
            </div>
            <div className="form-group mt-4">
              <h5>Current Password</h5>
              <input
                type="password"
                {...register("curPassword", {
                  required: true,
                  pattern: passwordPattern,
                })}
                className="form-control"
                placeholder="Enter Current Password"
                name={"curPassword"}
              />
            </div>
            <h5 className="mt-4">New Password</h5>
            <div className="input-group ">
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

            <div className="form-group mt-4">
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
            <div className="form-group mt-4">
              <button type="submit" className="btn btn-success form-control">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
