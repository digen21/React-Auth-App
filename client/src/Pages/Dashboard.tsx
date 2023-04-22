import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dash.css";

interface IUser {
  id: string;
  username: string;
  email: string;
}

function Dashboard() {
  const [name, setName] = useState<IUser | any>(null);
  const navigate = useNavigate();
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

  const updateSubmit = () => {};

  return (
    <div>
      <div className="bg-success p-2 w-100 d-flex justify-content-between">
        <h2 className="text-center">Dashboard</h2>
        <button className="btn btn-danger">Logout</button>
      </div>
      <div className=" d-flex justify-content-center">
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
                  className="btn btn-primary mr-2 px-2"
                  style={{ fontSize: ".6rem" }}
                >
                  Update Profile
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-3 bg-white d-flex justify-content-center align-items-center">
        <form action="" className="mt-5 mx-4 " onSubmit={updateSubmit}>
          <div className="form-group">
            <h5>Name</h5>
            <input type="text" name="" className="form-control " readOnly />
          </div>
          <div className="form-group mt-4 ">
            <h5>Email</h5>
            <input type="text" name="" className="form-control" readOnly />
          </div>
          <div className="form-group mt-4">
            <h5>Current Password</h5>
            <input
              type="password"
              name=""
              className="form-control"
              placeholder="Enter Current Password"
            />
          </div>
          <div className="form-group mt-4 ">
            <h5>New Password</h5>
            <input
              type="password"
              name=""
              className="form-control"
              placeholder="Enter New Password"
            />
          </div>
          <div className="form-group mt-4 ">
            <h5>Confirm Password</h5>
            <input
              type="password"
              name=""
              className="form-control"
              placeholder="Confirm New Password"
            />
          </div>
          <div className="form-group mt-4">
            <button type="submit" className="btn btn-success form-control">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
