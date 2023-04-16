import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import Dashboard from "@/Pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/dash"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

function ProtectedRoutes({ children }: any) {
  const auth = localStorage.getItem("data");
  if (auth) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

function PublicRoutes({ children }: any) {
  const auth = localStorage.getItem("data");
  if (auth) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}
