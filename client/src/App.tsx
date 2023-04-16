import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

//Pages
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import Dashboard from "@/Pages/Dashboard";

//Auth Routes
import PublicRoutes from "@/Routes/PublicRoutes";
import ProtectedRoutes from "@/Routes/ProtectedRoute";

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
